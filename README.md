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

Welcome to the repository of my personal portfolio website. This site showcases my skills, projects, and a bit about myself.<br>
The project is built with a simple frontend stack and is structured to support clean development, shared team conventions, and future scalability.

## 🛠 Technologies used

- **HTML**: Structures the content of the website.
- **CSS**: Styles and layouts the website.
- **JavaScript**: Adds interactivity and enhances the user experience.
- **Sass (SCSS)**: Used to structure and maintain styles in a modular way.
- **Node.js & npm**: Used for local development tooling and dependency management.
- **Prettier**: Used as the shared code formatter for consistent formatting across the project.
- **EditorConfig**: Used to enforce consistent editor behavior such as indentation, line endings, and final newlines.

## 🚀 Getting started

### 1. Prerequisites

Make sure the following are installed on your machine:

- **Node.js**
- **npm**
- **Git**
- **VS Code** (recommended)

### 2. Install dependencies

Install the project dependencies locally:

```bash
npm install
```

This ensures you get the same tooling versions used by the project, including shared development tools such as **Sass**, **Prettier**, and **ESLint**.

### 3. Start Sass watch

Compile SCSS into CSS and keep it updated while developing:

```bash
npm run sass:watch
```

### 4. Open the site locally

Open `index.html` with **Live Server** in VS Code, or in your browser if needed.

## 🎨 Formatting and code consistency

This project uses shared formatting and editor configuration to ensure code stays consistent across developers and machines.

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

### Workspace settings

Shared project-specific VS Code settings are stored in:

```text
.vscode/settings.json
```

These settings are intended to support the repo setup and team consistency, while personal editor preferences should remain in each developer’s own user settings.

## ✨ Features (TODO: Update this section)

- **Interactive UI**: Enhanced with pure JavaScript for a smooth user experience.
- **Responsive Design**: Website optimized for various screen sizes, ensuring a pleasant experience on both desktop and mobile.
- **SASS Architecture**: Modular SASS approach, making styles more maintainable.

## 🤝 Contribution

Feel free to fork this repository, submit pull requests, or suggest any other ways to improve the code.

## 🌿 Branch strategy

This project follows a structured Git branching strategy to support organized development, controlled releases, and a clear separation between ongoing work and production-ready code.

### Branches

- **`main`** - Contains production-ready code only. This branch should always reflect the latest stable version of the project.
- **`develop`** - Serves as the main integration branch for ongoing development. Completed work is merged here before being prepared for release.
- **`feature/*`** - Used for developing new functionality. Feature branches are created from `develop` and merged back into `develop` once the work is complete.
- **`release/*`** - Used to prepare a new production release. Release branches are created from `develop` when the next version is ready for stabilization and final adjustments before deployment.
- **`hotfix/*`** - Used for urgent fixes to production issues that require immediate attention. Hotfix branches are created from `main` and merged back into both `main` and `develop` to keep all branches aligned.

### Branch structure

```text
main
├── develop
│   ├── feature/*
│   └── release/*
└── hotfix/*
```

### Typical workflow

1. Create a feature/\* branch from develop
2. Merge completed feature work back into develop
3. Create a release/\* branch from develop when preparing a new version
4. Apply only release-related fixes and final adjustments in release/\*
5. Merge release/\* into main once the release is ready
6. Merge release/\* back into develop to keep branches aligned
7. Create hotfix/\* from main for urgent production issues, then merge it into both main and develop

## 📞 Contact

For questions or discussions about a project, contact me via [my email](mailto:Chleih@outlook.com) or on [LinkedIn](https://www.linkedin.com/in/chleih/).
