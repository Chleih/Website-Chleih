<div align="center">

# Portfolio - [chleih.com](https://chleih.com)

</div>

<div align="center">
  <img src="./src/assets/images/placeholder.jpg" alt="My Website" width="700" />
  <br /><br />
  <a href="https://forthebadge.com">
    <img src="./src/assets/images/badges/built-with-love.svg" alt="Built with love" />
  </a>
  <a href="https://forthebadge.com">
    <img src="./src/assets/images/badges/made-with-javascript.svg" alt="Made with JavaScript" />
  </a>
</div>

## 👋🏽 Introduction

Welcome to the repository of my personal portfolio website. This site showcases my skills, projects, and a bit about myself.
The project is built with a simple frontend stack and is structured to support clean development, shared team conventions, and future scalability.

## 🛠 Technologies used

- **HTML**: Structures the content of the website.
- **CSS**: Styles and layouts the website.
- **JavaScript**: Adds interactivity and enhances the user experience.
- **Sass (SCSS)**: Used to structure and maintain styles in a modular way.
- **Node.js & npm**: Used for local development tooling and dependency management.
- **Prettier**: Used as the shared code formatter for consistent formatting across the project.
- **ESLint**: Used to analyse JavaScript code and maintain code quality.
- **EditorConfig**: Used to enforce consistent editor behavior such as indentation, line endings, and final newlines.

## 🚀 Getting started

### 1. Prerequisites

Make sure the following are installed on your machine:

- **Node.js**
- **npm**
- **Git**
- **VS Code** (recommended)

## 🎨 Formatting and code consistency

This project uses shared formatting and linting configuration to ensure code stays consistent across developers and machines.

### Prettier

Prettier is used as the project formatter.

- The project configuration lives in `.prettierrc`
- Ignored files are defined in `.prettierignore`
- Prettier is installed through the project dependencies via `npm install`

Recommended VS Code extension:

- **Prettier - Code formatter**

### ESLint

ESLint is used to analyse JavaScript code for potential issues and maintain consistent code quality.

- The project configuration lives in `eslint.config.js`
- ESLint is installed through the project dependencies via `npm install`
- Linting can be run manually with:

```bash
npm run lint
```

- Auto-fixable lint issues can be fixed with:

```bash
npm run lint:fix
```

Recommended VS Code extension:

- **ESLint**

### EditorConfig

EditorConfig is used to keep consistent:

- indentation
- line endings
- final newlines
- whitespace behavior

The shared rules are defined in `.editorconfig`.

Recommended VS Code extension:

- **EditorConfig for VS Code**

## ✅ Quality checks

This project uses GitHub Actions to run shared quality checks on pull requests and protected branches.

Current CI checks include:

- **Sass build**
- **Prettier check**
- **ESLint**

These checks help ensure that code is buildable, formatted consistently, and linted before being merged.

## ✨ Features

- **Interactive UI**: Enhanced with JavaScript for a smooth user experience.
- **Responsive Design**: Website optimized for different screen sizes.
- **Modular Sass Structure**: Organized SCSS architecture for maintainability and future growth.
- **Shared Formatting Setup**: Prettier, ESLint, and EditorConfig help keep the codebase consistent.

## 🤝 Contribution

Feel free to fork this repository, open pull requests, or suggest improvements.
This repository uses:

- a shared **Pull Request template**
- shared **workspace settings**
- **CODEOWNERS**
- **Dependabot**
- **GitHub Actions** for continuous integration

## 🌿 Branch strategy

This project follows a structured Git branching strategy to support organized development, controlled releases, and a clear separation between ongoing work and production-ready code.

### Branches

- **`main`** - Contains production-ready code only. This branch should always reflect the latest stable version of the project.
- **`develop`** - Serves as the main integration branch for ongoing development. Completed work is merged here before being prepared for release.
- **`feature/*`** - Used for developing new functionality. Feature branches are created from `develop` and merged back into `develop` once the work is complete.
- **`release/*`** - Used to prepare a new production release. Release branches are created from `develop` when the next version is ready for stabilization and final adjustments before deployment.
- **`hotfix/*`** - Used for urgent fixes to production issues that require immediate attention. Hotfix branches are created from `main` and merged back into both `main` and `develop` to keep all branches aligned.

### Branch protection and review process

The repository is configured to simulate a team-oriented development workflow.

Protected branches such as `develop` and `main` are intended to be updated through pull requests rather than through direct commits by regular contributors.

The repository uses branch protection / rulesets to support:

- pull request based changes
- required reviews
- required status checks
- conversation resolution before merge
- controlled bypass permissions for admins only

### Continuous integration

Pull requests and protected branches are validated through GitHub Actions.

The current CI pipeline checks:

- Sass compilation
- Prettier formatting
- ESLint validation

### Code ownership

This repository uses a `CODEOWNERS` file to define ownership of key parts of the codebase and support a clearer review process.

### Dependency management

This repository uses **Dependabot** to help keep dependencies up to date through pull requests targeting the development branch.

### Branch structure

```text
main
├── develop
│   ├── feature/*
│   └── release/*
└── hotfix/*
```

### Typical workflow

1. Create a `feature/*` branch from `develop`
2. Implement the required changes
3. Run relevant local checks
4. Open a pull request into `develop`
5. Ensure CI checks pass
6. Complete review and merge into `develop`
7. Promote changes toward `main` through the defined release / hotfix workflow

## 📞 Contact

For questions or discussions about a project, contact me via [my email](mailto:Chleih@outlook.com) or on [LinkedIn](https://www.linkedin.com/in/chleih/).
