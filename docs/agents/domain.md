# Domain docs

How skills read this repo's domain documentation before working in it.

## Read first

- `GLOSSARY.md` at the repo root, or `GLOSSARY-MAP.md` if it exists (it points to one `GLOSSARY.md` per context; read the ones relevant to the topic).
- `docs/adr/`: ADRs touching the area you are about to change. Skip ADRs marked `superseded`; follow the one that replaced them. In multi-context repos also check `<context>/docs/adr/`.

If a file does not exist, proceed silently. Do not flag its absence or suggest creating it; the `domain-modeling` skill creates these files when a term or decision is actually settled.

## Layout

`GLOSSARY.md` and `docs/adr/` at the repo root.

## Use the glossary's words

Name domain concepts as the glossary defines them (issue titles, test names, proposals). Do not drift to a synonym the glossary rejects. A concept that is missing from the glossary means either you are inventing language the project does not use, or there is a real gap to hand to `domain-modeling`.

## Flag ADR conflicts

If your output contradicts an accepted ADR, say so explicitly instead of overriding it quietly, for example: "Contradicts ADR-0007 (event-sourced orders); worth reopening because ...".
