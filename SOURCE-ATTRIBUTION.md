# Source attribution

## Original documentation

Microsoft's **AI Gateway documentation** is the primary source:

https://ai.gateway.azure.com/docs

The canvas organizes and summarizes information from its getting-started,
assets, governance, integration and release pages so it is easier to consume
in customer presentations. It is not an independently authoritative source
of product behavior and is not an official Microsoft presentation.

The source catalog in
`.github/extensions/ai-gateway-presenter/content.mjs` records individual page
URLs. Each chapter cites the pages supporting its product claims. The
documentation library exposes these links directly.

## What is authored here

The presentation journeys, time allocations, headline framing, discussion
questions, presenter notes, conceptual diagrams and validation suggestions are
authored presentation guidance. They are not additional product features,
published benchmarks or Microsoft guarantees.

Representative code is identified as a documentation example or an adaptation.
For example, the Python model call moves the documented endpoint and alias into
required environment variables. Placeholder configurations are not executable
customer setup instructions and contain no real credentials.

The release timeline summarizes published releases; its architecture takeaways
are authored guidance. It is retrospective, not a roadmap.

## Snapshot and conflicts

The reviewed date is stored in `content.reviewed`. The initial snapshot is
2026-10-14. Source pages can change independently of this repository.
Some older pages can lag newer releases; known conflicts are surfaced in the
canvas's source caveats and presenter notes.

Always consult the current original documentation before deployment or customer
commitments. Preserve source links and this attribution when redistributing
the canvas. Microsoft and other third-party names and materials retain their
respective ownership; no endorsement or relicensing of third-party materials
is implied.
