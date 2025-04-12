
<p style="text-align:center;" align="center"><a href="https://meshery.io"><picture>
 <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/meshery/meshery/master/.github/assets/images/readme/meshery-logo-light-text-side.svg">
 <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/meshery/meshery/master/.github/assets/images/readme/meshery-logo-dark-text-side.svg">
<img src="https://raw.githubusercontent.com/meshery/meshery/master/.github/assets/images/readme/meshery-logo-dark-text-side.svg"
alt="Meshery Logo" width="70%" /></picture></a><br /><br /></p>
<p align="center">
<a href="https://hub.docker.com/r/layer5/meshery" alt="Docker pulls">
  <img src="https://img.shields.io/docker/pulls/layer5/meshery.svg" /></a>
<a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+org%3Alayer5io+org%3Ameshery+org%3Aservice-mesh-performance+org%3Aservice-mesh-patterns+org%3A+label%3A%22help+wanted%22+" alt="GitHub issues by-label">
  <img src="https://img.shields.io/github/issues/layer5io/meshery/help%20wanted.svg?color=informational" /></a>
<a href="https://github.com/meshery/meshery/blob/master/LICENSE" alt="LICENSE">
  <img src="https://img.shields.io/github/license/meshery/meshery?color=brightgreen" /></a>
<a href="https://artifacthub.io/packages/helm/meshery/meshery" alt="Artifact Hub Meshery">
  <img src="https://img.shields.io/endpoint?color=brightgreen&label=Helm%20Chart&style=plastic&url=https%3A%2F%2Fartifacthub.io%2Fbadge%2Frepository%2Fartifact-hub" /></a>  
<a href="https://goreportcard.com/report/github.com/meshery/meshery" alt="Go Report Card">
  <img src="https://goreportcard.com/badge/github.com/meshery/meshery" /></a>
<a href="https://github.com/meshery/meshery/actions" alt="Build Status">
  <img src="https://img.shields.io/github/actions/workflow/status/meshery/meshery/release-drafter.yml" /></a>
<a href="https://bestpractices.coreinfrastructure.org/projects/3564" alt="CLI Best Practices">
  <img src="https://bestpractices.coreinfrastructure.org/projects/3564/badge" /></a>
<a href="http://discuss.meshery.io" alt="Discuss Users">
  <img src="https://img.shields.io/discourse/users?label=discuss&logo=discourse&server=https%3A%2F%2Fdiscuss.layer5.io" /></a>
<a href="https://slack.meshery.io" alt="Join Slack">
  <img src="https://img.shields.io/badge/Slack-@layer5.svg?logo=slack" /></a>
<a href="https://twitter.com/intent/follow?screen_name=mesheryio" alt="Twitter Follow">
  <img src="https://img.shields.io/twitter/follow/mesheryio.svg?label=Follow+Meshery&style=social" /></a>
<a href="https://github.com/meshery/meshery/releases" alt="Meshery Downloads">
  <img src="https://img.shields.io/github/downloads/meshery/meshery/total" /></a>  
<!-- <a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fmeshery%2Fmeshery?ref=badge_shield" alt="License Scan Report">
  <img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmeshery%2Fmeshery.svg?type=shield"/></a>  
  -->
</p>

<h5><p align="center"><i>If you’re using Meshery or if you like the project, please <a href="https://github.com/meshery/meshery/stargazers">★</a> this repository to show your support! 🤩</i></p></h5>

# Meshery Schemas

Meshery follows schema-driven development. As a project, Meshery has different types of schemas. Some schemas are external facing, and some internal to Meshery itself. This repository serves as a central location for storing schemas from which all Meshery components can take reference.

Meshery schemas offer a powerful system designed for:

- **Model-Driven Management:** Meshery uses explicit models for describing infrastructure and applications.
- **Dynamic Discovery:** The ability to process different kinds of relationships and styles, enables a sophisticated system that can adapt to many configurations.
- **Lifecycle Management:** The schema properties track status and lifecycle of resources.
- **Extensibility:** Open-ended metadata and modular schema components enable expansion and customization.
- **Visual Representation:** The properties for styling of edges and nodes is for creating a user friendly visual representation.
- **Automated Operations:** The schemas can support validation and automated configuration of infrastructure and applications, and patching.


