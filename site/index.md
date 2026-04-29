---
layout: default
title: Meshery Schemas
description: Logical object models and schema definitions for the Meshery platform.
---

<style>
  .hero {
    background: var(--dark);
    padding: 3.5rem 2rem 3rem;
  }
  .hero-inner { max-width: 860px; margin: 0 auto; }
  .hero h1 {
    font-size: 1.9rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.75rem;
    line-height: 1.2;
  }
  .hero h1 em {
    font-style: normal;
    color: var(--green);
  }
  .hero p {
    color: rgba(255,255,255,0.65);
    font-size: 0.97rem;
    max-width: 560px;
    line-height: 1.75;
    margin-bottom: 1.75rem;
  }
  .hero-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .hero-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 2rem;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    color: rgba(255,255,255,0.7);
  }
  .hero-pill::before {
    content: "";
    display: inline-block;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--green);
    flex-shrink: 0;
  }

  .page { max-width: 860px; margin: 0 auto; padding: 2.5rem 2rem; }

  .jump-label {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted);
    margin-bottom: 0.65rem;
  }
  .jump-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--border);
  }
  .jump-chip {
    display: inline-block;
    font-family: var(--mono);
    font-size: 0.78rem;
    font-weight: 600;
    padding: 0.28rem 0.75rem;
    border-radius: 2rem;
    border: 1px solid var(--border);
    background: var(--bg-subtle);
    color: var(--dark);
    text-decoration: none;
    transition: all 0.15s;
  }
  .jump-chip:hover {
    background: var(--green);
    border-color: var(--green);
    color: #fff;
    text-decoration: none;
  }

  .version-card {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    margin-bottom: 1rem;
    overflow: hidden;
    transition: box-shadow 0.15s;
  }
  .version-card:hover { box-shadow: 0 2px 12px rgba(0,0,0,0.06); }

  .version-card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.25rem;
    background: var(--bg-subtle);
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    user-select: none;
  }
  .version-card-head:hover { background: #f1f5f9; }
  .version-card.collapsed .version-card-body { display: none; }
  .version-card.collapsed .version-card-head { border-bottom: none; }
  .vc-chevron { font-size: 0.7rem; color: var(--muted); transition: transform 0.2s; margin-left: 0.5rem; }
  .version-card.collapsed .vc-chevron { transform: rotate(-90deg); }
  .version-name {
    font-family: var(--mono);
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--dark);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .latest-badge {
    font-family: var(--font);
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    background: var(--green);
    color: #fff;
    padding: 0.1rem 0.45rem;
    border-radius: 2rem;
  }
  .version-count {
    font-size: 0.72rem;
    color: var(--muted);
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 2rem;
    padding: 0.1rem 0.55rem;
  }

  .version-card-body { padding: 0.875rem 1.25rem; }
  .construct-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
  .construct-tag {
    display: inline-block;
    font-family: var(--mono);
    font-size: 0.73rem;
    padding: 0.18rem 0.5rem;
    border-radius: 4px;
    background: #fff;
    color: var(--text);
    border: 1px solid var(--border);
    text-decoration: none;
    transition: all 0.12s;
  }
  .construct-tag:hover {
    background: var(--green);
    border-color: var(--green);
    color: #fff;
    text-decoration: none;
  }
  .none-label {
    font-size: 0.82rem;
    color: var(--muted);
    font-style: italic;
  }

  @media (max-width: 600px) {
    .hero { padding: 2rem 1rem; }
    .hero h1 { font-size: 1.4rem; }
    .page { padding: 1.5rem 1rem; }
  }
</style>

<section class="hero">
  <div class="hero-inner">
    <h1>Meshery <em>Schemas</em></h1>
    <p>
      Central OpenAPI schema definitions for the Meshery platform — the source of truth
      for Go struct generation, TypeScript types, and RTK Query clients across all Meshery components.
    </p>
    <div class="hero-pills">
      <span class="hero-pill">OpenAPI v3</span>
      <span class="hero-pill">Go structs</span>
      <span class="hero-pill">TypeScript types</span>
      <span class="hero-pill">RTK Query clients</span>
    </div>
  </div>
</section>

<div class="page">



{% assign versions = site.data.constructs_all | map: "version" | uniq | sort | reverse %}
{% assign construct_names = site.data.constructs_all | map: "name" | uniq %}
{% assign latest_ver = versions | first %}

<p class="jump-label">{{ versions.size }} versions · {{ construct_names.size }} constructs</p>
<div class="jump-nav">
{% for ver in versions %}
  <a class="jump-chip" href="#{{ ver }}">{{ ver }}{% if ver == latest_ver %} ✦{% endif %}</a>
{% endfor %}
</div>

{% for ver in versions %}
{% assign ver_constructs = site.data.constructs_all | where: "version", ver %}

<div class="version-card" id="{{ ver }}">
  <div class="version-card-head">
    <span class="version-name">{{ ver }}{% if ver == latest_ver %} <span class="latest-badge">latest</span>{% endif %}</span>
    <span style="display:flex;align-items:center;gap:0.5rem;">
      <span class="version-count">{{ ver_constructs.size }} construct{% if ver_constructs.size != 1 %}s{% endif %}</span>
      <span class="vc-chevron">▾</span>
    </span>
  </div>
  <div class="version-card-body">
    <div class="construct-list">
    {% for c in ver_constructs %}
      <a class="construct-tag"
         href="/constructs/view/?ver={{ c.version }}&name={{ c.name }}">{{ c.name }}</a>
    {% endfor %}
    </div>
  </div>
</div>
{% endfor %}

</div>

<script>
(function () {
  // ── Collapsible version cards ─────────────────────────────
  // Latest version stays open; all older versions start collapsed.
  const cards = document.querySelectorAll('.version-card');
  cards.forEach(function (card, i) {
    const head = card.querySelector('.version-card-head');
    if (i !== 0) card.classList.add('collapsed');
    head.addEventListener('click', function () {
      card.classList.toggle('collapsed');
    });
  });

  // ── Jump nav overflow ─────────────────────────────────────
  // Show latest 4 chips. If more exist, append a "+N more" button
  // that reveals all chips inline when clicked.
  const SHOW_MAX = 4;
  const nav   = document.querySelector('.jump-nav');
  const chips = Array.from(nav.querySelectorAll('.jump-chip'));
  if (chips.length > SHOW_MAX) {
    const hidden = chips.slice(SHOW_MAX);
    hidden.forEach(function (c) { c.style.display = 'none'; });

    const btn = document.createElement('button');
    btn.className = 'jump-chip';
    btn.style.cssText = 'cursor:pointer;border:1px dashed var(--border);background:transparent;font-family:var(--mono);font-size:0.78rem;font-weight:600;padding:0.28rem 0.75rem;border-radius:2rem;color:var(--muted);';
    btn.textContent = '+' + hidden.length + ' more';
    btn.addEventListener('click', function () {
      hidden.forEach(function (c) { c.style.display = ''; });
      btn.remove();
    });
    nav.appendChild(btn);
  }
})();
</script>
