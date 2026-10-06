# Issue tracker: GitHub

Issues, specs, and tickets for this repo live in GitHub Issues. Use the `gh` CLI; it infers the repo from `git remote -v` inside a clone. If `gh` is missing or not authenticated, say so and stop; do not fall back to another way of reaching GitHub.

## Operations

### publish
`gh issue create --title "..." --body "..." --label "..."` (use a heredoc for multi-line bodies). The result is the issue URL; its number is the identifier. A label that does not exist makes the command fail, so run `check-label` first.

### fetch
`gh issue view <number> --comments`. For structured fields: `gh issue view <number> --json number,title,body,labels,state,comments`. For a ticket's parent (the spec it is attached to): `gh api repos/{owner}/{repo}/issues/<number>/parent --jq .number` (a 404 means no parent); `gh issue view` does not return it.

### search
`gh issue list --state all --json number,title,body,labels` with `--label <label>` for a label, `--state open|closed|all` for a state, and `--search "<text>"` for text in the body (a substring match; for tickets of a spec, `--search "Part of #<spec>"`).

### comment
`gh issue comment <number> --body "..."`.

### update
`gh issue edit <number> --body-file <file>`, with the full new body in a file outside the repository. Before writing, run `fetch` again and compare its body with the one the edit was based on; if they differ, stop and show the user the difference. GitHub keeps the edit history.

### label
`gh issue edit <number> --add-label "..."` or `--remove-label "..."`. Replace a state label by removing the old one in the same command.

### check-label
`gh label list --limit 200`. If a needed label is not in the list, give the user `gh label create "<label>"` and wait; never run it yourself.

### close
`gh issue close <number> --comment "..."`.

### attach-child
Run `gh issue edit <ticket> --parent <spec>`. It changes only the ticket, so the spec issue is left untouched. If this `gh` has no `--parent` flag (`gh issue edit --help` does not list it), use the REST API instead, which takes the issue's numeric `id`, not its number:

```
id=$(gh api repos/{owner}/{repo}/issues/<ticket> --jq .id)
gh api repos/{owner}/{repo}/issues/<spec>/sub_issues -X POST -F sub_issue_id="$id"
```

`{owner}/{repo}` are filled in by `gh` from the clone. If the attach fails (sub-issues not enabled, or no permission), report it and keep the `Part of #<spec>` line; do not retry blindly. The `Blocked by:` line stays the source of truth for blocking; do not rely on GitHub's own dependency feature, which the other skills do not read.

### ref
Write `#<number>`. Commit trailer: `Refs #<number>`. In a PR body, `Closes #<number>` for each ticket the PR finishes (GitHub closes it on merge) and `Refs #<spec>` for the spec.

## Specs and tickets

- A **spec** is one issue labelled `spec`.
- A **ticket** is an issue whose body starts with `Part of #<spec>`. Where the repo has GitHub sub-issues enabled, also `attach-child`.
- Blocking is a `Blocked by: #<n>, #<n>` line near the top of the ticket body. A ticket is unblocked when every listed issue is closed. `implement` can also start a ticket whose open blocker is unmerged on a branch (stacking).
