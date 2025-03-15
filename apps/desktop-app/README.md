# GenieHQ Desktop Application

This is the desktop application for GenieHQ, built with Tauri, Next.js, and TypeScript. The app provides a cross-platform desktop experience with a modern UI.

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

- Cross-platform desktop application (Windows, macOS, Linux)
- Modern UI with Next.js
- Package managers integration
- Profile management
- Application installation and management
- Settings configuration

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
- Other packages: react-magic-motion, lucide-react, next-themes

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
