---
name: adding-new-feature
description: Guide for setting up branches before implementing any new feature or plan. Use this whenever asked to build, add, or implement something new.
---

## Steps

### 1. Check for uncommitted changes

Run `git status --short`. If there are any uncommitted changes or untracked files:
- Warn the user
- Use `ask_user` to ask whether they want to **continue on the current branch** or **stop to commit/stash first**
- If they say stop, pause and wait. If they say continue, skip to the implementation — do not create a new branch.

### 2. Generate a branch name

If the working tree is clean, derive a branch name from the feature description or plan title:
- Format: `cp/feat/<slug>` — lowercase, hyphen-separated, max ~5 words (e.g. `cp/feat/weekly-stats-chart`)
- Run `git branch --list` to confirm the name is not already taken. If it is, append a short numeric disambiguator (e.g. `cp/feat/weekly-stats-chart-2`)

### 3. Ask the user

Use `ask_user` presenting the generated branch name with two choices:
- `"Switch to cp/feat/<slug> (Recommended)"`
- `"Stay on current branch"`

If they choose to switch: run `git switch -c cp/feat/<slug>`, then begin the implementation.
If they choose to stay: begin the implementation on the current branch.

### 4. Generate a commit message

Generate a commit message based on the changes made, and use `ask_user` if they'd like to make a commit with that message. 

If they choose yes, make the commit. If they choose no, don't make the commit and just tell them the feature is complete.
