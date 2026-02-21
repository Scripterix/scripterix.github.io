---
lang: en
title: "Day 15 – Work on Jekyll, Codespaces and GitHub Pages"
date: 2024-10-07
hours_spent: 3
cumulative_hours: 3
phase: foundation
focus_area: "Jekyll, Codespaces, GitHub Pages, build, new post"
mood: "Engaged"
tags:
  - jekyll
  - codespaces
  - github-pages
  - devops
resources:
  - name: "Jekyll Docs"
    url: "https://jekyllrb.com/docs/"
  - name: "GitHub Pages Guide"
    url: "https://docs.github.com/en/pages"
  - name: "Codespaces Docs"
    url: "https://docs.github.com/en/codespaces"
summary: "Work on configuring Jekyll in Codespaces, pushing to GitHub Pages, building the project and adding a new post."
---

## Tasks completed

1. **Codespaces setup**
   Created a new Codespace for the repository and verified available tools (`jekyll`, `ruby`, `node`, `npm`). Tested local Jekyll run (`bundle exec jekyll serve`) and confirmed the environment works correctly.

2. **Testing GitHub integration**
   Performed a test commit and push from Codespaces to GitHub. Verified that the GitHub Pages workflow builds the site after pushing changes.

3. **Adding a new post**
   Created a new post file in the `_posts` folder, filled metadata and content. Tested locally to confirm the post appears on the site, then pushed the changes to GitHub.

4. **Verification on GitHub Pages**
   After pushing, checked the build status on GitHub Pages and verified the new post is visible on the production site.

## Conclusions

- Codespaces significantly simplifies working with Jekyll and automates parts of the deployment process.
- Integration with GitHub Pages works smoothly; the workflow is fast and predictable.
- Creating posts and testing changes locally before pushing helps avoid mistakes.
