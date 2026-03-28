<div align="center">

# Portfolio - [chleih.com](https://chleih.com)

</div>

![My Website](./dist/resources/images/placeholder.jpg)

<div align="center">

[![forthebadge](https://forthebadge.com/images/featured/featured-built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

</div>

## 👋🏽 Introduction
Welcome to the repository of my personal portfolio website. This site showcases my skills, projects, and a bit about myself.

## 🛠 Technologies used
- **HTML**: Structures the content of the website.
- **CSS**: Styles and layouts the website.
- **JavaScript**: Adds interactivity and enhances the user experience.
- **SASS**: A CSS preprocessor offering features like variables, nested rules, and more.

## 🚀 Getting started
1. **Tools needed**: You will need `node.js`, `npm`, and `git` installed globally on your machine.
2. **Clone the repository**: `git clone https://github.com/Chleih/Website-Chleih.git`
3. **Navigate to the directory**: `cd portfolio-website`
4. **Compile SASS to CSS** (ensure you have the necessary tools installed): `sass src/sass/main.sass src/dist/css/main.css`
5. **Open `index.html` in a browser** to view the website.

## ✨ Features
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
1. Create a feature/* branch from develop
2. Merge completed feature work back into develop
3. Create a release/* branch from develop when preparing a new version
4. Apply only release-related fixes and final adjustments in release/*
5. Merge release/* into main once the release is ready
6. Merge release/* back into develop to keep branches aligned
7. Create hotfix/* from main for urgent production issues, then merge it into both main and develop

## 📞 Contact
For questions or discussions about a project, contact me via [my email](mailto:Chleih@outlook.com) or on [LinkedIn](https://www.linkedin.com/in/chleih/).
