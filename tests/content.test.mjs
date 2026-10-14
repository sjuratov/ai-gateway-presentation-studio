import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { content } from "../.github/extensions/ai-gateway-presenter/content.mjs";

const folder = new URL("../.github/extensions/ai-gateway-presenter/", import.meta.url);

test("source snapshot and attribution are explicit", () => {
  assert.equal(content.sourceHome, "https://ai.gateway.azure.com/docs");
  assert.match(content.reviewed, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(new Date(content.reviewed).toISOString().slice(0, 10), content.reviewed);
  assert.ok(content.caveats.length);
  const urls = content.sources.map(source => {
    assert.ok(source.title && source.group && source.summary);
    const url = new URL(source.url);
    assert.equal(url.origin, "https://ai.gateway.azure.com");
    assert.match(url.pathname, /^\/docs(?:\/|$)/);
    return source.url;
  });
  assert.equal(new Set(urls).size, urls.length);
});

function checkReferences(refs) {
  assert.ok(Array.isArray(refs) && refs.length > 0);
  for (const ref of refs) {
    assert.ok(Number.isInteger(ref) && ref >= 0 && ref < content.sources.length);
  }
}

test("chapters and specialized content have complete source contracts", () => {
  assert.equal(new Set(content.scenes.map(scene => scene.id)).size, content.scenes.length);
  for (const scene of content.scenes) {
    for (const field of ["id", "section", "title", "headline", "notes", "question"]) {
      assert.ok(typeof scene[field] === "string" && scene[field].length > 0, `${scene.id}: ${field}`);
    }
    checkReferences(scene.refs);
    assert.ok(scene.cards.length || scene.timeline?.length);
    for (const card of scene.cards) assert.ok(card.title && card.body);
    for (const example of scene.examples ?? []) {
      assert.ok(example.title && example.caption && example.language && example.code);
      if (example.language === "json") JSON.parse(example.code);
    }
    let previousDate = "";
    for (const item of scene.timeline ?? []) {
      assert.match(item.date, /^\d{4}-\d{2}-\d{2}$/);
      assert.ok(item.date >= previousDate && item.date <= content.reviewed);
      previousDate = item.date;
      assert.ok(item.title && item.body && item.implication);
      checkReferences(item.refs);
    }
  }
});

test("all journeys contain valid chapters and meet exact duration targets", () => {
  const expected = { executive: 5, decision: 30, architect: 60 };
  assert.deepEqual(content.tracks.map(track => track.id).sort(), Object.keys(expected).sort());
  for (const track of content.tracks) {
    assert.equal(track.minutes, expected[track.id]);
    assert.ok(track.steps.length > 0);
    assert.equal(new Set(track.steps.map(step => step[0])).size, track.steps.length);
    for (const [id, minutes] of track.steps) {
      assert.ok(content.scenes.some(scene => scene.id === id), id);
      assert.ok(Number.isInteger(minutes) && minutes > 0);
    }
    assert.equal(track.steps.reduce((total, step) => total + step[1], 0), track.minutes);
  }
  const architect = content.tracks.find(track => track.id === "architect");
  for (const id of ["model-code", "mcp-code", "automation", "release-progression"]) {
    assert.ok(architect.steps.some(step => step[0] === id));
  }
});

test("renderer safely embeds content and has valid inline JavaScript", async () => {
  const template = await readFile(new URL("presenter.html", folder), "utf8");
  assert.ok(!template.includes("Customer conversation · authored guidance"));
  assert.equal(template.split("__CONTENT_JSON__").length, 2);
  const render = data => template.replace("__CONTENT_JSON__", JSON.stringify(data).replaceAll("<", "\\u003c"));
  const html = render(content);
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 2);
  for (const script of scripts) new vm.Script(script[1]);
  const hostile = render({ title: "</script><script>unexpected()</script>" });
  assert.equal([...hostile.matchAll(/<script>([\s\S]*?)<\/script>/g)].length, 2);
});

test("callouts are takeaways except for the pilot decision", () => {
  for (const scene of content.scenes) {
    assert.equal(scene.question.endsWith("?"), scene.id === "pilot", scene.id);
  }
});
