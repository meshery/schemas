---
layout: default
title: API Reference
description: Interactive OpenAPI documentation for the Meshery and Meshery Cloud APIs.
---

<style>
  .api-hero {
    background: var(--dark);
    padding: 3rem 2rem 2.5rem;
  }
  .api-hero-inner { max-width: 860px; margin: 0 auto; }
  .api-hero h1 { font-size: 1.9rem; font-weight: 700; color: #fff; margin-bottom: 0.6rem; }
  .api-hero h1 em { font-style: normal; color: var(--green); }
  .api-hero p { color: rgba(255,255,255,0.65); font-size: 0.97rem; max-width: 560px; line-height: 1.75; }

  .api-body { max-width: 860px; margin: 0 auto; padding: 2.5rem 2rem; }

  /* View switcher */
  .view-tabs {
    display: flex;
    gap: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    width: fit-content;
    margin-bottom: 2.5rem;
  }
  .view-tab {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1.25rem;
    font-size: 0.85rem;
    font-weight: 500;
    text-decoration: none;
    background: var(--bg-subtle);
    color: var(--muted);
    border-right: 1px solid var(--border);
    transition: all 0.15s;
  }
  .view-tab:last-child { border-right: none; }
  .view-tab:hover { background: #fff; color: var(--text); text-decoration: none; }
  .view-tab.active { background: var(--green); color: #fff; border-color: var(--green); }
  .view-tab .dot { width: 8px; height: 8px; border-radius: 50%; }
  .view-tab.meshery .dot { background: #00B39F; }
  .view-tab.cloud .dot { background: #7c3aed; }
  .view-tab.active .dot { background: rgba(255,255,255,0.7); }

  /* Category grid */
  .section-label {
    font-size: 0.68rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.1em; color: var(--muted); margin-bottom: 1rem;
  }
  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2.5rem;
  }
  .category-card {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1rem 1.1rem;
    text-decoration: none;
    background: var(--bg);
    transition: all 0.15s;
    display: block;
  }
  .category-card:hover {
    border-color: var(--green);
    box-shadow: 0 2px 8px rgba(0,179,159,0.1);
    text-decoration: none;
  }
  .category-card h3 { font-size: 0.88rem; font-weight: 600; color: var(--text); margin-bottom: 0.3rem; }
  .category-card p { font-size: 0.77rem; color: var(--muted); margin: 0; line-height: 1.4; }
  .category-card .op-count {
    display: inline-block;
    margin-top: 0.6rem;
    font-size: 0.7rem;
    color: var(--green);
    font-weight: 600;
  }

  /* Construct table */
  .construct-table { width: 100%; border-collapse: collapse; font-size: 0.84rem; margin-bottom: 2rem; }
  .construct-table th {
    background: var(--bg-subtle); border: 1px solid var(--border);
    padding: 0.5rem 0.75rem; font-weight: 600; text-align: left; font-size: 0.78rem;
  }
  .construct-table td { border: 1px solid var(--border); padding: 0.5rem 0.75rem; vertical-align: middle; }
  .construct-table td code { font-family: var(--mono); font-size: 0.8em; }
  .construct-table a { color: var(--green); text-decoration: none; }
  .construct-table a:hover { text-decoration: underline; }
  .badge-count {
    display: inline-block; font-size: 0.7rem; padding: 0.1rem 0.45rem;
    border-radius: 2rem; background: var(--bg-subtle); border: 1px solid var(--border);
    color: var(--muted); font-weight: 600;
  }

  /* Notice box */
  .notice {
    background: #fffbeb; border: 1px solid #fde68a; border-radius: var(--radius);
    padding: 0.875rem 1rem; font-size: 0.85rem; color: #78350f;
    display: flex; gap: 0.75rem; margin-bottom: 2rem;
  }
  .notice code { font-family: var(--mono); font-size: 0.85em; background: rgba(0,0,0,0.06); padding: 0.1em 0.3em; border-radius: 3px; }
</style>

<section class="api-hero">
  <div class="api-hero-inner">
    <h1>API <em>Reference</em></h1>
    <p>Interactive OpenAPI documentation for the Meshery and Meshery Cloud APIs, generated from the schemas in this repository.</p>
  </div>
</section>

<div class="api-body">

<div class="view-tabs">
  <a class="view-tab meshery active" href="/api/meshery/">
    <span class="dot"></span> Meshery API
  </a>
  <a class="view-tab cloud" href="/api/cloud/">
    <span class="dot"></span> Cloud API
  </a>
</div>

<div class="notice">
  <span>⚠️</span>
  <div>
    The interactive docs require the bundled OpenAPI specs to be generated first.
    Run <code>make docs-build</code> before serving the site, then navigate to
    <a href="/api/meshery/">/api/meshery/</a> or <a href="/api/cloud/">/api/cloud/</a>.
  </div>
</div>

<p class="section-label">API categories</p>
<div class="category-grid">
  <a class="category-card" href="/api/meshery/#tag/Designs">
    <h3>Designs</h3>
    <p>Create, update, clone, import and export infrastructure designs.</p>
    <span class="op-count">24+ operations</span>
  </a>
  <a class="category-card" href="/api/meshery/#tag/Components">
    <h3>Components</h3>
    <p>Register and query component definitions for models.</p>
    <span class="op-count">2+ operations</span>
  </a>
  <a class="category-card" href="/api/meshery/#tag/Connections">
    <h3>Connections</h3>
    <p>Manage infrastructure connections and their lifecycle states.</p>
    <span class="op-count">9+ operations</span>
  </a>
  <a class="category-card" href="/api/meshery/#tag/Environments">
    <h3>Environments</h3>
    <p>Group connections into named environments.</p>
    <span class="op-count">6+ operations</span>
  </a>
  <a class="category-card" href="/api/meshery/#tag/Workspaces">
    <h3>Workspaces</h3>
    <p>Organize environments, designs and teams into workspaces.</p>
    <span class="op-count">17+ operations</span>
  </a>
  <a class="category-card" href="/api/cloud/#tag/Users">
    <h3>Users</h3>
    <p>User profiles, preferences, and account management.</p>
    <span class="op-count">4+ operations</span>
  </a>
  <a class="category-card" href="/api/cloud/#tag/Organizations">
    <h3>Organizations</h3>
    <p>Create and manage organizations and their members.</p>
    <span class="op-count">11+ operations</span>
  </a>
  <a class="category-card" href="/api/cloud/#tag/Teams">
    <h3>Teams</h3>
    <p>Create teams, assign members and manage roles.</p>
    <span class="op-count">9+ operations</span>
  </a>
  <a class="category-card" href="/api/cloud/#tag/Plans">
    <h3>Plans &amp; Subscriptions</h3>
    <p>Entitlement plans, subscriptions and feature flags.</p>
    <span class="op-count">7+ operations</span>
  </a>
  <a class="category-card" href="/api/cloud/#tag/Keys">
    <h3>Auth &amp; Keys</h3>
    <p>API tokens, keychains, and credential management.</p>
    <span class="op-count">13+ operations</span>
  </a>
</div>

<p class="section-label">Constructs with API operations</p>
<table class="construct-table">
  <thead>
    <tr>
      <th>Construct</th>
      <th>Latest version</th>
      <th>Operations</th>
      <th>Audience</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><a href="/api/meshery/#tag/Designs">design</a></td><td><code>v1beta3</code></td><td><span class="badge-count">25</span></td><td>Meshery + Cloud</td></tr>
    <tr><td><a href="/api/meshery/#tag/Workspaces">workspace</a></td><td><code>v1beta3</code></td><td><span class="badge-count">17</span></td><td>Meshery + Cloud</td></tr>
    <tr><td><a href="/api/cloud/#tag/Academy">academy</a></td><td><code>v1beta2</code></td><td><span class="badge-count">17</span></td><td>Cloud</td></tr>
    <tr><td><a href="/api/cloud/#tag/Invitations">invitation</a></td><td><code>v1beta3</code></td><td><span class="badge-count">12</span></td><td>Cloud</td></tr>
    <tr><td><a href="/api/cloud/#tag/Organizations">organization</a></td><td><code>v1beta2</code></td><td><span class="badge-count">11</span></td><td>Cloud</td></tr>
    <tr><td><a href="/api/meshery/#tag/Connections">connection</a></td><td><code>v1beta3</code></td><td><span class="badge-count">9</span></td><td>Meshery + Cloud</td></tr>
    <tr><td><a href="/api/cloud/#tag/Teams">team</a></td><td><code>v1beta2</code></td><td><span class="badge-count">9</span></td><td>Cloud</td></tr>
    <tr><td><a href="/api/cloud/#tag/Roles">role</a></td><td><code>v1beta2</code></td><td><span class="badge-count">8</span></td><td>Cloud</td></tr>
    <tr><td><a href="/api/cloud/#tag/Keychains">keychain</a></td><td><code>v1beta2</code></td><td><span class="badge-count">8</span></td><td>Cloud</td></tr>
    <tr><td><a href="/api/meshery/#tag/Environments">environment</a></td><td><code>v1beta3</code></td><td><span class="badge-count">6</span></td><td>Meshery + Cloud</td></tr>
    <tr><td><a href="/api/cloud/#tag/Subscriptions">subscription</a></td><td><code>v1beta3</code></td><td><span class="badge-count">6</span></td><td>Cloud</td></tr>
    <tr><td><a href="/api/cloud/#tag/Keys">key</a></td><td><code>v1beta2</code></td><td><span class="badge-count">5</span></td><td>Cloud</td></tr>
    <tr><td><a href="/api/cloud/#tag/Tokens">token</a></td><td><code>v1beta3</code></td><td><span class="badge-count">5</span></td><td>Cloud</td></tr>
    <tr><td><a href="/api/cloud/#tag/Events">event</a></td><td><code>v1beta3</code></td><td><span class="badge-count">10</span></td><td>Cloud</td></tr>
  </tbody>
</table>

</div>
