# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a Turborepo monorepo using Bun as the package manager. All commands should be run from the repository root unless otherwise specified.

### Core Development Commands
```bash
# Start all apps in development mode
bun dev

# Build all apps and packages
bun build

# Format and lint all code
bun run format-and-lint

# Format and fix all code issues
bun run format-and-lint:fix

# Add a new UI component (only works from root)
bun run ui:add [component-name]
```

### Desktop App Specific Commands
```bash
# Navigate to desktop app
cd apps/desktop-app

# Start Tauri development server
bun dev

# Start only Next.js frontend (for debugging)
bun run next-dev

# Build Tauri application
bun build

# Build only Next.js frontend
bun run next-build
```

### Testing and Linting
- **Biome** is used for formatting and linting (see biome.json for configuration)
- Line width: 100 characters
- Indentation: 2 spaces
- Format: `bun run format-and-lint:fix`

## Repository Architecture

### Monorepo Structure
This is a Turborepo workspace with the following structure:

**Apps:**
- `apps/desktop-app/` - Main Tauri desktop application
- `apps/cli/` - Command-line interface
- `apps/website/` - Marketing/landing website

**Packages:**
- `packages/ui/` - Shared React component library with Tailwind CSS
- `packages/logic/` - Shared business logic
- `packages/email-stuff/` - Email templates and utilities
- `packages/typescript-config/` - Shared TypeScript configurations

### Desktop App Architecture

**Technology Stack:**
- **Backend:** Rust with Tauri v2.0.0-rc
- **Frontend:** Next.js 15.3.4 with React 19 (static export mode)
- **State Management:** Zustand with Immer middleware
- **Styling:** Tailwind CSS + shared UI components from `@geniehq/ui`
- **External Integration:** mise tool for development environment management

**Key Architectural Patterns:**

1. **Modular Store Architecture** (`src/lib/store/`):
   - Store is composed of 7 specialized slices via Zustand
   - Each slice handles a specific domain (applications, installation, profiles, etc.)
   - All slices combined into single `GenieStore` type
   - Persistent storage via Tauri's storage plugin

2. **Command Execution Pattern** (`src/lib/mise-api.ts`, `src/lib/logic.ts`):
   - All system commands go through centralized execution functions
   - OS-specific command handling (Windows/macOS/Linux)
   - Comprehensive error handling and stdout/stderr capture
   - Security-focused argument sanitization

3. **Component Organization:**
   - **Page Components:** In `src/app/` following Next.js App Router structure
   - **Widget Components:** Dashboard widgets in `src/components/dashboard-widgets/`
   - **Feature Components:** Domain-specific UI in `src/components/environment/`, `src/components/setup-configurator/`
   - **Shared UI:** Imported from `@geniehq/ui` package

### State Management Slices

The Zustand store is divided into these slices:

- **ApplicationsSlice:** Manages available apps, selections, and custom additions
- **InstallationSlice:** Handles installation queue, progress tracking, and status
- **PackageManagerSlice:** OS-specific package manager configuration
- **ProfilesSlice:** Development environment profiles and customization
- **MiseEnvironmentSlice:** mise tool integration (installation, tool management)
- **OSSlice:** Operating system detection and OS-specific behavior
- **HydrationSlice:** Store rehydration and initialization state

### External Tool Integration

**mise Integration** (`src/lib/mise-api.ts`):
- Comprehensive API wrapper for mise CLI tool
- Functions for tool installation, version management, plugin handling
- Registry integration for discovering available tools
- Bundled mise binary in `src-tauri/binaries/` for offline usage

**Package Manager Integration** (`src/lib/pm-logic.ts`):
- OS-specific package manager detection (apt, brew, winget, scoop, etc.)
- Unified interface for different package managers
- Installation command generation based on OS and package manager

## Key Conventions

### File Naming and Organization
- **React Components:** PascalCase with `.tsx` extension
- **Utility Files:** kebab-case with `.ts` extension
- **Store Slices:** kebab-case ending in `-slice.ts`
- **API Modules:** kebab-case ending in `-api.ts`

### Import Patterns
- Use `@/` for absolute imports from `src/`
- Import from `@geniehq/ui` for shared UI components
- Barrel exports in `index.ts` files for component groups

### State Management Patterns
- All state mutations through Immer middleware
- Slice functions return void (Immer handles immutability)
- Async operations in slice actions, not in components
- Persistent storage automatic via Zustand middleware

### Tauri Integration
- Next.js configured for static export (`output: "export"`)
- Frontend runs on localhost:3002 during development
- Tauri plugins: os, shell, store
- Command execution through Tauri's shell plugin for security

### Error Handling
- Console logging with emoji prefixes for easy identification
- Graceful fallbacks for experimental features (like mise registry)
- User-facing error messages through UI components
- Command execution errors captured and displayed appropriately

## Development Environment Requirements

- **Node.js:** >= 20
- **Package Manager:** Bun 1.2.16 (specified in package.json)
- **Rust:** Required for Tauri development
- **Platform Support:** Windows, macOS, Linux

## External Dependencies

**Critical External Tools:**
- **mise:** Development environment manager (bundled in src-tauri/binaries/)
- **Package Managers:** OS-specific (winget, brew, apt, etc.)

**Key Libraries:**
- Tauri 2.0.0-rc for desktop framework
- Zustand 4.5.6 for state management
- Immer 10.1.1 for immutable updates
- Next.js 15.3.4 for frontend framework
- Lucide React for icons