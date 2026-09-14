# jMunch project guidance

jCodeMunch and jDocMunch are configured in `.mcp.json` for this repository.

- For code exploration, prefer jCodeMunch symbol, outline, search, source, and reference tools over broad Read/Grep/Glob operations.
- For indexed documentation exploration, prefer jDocMunch section search, TOC, outline, and section retrieval tools.
- Use native tools for exact known paths, complete process-control files, tests and test output, command output/logs, generated or unindexed files, files outside the index, and pre-edit line verification.
- If available, call `jcodemunch_guide` or `jdocmunch_guide` for the current tool-selection policy.
- Index this repository's source and documentation before relying on retrieval tools.