<!-- The schema.go emabeds the openapi schema which gets packaged & released  used for purpose like validation

We can refer the unresolved schemas, but
1. It increases the size of the pkg as it will then embed multiple dirs.
2. Resolution of refs at run time is ineffective. And because every request will be valiated, it is better to pre-process the schema.
-->

<!-- For code generation (schema to golang structs), unresolved schemas should be used, and proper import mappings needs to be provided.
(In some cases, first level resolution of schemas might be required.)
 -->
### External

Meshery schemas file structure is defined based on definitions and schemas, checkout [docs.meshery.io](https://docs.meshery.io/concepts/logical) to learn more about definitions and schemas.

Definitions
- model
  - version
    - model.definition
    - components
      - component-1.definition
      - component-2.definition
    - policy.definition
    - relationship.definition

Schemas
- constructs
  - schema.version // Schema version
    - component.schema
    - model.schema
    - policy.schema
    - relationship.schema

REST API
 - swagger.yaml

Adapters
- meshes.proto
 
<p style="clear:both;">&nbsp;</p>

## Join the Meshery community!

<a name="contributing"></a><a name="community"></a>
Our projects are community-built and welcome collaboration. 👍 Be sure to see the <a href="https://docs.meshery.io/project/contributing#not-sure-where-to-start">Contributor Welcome Guide</a> and <a href="https://meshery.io/community#handbook">Community Handbook</a> for a tour of resources available to you and the <a href="https://layer5.io/community/handbook/repository-overview">Repository Overview</a> for a cursory description of repository by technology and programming language. Jump into community <a href="https://slack.meshery.io">Slack</a> or <a href="https://meshery.io/community#discussion-forums">discussion forum</a> to participate.

<p style="clear:both;">
<a href ="https://meshery.io/community"><img alt="MeshMates" src=".github/assets/images/readme/layer5-community-sign.png" style="margin-right:36px; margin-bottom:7px;" width="140px" align="left" /></a>
<h3>Find your MeshMate</h3>

<p>MeshMates are experienced community members, who will help you learn your way around, discover live projects, and expand your community network. Connect with a Meshmate today!</p>

Find out more on the <a href="https://meshery.io/community#meshmates">Meshery community</a>. <br />

</p>
<br /><br />
<div style="display: flex; justify-content: center; align-items:center;">
<div>
<a href="https://meshery.io/community"><img alt="Meshery Cloud Native Community" src="https://docs.meshery.io/assets/img/readme/community.png" width="140px" style="margin-right:36px; margin-bottom:7px;" width="140px" align="left"/></a>
</div>
<div style="width:60%; padding-left: 16px; padding-right: 16px">
<p>
✔️ <em><strong>Join</strong></em> any or all of the weekly meetings on <a href="https://meshery.io/calendar">community calendar</a>.<br />
✔️ <em><strong>Watch</strong></em> community <a href="https://www.youtube.com/@mesheryio?sub_confirmation=1">meeting recordings</a>.<br />
✔️ <em><strong>Fill-in</strong></em> a <a href="https://layer5.io/newcomers">community member form</a> to gain access to community resources.
<br />
✔️ <em><strong>Discuss</strong></em> in the <a href="https://meshery.io/community#discussion-forums">Community Forum</a>.<br />
✔️ <em><strong>Explore more</strong></em> in the <a href="https://meshery.io/community#handbook">Community Handbook</a>.<br />
</p>
</div>
<div>&nbsp;</div>

## Contributing

Please do! We're a warm and welcoming community of open source contributors. All types of contributions are welcome. Please read:

- [General Contributor Guide](https://docs.meshery.io/project/contributing) - Overview of contribution processes
- [Schema Contributor Guide](./CONTRIBUTING.md) - Schema-specific development workflows and guidelines

<div>&nbsp;</div>


# **Schema-Driven Development Guide**

Meshery follows a **Schema-Driven Development (SDD)** approach. This means that the **structure of data** used in the application is defined using **schemas**, ensuring consistency, validation, and code generation across the project.  

## **Schema Definition in Meshery**
Meshery uses **OpenAPI v3** specification to define schemas. Given the complexity of the project, where multiple constructs and APIs exist, we adopt a structured approach to schema management:  
- **Schemas are versioned** to maintain backward compatibility.  
- **Schemas are modular** to support different components of Meshery independently.  
- **Schemas are used for validation, API definition, and automatic code generation.**  

### **Schema Directory Structure**
All schemas are stored in the **`schemas`** directory at the root of the project. The structure follows:  

```
schemas/
  constructs/
    <schema-version>/               # e.g., v1beta1
      <construct>/                  # e.g., model, component
        <construct>.json            # Schema definition for the construct (noun)
        subschemas/                 # Any subschemas used within the construct
        openapi.yml                 # OpenAPI schema defining API operations (verbs like create, update, delete)
        <construct>_template.json   # json template generated from schema
        <construct>_template.yaml   # yaml template generated from schema
```

### **Explanation**
- **`constructs/`** – Contains schemas for different versions.  
- **`<schema-version>/`** – Each schema version (e.g., `v1beta1`, `v1alpha2`) is a separate directory.  
- **`<construct>/`** – Each construct (e.g., `capability`, `category`) has its own folder.  
- **`<construct>.json`** – Defines the **schema for the noun** (i.e., the entity).  
- **`subschemas/`** – Contains reusable subschemas for modularity.  
- **`openapi.yml`** – Defines **API operations** (verbs: `create`, `update`, `delete`) and serves as the **entry point** for the schema.  
- **`<construct>_template.json`** - json template generated from schema. Valid json document generated from schema definition. Has all references resolved, contains default values.
- **`<construct>_template.yaml`** - yaml template generated from schema. Valid yaml document generated from schema definition. Has all references resolved, contains default values.

This approach ensures that **schemas are well-organized, reusable, and scalable** across different Meshery components.

---

## **Code Generation**
Meshery supports **automatic code generation** for:
- **Golang** (structs and types)
- **TypeScript** (interfaces and types)

### **Generating Code from Schemas**
The schema-to-code mapping is defined in **`generate.sh`**, which automates the generation process.

#### **Generating Golang Models**
To generate Go structs from schemas, use:  
```bash
make golang-generate
```

#### **Generating TypeScript Models**
To generate TypeScript types from schemas, use:  
```bash
make generate-ts
```

### **Schema-to-Code Mapping**
Example mapping in **`generate.sh`**:
```bash
generate_schema_models <construct> <schema-version>
generate_schema_models "capability" "v1alpha1"
generate_schema_models "category" "v1beta1"
generate_schema_models "component" "v1beta1"
generate_schema_models "pattern" "v1beta1" "schemas/constructs/v1beta1/design/openapi.yml"
generate_schema_models "core" "v1alpha1"
generate_schema_models "catalog" "v1alpha2"
```
- The **package name matches the construct name**.
- Example: For the `capability` construct in `v1alpha1`, the generated Go code will be in:
  ```
  models/v1alpha1/capability/capability.go
  ```

### **Example Output**
```bash
./generate-golang.sh
🔹 Processing: capability (v1alpha1)...
✅ Generated: models/v1alpha1/capability/capability.go
🔹 Processing: category (v1beta1)...
✅ Generated: models/v1beta1/category/category.go
🔹 Processing: pattern (v1beta1)...
✅ Generated: models/v1beta1/pattern/pattern.go
🔹 Processing: core (v1alpha1)...
✅ Generated: models/v1alpha1/core/core.go
🔹 Processing: catalog (v1alpha2)...
✅ Generated: models/v1alpha2/catalog/catalog.go
```

This ensures that schemas remain the **single source of truth**, making development **efficient, consistent, and scalable**.  

### License

This repository and site are available as open-source under the terms of the [Apache 2.0 License](https://opensource.org/licenses/Apache-2.0).

<p align="center" >
MESHERY IS A CLOUD NATIVE COMPUTING FOUNDATION PROJECT
</p>
