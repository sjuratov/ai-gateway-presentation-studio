import { createServer } from "node:http";
import { readFile, writeFile, mkdir, rename } from "node:fs/promises";
import { joinSession, createCanvas, CanvasError } from "@github/copilot-sdk/extension";
import { content } from "./content.mjs";
import { initialState, validateState } from "./presentation-state.mjs";

const servers = new Map();
const directory = new URL("./artifacts/", import.meta.url);
const stateFile = new URL("presentation.json", directory);
let state;
let revision = 0;
let writes = Promise.resolve();
async function loadState() {
  if (state) return state;
  try {
    state = validate(JSON.parse(await readFile(stateFile, "utf8")));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    state = {...initialState};
  }
  return state;
}
function validate(value) {
  try { return validateState(value); }
  catch (error) { throw new CanvasError("invalid_presentation", error.message); }
}
async function updateState(value) {
  const next = validate(value);
  const operation = writes.then(async () => {
    await mkdir(directory, {recursive:true});
    const temporary = new URL("presentation.tmp", directory);
    await writeFile(temporary, JSON.stringify(next, null, 2));
    await rename(temporary, stateFile);
    state = next;
    revision++;
    return {state, revision};
  });
  writes = operation.catch(() => {});
  return operation;
}
async function startServer() {
  const template = await readFile(new URL("./presenter.html", import.meta.url), "utf8");
  const html = template.replace("__CONTENT_JSON__", JSON.stringify(content).replaceAll("<", "\\u003c"));
  const server = createServer(async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Content-Type-Options", "nosniff");
    try {
      if (req.method === "GET" && req.url === "/") {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(html);
      } else if (req.method === "GET" && req.url === "/assets/ai-governance-hub.png") {
        const image = await readFile(new URL("./assets/ai-governance-hub.png", import.meta.url));
        res.setHeader("Content-Type", "image/png");
        res.end(image);
      } else if (req.method === "GET" && req.url === "/state") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({state:await loadState(), revision}));
      } else if (req.method === "POST" && req.url === "/state") {
        if (req.headers.origin !== `http://${req.headers.host}` || req.headers["content-type"] !== "application/json") {
          res.writeHead(403); res.end("Origin or content type rejected"); return;
        }
        let body = "";
        for await (const chunk of req) {
          body += chunk;
          if (body.length > 4096) { res.writeHead(413); res.end("Request too large"); return; }
        }
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(await updateState(JSON.parse(body))));
      } else {
        res.writeHead(404); res.end("Not found");
      }
    } catch (error) {
      res.writeHead(error instanceof CanvasError || error instanceof SyntaxError ? 400 : 500, {"Content-Type":"application/json"});
      res.end(JSON.stringify({error:error.message}));
    }
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  return {server, url:`http://127.0.0.1:${server.address().port}/`};
}
await joinSession({
  canvases:[createCanvas({
    id:"ai-gateway-presenter",
    displayName:"AI Gateway presentation studio",
    description:"Source-backed guided 5, 30 and 60 minute AI Gateway customer presentations with presenter notes and documentation library.",
    inputSchema:{type:"object", properties:{track:{enum:["executive","decision","architect"]}}, additionalProperties:false},
    actions:[
      {name:"get_presentation", description:"Read the current journey and source-backed content.", handler:async () => ({state:await loadState(), revision, content})},
      {name:"set_journey", description:"Select a guided journey and optionally a chapter.", inputSchema:{type:"object", properties:{track:{enum:["executive","decision","architect"]}, step:{type:"integer",minimum:0}}, required:["track"],additionalProperties:false},
        handler:async ctx => updateState({...await loadState(),track:ctx.input.track,step:ctx.input.step ?? 0})}
    ],
    open:async ctx => {
      await loadState();
      if (ctx.input?.track) await updateState({...state,track:ctx.input.track,step:0});
      let entry = servers.get(ctx.instanceId);
      if (!entry) { entry = await startServer(); servers.set(ctx.instanceId,entry); }
      return {title:"AI Gateway | Customer presentation studio",url:entry.url};
    },
    onClose:async ctx => {
      const entry = servers.get(ctx.instanceId);
      if (entry) { servers.delete(ctx.instanceId); await new Promise(resolve => entry.server.close(resolve)); }
    }
  })]
});
