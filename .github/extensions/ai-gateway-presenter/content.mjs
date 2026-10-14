const base = "https://ai.gateway.azure.com";
const source = (title, path, group, summary) => ({ title, url: base + path, group, summary });
export const sources = [
  source("Overview", "/docs", "Getting started", "Connect applications and agents to governed models, tools and MCP servers."),
  source("Portal quickstart", "/docs/quickstarts/portal", "Getting started", "Select or create a gateway, publish assets, make a request and apply policies."),
  source("CLI quickstart", "/docs/quickstarts/cli", "Getting started", "Provision supporting infrastructure with azd provision; azd up also deploys the sample agent."),
  source("Coding-agent plugin", "/docs/quickstarts/skills", "Getting started", "Discover gateway assets and build applications using the official AI Gateway plugin."),
  source("Sample application", "/docs/quickstarts/sample", "Getting started", "Daily Repo Digest demonstrates Foundry models, a hosted agent, GitHub MCP and monitoring."),
  source(".NET sample", "/docs/quickstarts/sample-dotnet", "Getting started", "Companion .NET sample path for implementation exploration."),
  source("Models", "/docs/model-access", "Assets", "Publish providers through stable aliases; use the advertised native model interface."),
  source("MCP tools", "/docs/mcp-access", "Assets", "Federate remote MCP, selected OpenAPI operations and supported connectors."),
  source("Policies", "/docs/policies", "Governance", "Apply content safety, IP filtering and token/request controls; automate inline asset policies."),
  source("Security & identity", "/docs/security-identity", "Governance", "Separate inbound caller authorization from outbound backend authentication."),
  source("Networking", "/docs/networking", "Governance", "Configure inbound Private Link and outbound VNet integration independently."),
  source("Observability", "/docs/observability", "Governance", "Export independent OTLP metrics, logs and traces; use Application Insights for portal monitoring."),
  source("Microsoft Foundry", "/docs/foundry", "Integration", "Foundry hosts models and agents; the gateway governs access to their model and tool calls."),
  source("Agent frameworks", "/docs/agent-access", "Integration", "Connect Agent Framework, Copilot SDK and LangGraph using supported model and MCP clients."),
  source("Observability & budgets", "/docs/releases/2026-08-28", "Releases", "OTLP logs, traces, token/cost metrics and estimated model budget enforcement."),
  source("Budget overrides & tool controls", "/docs/releases/2026-09-10", "Releases", "Per-key budget overrides plus MCP tool filtering and blocking."),
  source("Aliases, Entra & streaming", "/docs/releases/2026-09-24", "Releases", "Stable aliases, Entra runtime access, gateway-scoped policies and streaming usage."),
  source("Identity cost overrides", "/docs/releases/2026-10-01", "Releases", "Identity and validated-claim budget overrides; first matching override wins."),
  source("Agent 365 integration", "/docs/releases/2026-10-08-agent-365", "Releases", "Discover and govern gateway MCP servers and individual tools from Agent 365."),
  source("Tool threat protection", "/docs/releases/2026-10-08-tool-threat-protection", "Releases", "Evaluate tool arguments before invocation and tool results afterward with Defender and Purview.")
];
const scene = (id, section, title, headline, cards, refs, notes, question, extra = {}) =>
  ({ id, section, title, headline, cards: cards.map(([title, body]) => ({title, body})), refs, notes, question, ...extra });
