# AI Gateway presentation studio

A portable GitHub Copilot Desktop canvas that presents Microsoft AI Gateway
documentation as guided customer conversations.

**Source and attribution:** Product information comes from Microsoft's
[AI Gateway documentation](https://ai.gateway.azure.com/docs).
This canvas is a curated presentation-oriented visualization of that source,
not a new product specification or an official Microsoft presentation.
It summarizes and organizes the documentation for different audiences; it adds
authored presenter notes, questions, pacing and architecture discussion points.
The original documentation remains authoritative. Each chapter links to its
source pages. See [source attribution](SOURCE-ATTRIBUTION.md).

The bundled snapshot was reviewed on **2026-10-14**. It is not a live feed.
Preview features, regions, commercial terms and integration applicability must
be checked against current documentation before customer commitments.

## Guided journeys

### Speaker / preparation view

![Speaker view of the opening executive chapter, with audience selection, chapter agenda, timing and preparation controls](https://raw.githubusercontent.com/sjuratov/ai-gateway-presentation-studio/main/docs/images/canvas-preview.png)

*Speaker view of "AI adoption needs a shared control point": choose the audience
journey, browse its agenda and prepare with timing, source links and optional
presenter notes. Select Present to switch to the customer-facing view.*

### Customer / Present view

![Customer-facing Present view of the same opening executive chapter, with preparation metadata hidden and chapter navigation visible](https://raw.githubusercontent.com/sjuratov/ai-gateway-presentation-studio/main/docs/images/canvas-present-view.png)

*The same chapter in Present mode: the message, discussion question and source
links remain visible, while level selectors, agenda, timings, timer and presenter
notes are hidden. Back, Next chapter and Exit presentation remain available.*

| Journey | Duration | Focus |
|---|---:|---|
| Executive / L100 | 5 minutes | Value, governance outcomes and pilot decision |
| BDM / TDM / L200 | 30 minutes | Capabilities, adoption and governance choices |
| Architects / L300-L400 | 60 minutes | Architecture, representative code, release progression and validation |

Preparation mode provides an agenda, timing, presenter notes, a timer and a
searchable documentation library. Present mode hides the level selectors,
timing and notes, while keeping Back, Next chapter and Exit presentation.
The code examples are for display and discussion: this canvas does not execute
them or provision Azure resources.

## Requirements

- GitHub Copilot Desktop with extension canvases and the
  `@github/copilot-sdk/extension` canvas API supported.
- Internet access for installation and external source links. Presentation
  content itself is bundled locally.
- Node.js 22 or later and Git if running repository checks manually.

The extension has no external package dependencies. Copilot supplies its SDK
when launching the extension; do not install or vendor the SDK.
The canvas API is experimental. This version was exercised on Copilot Desktop's
bundled runtime `1.0.95-3` on macOS. Other operating systems and app versions
require the smoke checks below; portability does not imply they were tested.

## Install as a personal canvas

In Copilot Desktop, ask:

> Install this Copilot canvas extension into my personal/user scope:
> https://github.com/sjuratov/ai-gateway-presentation-studio/tree/main/.github/extensions/ai-gateway-presenter

Approve the app's installation prompt if shown. Then ask:

> Open AI Gateway presentation studio.

This installs the canvas into the user's extensions directory and makes it
available across sessions on that machine. The repository-folder URL is for
the extension installer; it is not a hosted presentation website.

If your app does not support repository-folder installation, use the
repository-scoped option below. For a pinned installation, replace `main`
in the folder URL with a published tag or commit supported by the installer.

## Use as a repository-scoped canvas

1. Clone this repository and open it as a project in Copilot Desktop.
2. Reload extensions if the canvas is not discovered automatically.
3. Ask Copilot to open AI Gateway presentation studio.

Copilot discovers `.github/extensions/ai-gateway-presenter/extension.mjs`.
A project extension with this name shadows a personal extension of the same
name in that project. When editing or troubleshooting, verify the provider is
`project:ai-gateway-presenter`, not your personal copy.

## Present to customers

Select a level in preparation mode, then choose **Present**. Back and Next
chapter traverse that level's full sequence. Keyboard shortcuts:

| Shortcut | Action |
|---|---|
| Left / right arrow | Previous / next chapter |
| P | Enter / exit presentation |
| Esc | Return to preparation |
| N | Toggle notes in preparation mode only |

### Open in Edge or another browser

Ask Copilot for the **current canvas URL** and paste it into a browser on the
same machine. The server listens on `127.0.0.1` with a dynamically assigned port.
Keep Copilot and the canvas open. A reload, restart or canvas close can stop
that server or change its port. `ERR_CONNECTION_REFUSED` commonly indicates an
old URL; obtain the current address rather than reusing an earlier tab.

Do not share this URL with another machine: its `127.0.0.1` address refers to
that other machine, not yours. Install the extension there instead.
Browser and canvas windows share the same saved journey and chapter; they are
not separate synchronized presenter/audience views.

## Files and local state

```text
.github/extensions/ai-gateway-presenter/
  extension.mjs    Copilot registration, loopback server and saved state
  content.mjs      Source catalog, curated chapters and timed journeys
  presenter.html  Theme, rendering and presentation controls
tests/
  content.test.mjs Dependency-free repository checks
```

The running extension writes `artifacts/presentation.json` beside its entry
point. This is per-installation local state (journey, chapter and display
settings), not presentation source. `artifacts/` is ignored by Git.
Never add customer secrets, runtime keys, customer notes or local state to
this repository.

## Refresh content and update installations

Follow [REFRESH.md](REFRESH.md) when the original documentation changes.
It covers source discovery, claim verification, code samples, release
progression, snapshot dating and audience-mode review.

Validate changes from the repository root:

```sh
node --check .github/extensions/ai-gateway-presenter/extension.mjs
node --test tests/content.test.mjs
```

No `npm install` is required. These checks validate structural contracts and
syntax, not the truth of product claims or live Azure requests.

For a project-scoped installation, pull the approved changes and reload
extensions. A personal installation is a separate copy: reinstall/update it
from the approved repository folder using the app's installer. Do not assume
it tracks `main` automatically. Before an update, return to preparation and
select the first executive chapter; structural edits can change saved numeric
chapter positions. See the refresh guide for state recovery.

## Installation smoke checks

On each target app/platform:

1. Verify the extension loads and its canvas declaration lists
   `get_presentation` and `set_journey`.
2. Open the canvas; confirm all three journeys and source links.
3. Enter Present and use Back/Next through the selected sequence.
   Level selectors, timing and notes must remain hidden.
4. Exit, open the library, search it, and toggle notes and theme.
5. Reload the page and extension; confirm saved state is retained.
6. Open the current local URL in Edge; verify navigation and repeat after a
   reload using the new URL if the port changed.

## Scope

This repository is a documentation visualization, not an AI Gateway management
tool. It does not establish pricing, SLA, GA status or a product roadmap.
Source content and third-party materials retain their original ownership and
terms; attribution is not a claim that those materials are relicensed here.
