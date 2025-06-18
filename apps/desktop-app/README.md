# GenieHQ Desktop Application

GenieHQ is a desktop application that simplifies the setup and management of your development environment. The primary goals of GenieHQ are:

1. **Streamline application installation** through various package managers
2. **Automate programming language environment setup** using [mise](https://mise.jdx.dev/)

Built with Tauri, Next.js, and TypeScript, GenieHQ provides a cross-platform desktop experience with a modern UI.

## What is mise?

[mise](https://mise.jdx.dev/) (formerly rtx) is a powerful tool that:
- Replaces version managers like asdf, nvm, pyenv, rbenv
- Manages multiple language runtime versions
- Switches environment variables for different projects
- Works as a task runner (similar to make or npm scripts)

GenieHQ integrates with mise to provide a user-friendly interface for managing your development tooling.

## Project Structure

```
desktop-app/
├── src/                 # Frontend source code
│   ├── app/             # Next.js app directory with pages and routes
│   │   ├── profiles/    # Profile management features
│   │   ├── apps/        # Applications management
│   │   ├── settings/    # Settings page
│   │   └── installer/   # Installation features
│   ├── components/      # Reusable UI components
│   ├── lib/             # Utility functions and helpers
│   └── providers/       # React context providers
├── src-tauri/           # Rust-based backend for the desktop application
├── public/              # Static assets
└── next.config.mjs      # Next.js configuration
```

## Features

- **Package Manager Integration**: Install applications through various package managers (apt, brew, winget, etc.)
- **mise Integration**: Setup and manage programming language environments
- **Environment Profiles**: Create and switch between different development environments
- **Cross-platform**: Works on Windows, macOS, and Linux
- **Modern UI**: Clean and intuitive interface built with Next.js

## Development

### Prerequisites

- Node.js 18+ and Bun package manager
- Rust development environment for Tauri
- VS Code with recommended extensions (optional)

### Setup and Development

1. Install dependencies:
   ```
   bun install
   ```

2. Start the development server:
   ```
   bun run dev
   ```

3. Build for production:
   ```
   bun run build
   ```

## Technology Stack

- [Tauri](https://tauri.app/) - Desktop application framework
- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [mise](https://mise.jdx.dev/) - Development environment manager
- Other packages: react-magic-motion, lucide-react, next-themes

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