export const scenes = [
  scene("why", "Value", "AI adoption needs a shared control point", "Let teams build with AI. Govern how AI reaches enterprise resources.", [
    ["Access sprawl", "Applications and agents need models and tools across multiple providers."],
    ["Consistent controls", "Centralize identity, policies, private connectivity and telemetry at the gateway."],
    ["Clear ownership", "Keep model hosting and agent orchestration in Foundry or the selected framework."]
  ], [0,12,13], "Opening pitch: AI Gateway provides governed access to models and tools without becoming the agent runtime. The business value is a shared place to apply controls, rather than repeating them in every application. Treat efficiency and risk reduction as desired outcomes, not measured ROI claims.", "Centralize AI access controls without centralizing every application."),
  scene("flow", "Architecture", "One governance layer, two runtime paths", "Govern the model request and the tool call—not just the chatbot.", [
    ["Applications & agents", "Agent Framework, Copilot SDK, LangGraph or Foundry Hosted Agents call published endpoints."],
    ["AI Gateway", "Authenticate the caller, apply applicable policies and route to the selected backend."],
    ["Models & tools", "Inference remains with the model provider; tool execution remains with the registered backend."]
  ], [6,7,12,13], "Walk left to right. The diagram is a conceptual request flow, not an Azure deployment topology. A gateway is not a replacement for model capacity, agent execution or orchestration. Introduce separate inbound and outbound trust boundaries before discussing credentials.", "Apply governance to both inference requests and tool calls.", {diagram:true}),
  scene("outcomes", "Value", "Access, control and evidence", "Make governance part of the runtime path.", [
    ["Control access", "Prefer Entra ID and narrow Azure RBAC scopes for production runtime callers."],
    ["Control consumption", "Apply token/request controls and estimated cost limits where appropriate."],
    ["Explain outcomes", "Use exported telemetry to investigate requests, traces and policy decisions."]
  ], [9,11,14,16], "For executives: focus on the three outcomes, not configuration fields. For technical decision-makers: distinguish rate limits, quotas and estimated spend budgets. No policy guarantees a final Azure invoice or eliminates all AI risk.", "Combine least-privilege access, consumption controls and operational evidence."),
  scene("pilot", "Decision", "Start with a bounded customer pilot", "One use case. Named owners. Evidence before expansion.", [
    ["Select", "Choose one application, one model alias and a small set of tools."],
    ["Protect", "Validate caller access, backend credentials, representative policies and network paths."],
    ["Measure", "Observe usage, latency, failures and policy outcomes; agree the next adoption decision."]
  ], [1,4,8,11], "This is a suggested engagement plan, not a product prerequisite. Agree success criteria with the customer before selecting thresholds. Do not imply production readiness, region support or SLA without checking current service terms. End with an explicit owner and next decision.", "Who owns the pilot, and what evidence would justify expansion?"),
  scene("onboard", "Getting started", "Choose an onboarding path", "Use the portal for discovery; use code for repeatable implementation.", [
    ["Portal", "Create/select a gateway, publish assets, call a playground endpoint and apply policies."],
    ["CLI", "The sample uses azd provision for infrastructure; azd up also packages and deploys the hosted agent."],
    ["Coding agent & samples", "The official plugin discovers assets and integrates supported endpoints; explore Python or .NET samples."]
  ], [1,2,3,4,5], "Explain each path before picking a demo. These are suggested navigation stops, not a live deployment. The CLI quickstart requires access to the preview and supporting Foundry services. Never present placeholder endpoints or sample credentials as runnable customer configuration.", "Start with a guided setup, then make configuration repeatable."),
  scene("models", "Assets", "Aliases are the application contract", "Change the selected backend without renaming the client's model alias.", [
    ["Provider onboarding", "Import Foundry/Azure OpenAI deployments or configure supported custom providers."],
    ["Stable callable aliases", "Aliases are gateway-wide unique; backend model names remain provider-scoped."],
    ["Native interface", "Use the advertised Responses, Chat Completions or Anthropic Messages interface. Passthrough is not automatic protocol translation."]
  ], [6,16], "Use a concrete alias such as support-assistant as an illustrative name, not a prescribed model. Retargeting preserves the alias contract but does not guarantee behavioral equivalence between models. Validate quality, request shape, latency and policies before changing backends. Do not import broader APIM unified-API claims into this SKU.", "Keep aliases stable and validate model behavior when changing backends."),
  scene("tools", "Assets", "Turn tool access into a governed asset", "Expose only the operations an agent should discover and invoke.", [
    ["Sources", "Federate remote MCP servers, selected OpenAPI operations or supported built-in connectors."],
    ["Discovery", "One MCP server can federate backends; tool names are namespaced to avoid collisions."],
    ["Control", "Select exposed tools, filter by supported patterns and block individual tools or the server."]
  ], [7,15], "Explain why tool descriptions matter: clients use metadata when selecting tools. Exposing an OpenAPI operation does not imply that every backend protocol is translated. Backend authentication and caller authorization are independent. Introduce least-privilege tool selection before a write-capable tool demonstration.", "Expose the smallest tool surface needed for the use case."),
  scene("identity", "Governance", "Two trust boundaries—not one key", "Authorize the caller. Authenticate the gateway to the backend.", [
    ["Inbound", "Entra ID plus Azure RBAC can scope runtime access to a gateway, model alias or MCP server."],
    ["Runtime roles", "AI Gateway Models User, AI Gateway Tools User and AI Gateway User grant runtime permissions—not administration."],
    ["Outbound", "Prefer managed identity for supported Azure backends; configure provider keys or tokens when required."]
  ], [9,16], "Older quickstarts emphasize API keys, but the identity page and September 24 release document Entra runtime access. API keys are gateway-scoped and expose all published models and tools; they are not the production recommendation. Separate management-plane permissions, runtime roles and backend permissions. Never show customer secrets.", "Scope caller permissions narrowly and manage backend credentials separately."),
  scene("policies", "Governance", "Policy turns intent into runtime behavior", "Define what can pass, what is blocked and what is throttled.", [
    ["Safety & network controls", "Content safety evaluates configured categories; IP filters constrain approved callers."],
    ["Consumption", "Token limits/quotas and request limits protect capacity; cost limits govern estimated model spend."],
    ["Scope", "Use documented gateway-scoped policies for broad controls and tighter asset policies where needed."]
  ], [8,14,16], "The policy guide describes asset policies; newer release notes add gateway-wide scope. Review applicability per policy and asset, not a blanket promise that every policy protects every interface. Discuss normal traffic before choosing limits. Suggested demo: compare a permitted call with a deliberately throttled request in a safe test environment.", "Match each policy to the risk, asset and traffic it is intended to govern."),
  scene("budgets", "Governance", "Budget enforcement is based on estimated spend", "Tune defaults and overrides to the caller—not the invoice.", [
    ["Estimated model cost", "Use observed tokens and public model pricing for spend attribution and enforcement."],
    ["Budget windows", "Release notes describe hourly, daily, weekly, monthly and yearly cost-limit windows."],
    ["Caller overrides", "Per-key and Entra identity/claim overrides tailor budgets; first matching identity override wins."]
  ], [14,15,17], "Do not turn this into a price calculator: the requested source does not establish a complete SKU price sheet. Estimated spend is not a guaranteed final billing amount. Keep identity counting separate by tenant and object ID. Evaluate overlapping claim matches and test rule ordering deliberately.", "Use caller-specific budgets to govern estimated spend—not final billing."),
  scene("observe", "Governance", "Observe the complete request path", "Investigate usage, decisions and failures with correlated telemetry.", [
    ["Independent signals", "Configure OTLP metrics, logs and traces endpoints independently."],
    ["Portal experience", "Use Application Insights as the destination for built-in monitoring views."],
    ["External platform", "Use a supported third-party OTLP destination and inspect telemetry there."]
  ], [11,14,16], "The MCP guide contains an older statement that tool monitoring is unavailable. Observability guidance and August 28 release notes document MCP executions and broader signals; do not repeat the older limitation as current. Token metrics are for models. Estimated cost is distinct from billing. Streaming Chat Completions usage is addressed by the September 24 release.", "Correlate requests, backend activity and policy decisions to explain failures."),
  scene("network", "Architecture", "Private ingress does not create private egress", "Design client-to-gateway and gateway-to-backend connectivity separately.", [
    ["Inbound Private Link", "A private endpoint provides a private gateway IP; clients need correct private DNS."],
    ["Outbound integration", "A dedicated delegated integration subnet lets the gateway reach private backends."],
    ["Validate before closing", "Test private name resolution and both traffic paths before disabling public access."]
  ], [10], "The networking page lists East US 2 and Sweden Central during public preview. Recheck before a customer deployment. It recommends at least /27 for integration and /24 for scale headroom. Integration subnet and gateway must share region/subscription. Data residency includes backends, tools and logs—not only gateway region.", "Validate private DNS and connectivity on both sides of the gateway."),
  scene("integrate", "Integration", "Keep orchestration where it belongs", "Connect the framework's model and MCP clients to governed endpoints.", [
    ["Foundry", "Foundry model deployments provide inference; Hosted Agents run agent code."],
    ["Frameworks", "Agent Framework, Copilot SDK and LangGraph remain responsible for orchestration and state."],
    ["Configuration", "Use exact asset endpoints, callable aliases and authentication supported by the chosen SDK version."]
  ], [12,13,6,7], "Do not claim all SDK interfaces support every auth mode. Verify the chosen version and model interface. The gateway is a runtime access layer. The sample connects a hosted agent to Foundry models and GitHub MCP with monitoring; it is a reference starting point, not a customer production blueprint.", "Keep agent orchestration in the framework and access governance in the gateway."),
  scene("automation", "Implementation", "Preserve the complete policy array", "Inline asset policies are not traditional APIM policy XML.", [
    ["Read", "Read the full host model or tool-server resource and its existing inline policies."],
    ["Modify", "Add, edit or remove intended policy entries while preserving all other required entries."],
    ["Write & verify", "PATCH replaces the complete policy array. Verify effective scope and representative outcomes."]
  ], [8], "An omitted policy can be removed unintentionally when the array is replaced. The guide uses preview ARM APIs; copy the exact current resource schema from the documentation. Plan conflict/concurrency handling using whatever the current API supports rather than inventing ETag guarantees. Validate errors and preserve existing configuration. The code shown is the documentation's PATCH command, not an instruction to execute it. model-policy.json must contain the complete desired policy array, not just the new entry.", "Treat policy updates as complete, reviewed configuration changes.", {examples:[{
    title:"PATCH the host model · Azure CLI", language:"bash",
    caption:"Documentation command with placeholder resource names. Read first; preserve the complete policies array in model-policy.json. Display only—no execution.",
    code:'az rest --method patch \\\n  --url "https://management.azure.com/subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.ApiManagement/service/<gateway-name>/workspaces/default/modelProviders/<provider-name>/models/<model-name>?api-version=2025-09-01-preview" \\\n  --body @model-policy.json'
  }]}),
  scene("model-code", "Implementation", "Model call: make the gateway contract explicit", "A native OpenAI Responses call, routed by callable alias.", [
    ["Published endpoint", "Copy the OpenAI-compatible base URL from the model details page."],
    ["Callable alias", "The model field must match the registered alias—not an arbitrary provider model name."],
    ["Gateway credential", "The documentation's key-based sample sends api-key through default_headers."]
  ], [6,9], "Adapted from the Models page Python Responses example: the placeholder URL and alias are moved to required environment variables. Install the OpenAI SDK separately. Set AI_GATEWAY_MODEL_BASE_URL to the advertised base URL and AI_GATEWAY_MODEL_ALIAS to a valid alias. api_key='unused' follows the documented SDK sample and is not a credential. This is a key-based demonstration, not the recommended Entra/RBAC production auth pattern. Use only a model that advertises Responses. Do not execute customer requests from the presentation.", "Use the registered alias and advertised interface as the client contract.", {examples:[{
    title:"OpenAI Responses through AI Gateway · Python", language:"python",
    caption:"Adapted documentation example. Requires OpenAI SDK, a Responses-capable alias, and environment-provided configuration. Display only.",
    code:'import os\nfrom openai import OpenAI\n\nclient = OpenAI(\n    base_url=os.environ["AI_GATEWAY_MODEL_BASE_URL"],\n    api_key="unused",\n    default_headers={"api-key": os.environ["AI_GATEWAY_API_KEY"]},\n)\n\nresponse = client.responses.create(\n    model=os.environ["AI_GATEWAY_MODEL_ALIAS"],\n    input="Summarize this request.",\n)\nprint(response.output_text)'
  }]}),
  scene("mcp-code", "Implementation", "MCP client: point discovery at governed tools", "The client calls one MCP endpoint; the gateway owns backend credentials.", [
    ["Streamable HTTP", "Copy the MCP endpoint from the published server details page."],
    ["Caller authentication", "The documentation shows api-key on the inbound MCP client connection."],
    ["Discovery boundary", "The server exposes the selected tools; backend credentials do not belong in this client configuration."]
  ], [7,9,15], "Representative JSON configuration from the MCP tools page. All angle-bracket values are placeholders and must be supplied through the client's supported secret/configuration flow. Client configuration schemas vary—verify this shape with the actual client. Do not paste real keys into presentation files. The older MCP page focuses on keys; newer identity guidance also documents Entra/RBAC. Discovering tools is different from invoking a potentially state-changing tool.", "Discover governed tools without distributing backend credentials to clients.", {examples:[{
    title:"Governed MCP server · JSON client configuration", language:"json",
    caption:"Documentation configuration shape with placeholders. Use the actual client's supported secret store; never embed a real key in the presentation.",
    code:'{\n  "mcpServers": {\n    "ai-gateway-tools": {\n      "url": "https://<gateway>.azure-api.net/default/toolservers/<server-name>/mcp",\n      "headers": {\n        "api-key": "<runtime-access-key>"\n      }\n    }\n  }\n}'
  }]}),
  scene("release-progression", "Releases", "Feature progression: visibility to identity-aware governance", "Five documented releases show how the runtime control layer expanded.", [], [14,15,16,17,18,19],
    "Walk the timeline from August to October rather than reading a feature list. August established telemetry and estimated-spend governance; September added tool controls, aliases and identity-aware scope; October added finer budget exceptions and Agent 365 tool governance/protection. This is a retrospective of published releases, not a roadmap. Verify entitlement and configuration before claiming integration availability for a particular customer. Streaming usage is documented for Chat Completions, not every protocol.",
    "Published releases expanded visibility, caller-aware controls and tool protection.", {timeline:[
      {date:"2026-08-28", title:"Observability & estimated budgets", body:"OTLP logs, traces, token/cost metrics, correlation and model budget enforcement.", implication:"Establish operational evidence and consumption controls.", refs:[14]},
      {date:"2026-09-10", title:"Targeted budgets & tool controls", body:"Per-key budget overrides plus MCP tool filtering and server/tool blocking.", implication:"Differentiate application budgets and reduce exposed tool surface.", refs:[15]},
      {date:"2026-09-24", title:"Stable aliases & Entra runtime access", body:"Alias retargeting, scoped RBAC, gateway-wide policies and streamed Chat Completions usage.", implication:"Separate application contracts, backend selection and caller authorization.", refs:[16]},
      {date:"2026-10-01", title:"Identity-aware budget exceptions", body:"Budget overrides by Entra identity or validated token claims; first matching override wins.", implication:"Review tenant/object-ID counting and overlapping rule ordering.", refs:[17]},
      {date:"2026-10-08", title:"Agent 365 governance & tool protection", body:"MCP inventory and tool controls; Defender/Purview checks before and after tool invocation.", implication:"Connect runtime tool governance with enterprise administration and threat controls.", refs:[18,19]}
    ]}),
  scene("threat", "Releases", "Govern and protect tool calls", "Pair tool inventory control with checks around invocation.", [
    ["Agent 365 inventory", "Discover gateway MCP servers and control servers or individual tools from Agent 365."],
    ["Before invocation", "Evaluate tool names and arguments for malicious content, injection and sensitive-data risks."],
    ["After invocation", "Inspect tool results before returning them, using documented Defender/Purview integration."]
  ], [18,19], "These October 8 release features are not a guarantee that all attacks are prevented. Validate integration setup, customer entitlement and the exact supported configuration in linked guidance. Treat write-capable tools as customer-approved actions; do not execute them merely to demonstrate protection.", "Check tool inputs before invocation and results before returning them."),
  scene("validation", "Implementation", "Architecture review: prove the boundaries", "Test the intended contract—not just a successful happy-path request.", [
    ["Access & protocol", "Test allowed/denied identities, alias scope and native request/response compatibility."],
    ["Policies & telemetry", "Exercise throttling, blocks, budgets and trace correlation with representative traffic."],
    ["Network & operations", "Verify private DNS in both directions, backend credential rotation and error diagnosis."]
  ], [6,8,9,10,11], "This is a suggested validation checklist, not a product conformance certification. Use 401/403 diagnostics before changing permissions: a 403 can originate in RBAC, gateway policy, proxy or backend. Avoid blindly retrying tool calls after failures; a backend action may already have occurred. Establish operational ownership.", "Prove access, policy, network and operational boundaries before production."),
  scene("releases", "Releases", "A dated feature snapshot—not a roadmap", "Use releases to explain what changed and what must be revalidated.", [
    ["August & September", "OTLP and budgets; tool filtering; aliases, Entra access, gateway scope and streaming usage."],
    ["October 1", "Entra identity and validated-claim budget overrides with first-match ordering."],
    ["October 8", "Agent 365 inventory governance and Defender/Purview tool threat protection."]
  ], [14,15,16,17,18,19], "Content was reviewed October 14, 2026. Do not promise future features or infer GA/SLA/pricing from release notes. The portal is a changing preview source, and older guidance can lag releases. Check current regional availability, commercial terms and feature applicability before making commitments.", "Base design decisions on documented capabilities—not roadmap assumptions.")
];
export const tracks = [
  {id:"executive", name:"Executive pitch", level:"L100", minutes:5, audience:"Business sponsors & executives", promise:"Why it matters, the operating model and a clear pilot decision.", steps:[["why",1],["flow",1],["outcomes",1],["releases",1],["pilot",1]]},
  {id:"decision", name:"BDM / TDM briefing", level:"L200", minutes:30, audience:"Business & technical decision-makers", promise:"Capabilities, governance choices and the adoption conversation.", steps:[["why",2],["flow",3],["onboard",3],["models",3],["tools",3],["identity",3],["policies",3],["budgets",2],["observe",2],["releases",2],["pilot",4]]},
  {id:"architect", name:"Architect deep dive", level:"L300 / L400", minutes:60, audience:"Architects & implementation teams", promise:"Request contracts, representative code, governance progression and validation.", steps:[["flow",3],["onboard",2],["models",4],["model-code",4],["tools",4],["mcp-code",3],["identity",5],["policies",4],["budgets",3],["network",5],["observe",4],["integrate",3],["automation",4],["threat",3],["release-progression",3],["validation",4],["pilot",2]]}
];
export const content = { title:"AI Gateway", subtitle:"Customer presentation studio", reviewed:"2026-10-14", sourceHome:base+"/docs", sources, scenes, tracks, caveats:[
  "This canvas focuses on the AI Gateway portal/SKU documentation—not a blanket feature comparison across all API Management tiers.",
  "Preview documentation changes. Confirm current region support, pricing, service terms, entitlement and feature applicability before customer commitments.",
  "Security/identity and newer releases document Entra runtime access; older quickstarts focus on gateway-wide API keys.",
  "Observability guidance and newer releases document MCP monitoring; the older MCP guide still says it is unavailable.",
  "Model interfaces are documented as passthrough. Do not assume the protocol translation described for other APIM offerings applies here.",
  "Presentation framing, discovery questions, time allocations and validation checklists are authored guidance, not product guarantees."
]};
