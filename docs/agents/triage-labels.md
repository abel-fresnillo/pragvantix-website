# Triage labels

Skills speak in seven roles: two categories and five states. This table maps each role to the label string this repo's tracker uses. Every triaged issue has exactly one category and one state.

| Role | Label in this repo | Meaning |
| --- | --- | --- |
| `bug` | `bug` | Something is broken |
| `enhancement` | `enhancement` | A new feature or improvement |
| `needs-triage` | `needs-triage` | A maintainer needs to evaluate this issue |
| `needs-info` | `needs-info` | Waiting on the reporter for more information |
| `ready-for-agent` | `ready-for-agent` | Fully specified; an agent can take it without a human in the loop |
| `ready-for-human` | `ready-for-human` | Needs a human to implement |
| `wontfix` | `wontfix` | Will not be actioned |

When a skill names a role, apply the label string from the middle column. In a local-markdown tracker the state string goes in the file's `Status:` line and the category string in a `Category:` line. Issues labelled `spec` carry no state label.
