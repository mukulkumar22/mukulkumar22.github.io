# Personal Website

Jekyll-powered personal website for Mukul Kumar. The site is intentionally
minimal and typographic, with content split across Liquid templates and YAML
data files.

## Structure

- `index.html` - homepage sections for About, Experience, Projects,
  Publications, Beyond the desk, and Contact.
- `_data/` - editable content for experience, projects, papers, engagements,
  and timeline entries.
- `_includes/sidebar.html` - shared sidebar navigation and social links.
- `_layouts/` - default and post layouts.
- `_posts/` - blog posts.
- `assets/css/styles.css` - typography, layout, responsive behavior, and themes.
- `assets/js/script.js` - theme toggle, active section state, and footer year.

## Local Preview

Install dependencies and run Jekyll:

```sh
bundle install
bundle exec jekyll serve
```

Then open `http://127.0.0.1:4000`.

To build the static site:

```sh
bundle exec jekyll build
```

The generated site is written to `_site/`.

## Editing Content

- Update homepage work/project/publication content in `_data/*.yml`.
- Add blog posts to `_posts/` using Jekyll front matter.
- Update navigation/social links in `_includes/sidebar.html`.
- Update global metadata in `_config.yml`.
