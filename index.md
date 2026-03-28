---
layout: default
title: Meshery Schemas Explorer
description: Browse Meshery schemas by version and type.
---

<section class="schemas-hero">
  <h1>Meshery Schemas</h1>
  <p>
    Browse schema definitions used across Meshery. Each schema includes a short description,
    version, format, and direct links.
  </p>
  <div class="schema-toolbar">
    <a href="https://docs.meshery.io/project/contributing/contributing-schemas">Schema docs</a>
    <a href="https://github.com/meshery/schemas">GitHub</a>
    <a href="https://www.npmjs.com/package/@meshery/schemas">npm package</a>
  </div>
</section>

<main class="main-content">
  {% assign grouped_schemas = site.data.schemas | group_by: "version" %}
  {% for group in grouped_schemas %}
  <section class="schema-version" id="{{ group.name }}">
    <div class="schema-version-header">
      <h2>{{ group.name }}</h2>
      <span class="count">{{ group.items | size }} schemas</span>
    </div>

    <div class="schema-grid">
      {% for schema in group.items %}
      <article class="schema-card">
        <div class="schema-card-top">
          <h3>{{ schema.name }}</h3>
          <span class="badge">{{ schema.kind }}</span>
        </div>

        <p class="schema-description">{{ schema.description }}</p>

        <dl class="schema-meta">
          <div>
            <dt>Path</dt>
            <dd><code>{{ schema.path }}</code></dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>{{ schema.format }}</dd>
          </div>
        </dl>

        <div class="schema-actions">
          {% assign slug_name = schema.name | slugify %}
          {% assign generated_page = "/explorer/" | append: schema.version | append: "/" | append: slug_name | append: "/" %}
          <a href="{{ generated_page }}">View</a>
          {% if schema.raw_url %}
          <a href="{{ schema.raw_url }}">Source</a>
          {% endif %}
        </div>
      </article>
      {% endfor %}
    </div>
  </section>
  {% endfor %}

</main>
