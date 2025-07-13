# GenieHQ Desktop App - Technical Documentation

## Project Overview

**GenieHQ Desktop** is a cross-platform desktop application built with Tauri that serves as a meta-app for managing machine setup. It streamlines application installation through various package managers and automates programming language environment setup using [mise](https://mise.jdx.dev/).

### Core Purpose
- **Application Management**: Install and manage applications across different package managers
- **Environment Management**: Setup and manage development environments using mise
- **Profile-based Setup**: Create and switch between different development profiles
- **Cross-platform Support**: Works on Windows, macOS, and Linux

## Architecture Overview

### Technology Stack
- **Backend**: Rust with Tauri v2.0.0-rc
- **Frontend**: Next.js 15.3.4 with React 19
- **State Management**: Zustand with Immer for immutable updates
- **Styling**: Tailwind CSS with custom UI components
- **Storage**: Tauri's persistent storage plugin
- **External Tools**: mise for environment management

### Project Structure
```
apps/desktop-app/
├── src/                          # Frontend React/Next.js code
│   ├── app/                      # Next.js App Router pages
│   │   ├── apps/                 # Application management UI
│   │   ├── environment/          # Environment/mise management UI
│   │   ├── installer/            # Installation wizard
│   │   ├── package-managers/     # Package manager configuration
│   │   ├── profiles/             # Profile management
│   │   └── settings/             # Application settings
│   ├── components/               # Reusable UI components
│   │   ├── dashboard-widgets/    # Dashboard widget components
│   │   ├── environment/          # Environment-specific components
│   │   ├── installation-sidebar/ # Installation progress components
│   │   └── setup-configurator/   # Setup wizard components
│   ├── lib/                      # Business logic and utilities
│   │   ├── store/                # Zustand store and slices
│   │   │   └── _slices/          # Individual store slices
│   │   ├── mise-api.ts           # mise tool integration
│   │   ├── app-logic.ts          # Application management logic
│   │   └── pm-logic.ts           # Package manager logic
│   └── providers/                # React context providers
├── src-tauri/                    # Rust backend
│   ├── src/                      # Rust source code
│   ├── capabilities/             # Tauri capability definitions
│   ├── binaries/                 # External binaries (mise)
│   └── tauri.conf.json          # Tauri configuration
└── public/                       # Static assets and icons
```

## Backend Architecture (Rust/Tauri)

### Core Configuration (`src-tauri/tauri.conf.json`)
- **Product Name**: GenieHQ
- **Identifier**: com.geniehq.app
- **Window Size**: 1280x720 (default)
- **External Binary**: Includes mise binary for offline usage
- **Plugins**: OS detection, shell execution, persistent storage

### Rust Implementation (`src-tauri/src/`)
- **main.rs**: Entry point that delegates to library
- **lib.rs**: Core Tauri application setup with plugins:
  - `tauri_plugin_store`: Persistent storage
  - `tauri_plugin_os`: OS detection and system info
  - `tauri_plugin_shell`: Execute system commands
- **Commands**: Basic greet command (expandable for future native functions)

### Key Capabilities
- **Shell Access**: Execute package manager commands and mise operations
- **Storage**: Persist application state and user preferences
- **OS Detection**: Adapt behavior based on operating system
- **File System**: Access to binaries and configuration files

## Frontend Architecture (React/Next.js)

### State Management (`src/lib/store/`)

**Store Architecture**: Modular Zustand store with individual slices:

1. **Applications Slice** (`applications-slice.ts`):
   - Manages available applications from predefined list
   - Tracks selected applications for installation
   - Handles application toggling and custom additions

2. **Installation Slice** (`installation-slice.ts`):
   - Manages installation queue and progress
   - Tracks installation status for each application

3. **Package Manager Slice** (`package-manager-slice.ts`):
   - Manages available package managers per OS
   - Tracks selected/enabled package managers

4. **Profiles Slice** (`profiles-slice.ts`):
   - Manages development environment profiles
   - Handles profile selection and customization

5. **Mise Environment Slice** (`mise-environment-slice.ts`):
   - Manages mise installation status
   - Tracks installed tools and available versions
   - Handles tool installation/uninstallation

6. **OS Slice** (`os-slice.ts`):
   - Tracks current operating system
   - OS-specific behavior configuration

7. **Hydration Slice** (`hydration-slice.ts`):
   - Manages store rehydration from persistent storage
   - Ensures proper initialization state

### Core APIs and Integration

#### Mise Integration (`src/lib/mise-api.ts`)
Comprehensive API for mise tool management:

**Tool Management**:
- `checkMiseInstalled()`: Verify mise availability
- `installMise()`: OS-specific mise installation
- `listInstalledTools()`: Get installed development tools
- `listAvailableVersions(tool)`: Get available versions for a tool
- `installVersion(tool, version)`: Install specific tool version
- `useVersion(tool, version, global)`: Set tool as default
- `uninstallVersion(tool, version)`: Remove tool version

**Plugin Management**:
- `listPlugins()`: Get installed mise plugins
- `installPlugin(name)`: Install mise plugin

**Registry Integration**:
- `listRegistry()`: Get available tools from mise registry
- `installTool(name)`: Install tool from registry

#### Command Execution
All operations go through secure command execution:
- OS-specific installation commands (winget, brew, apt)
- mise command wrapper with error handling
- Proper stdout/stderr capture and processing

### UI Components Structure

#### Dashboard (`src/app/page.tsx`)
Central dashboard with widget-based layout:
- **System Status**: Display system information
- **Installed Apps**: Show installed application count
- **Package Managers**: Display active package managers
- **Active Profile**: Current development profile
- **Recent Activity**: Installation/update history
- **Quick Actions**: Common operations

#### Environment Management (`src/app/environment/`)
Mise tool management interface:
- **Tool Grid**: Display installed development tools
- **Registry View**: Browse available tools from mise registry
- **Version Management**: Install/switch between tool versions
- **Installation Progress**: Real-time installation feedback

#### Setup Wizard (`src/components/setup-configurator/`)
Guided setup process:
1. **Profile Selection**: Choose development environment type
2. **Package Manager Setup**: Configure system package managers
3. **Application Selection**: Choose applications to install
4. **Summary**: Review and confirm selections

#### Installation System (`src/components/installation-sidebar/`)
- **Progress Tracking**: Real-time installation progress
- **Queue Management**: Manage installation order
- **Error Handling**: Display and retry failed installations

## Data Flow and State Management

### Initialization Flow
1. **Store Creation**: Zustand store with all slices
2. **OS Detection**: Identify current operating system
3. **Storage Rehydration**: Load persisted state from Tauri storage
4. **Package Manager Initialization**: Configure available package managers
5. **Application Data Loading**: Load predefined application catalog

### Installation Flow
1. **Selection**: User selects applications/tools
2. **Queue Management**: Items added to installation queue
3. **Execution**: Sequential or parallel installation
4. **Progress Tracking**: Real-time progress updates
5. **State Updates**: Store updated with installation results
6. **Persistence**: State changes saved to storage

### Mise Integration Flow
1. **Availability Check**: Verify mise installation
2. **Installation**: Install mise if not present
3. **Tool Discovery**: List available tools from registry
4. **Version Management**: Install/switch tool versions
5. **Environment Sync**: Update local environment state

## Security and Safety Features

### Command Execution Safety
- **Argument Validation**: Sanitize command arguments
- **OS-specific Commands**: Use appropriate package managers per OS
- **Error Handling**: Comprehensive error catching and reporting
- **User Confirmation**: Require confirmation for system-level changes

### Storage Security
- **Local Storage**: All data stored locally using Tauri's secure storage
- **No External APIs**: No external service dependencies for core functionality
- **Offline Capability**: Can function without internet connection

## Development Environment

### Dependencies
**Frontend**:
- Next.js 15.3.4 (React framework)
- Zustand 4.5.6 (state management)
- Immer 10.1.1 (immutable updates)
- Lucide React (icons)
- Next Themes (theme management)

**Backend**:
- Tauri 2.0.0-rc (desktop framework)
- Serde (JSON serialization)
- Platform-specific plugins

### Build Process
1. **Frontend Build**: Next.js builds static export
2. **Rust Compilation**: Tauri compiles Rust backend
3. **Binary Packaging**: Creates platform-specific installers
4. **Asset Bundling**: Includes icons and external binaries

## Extension Points

### Adding New Package Managers
1. Extend package manager logic in `pm-logic.ts`
2. Add OS-specific commands
3. Update package manager slice
4. Add UI components for configuration

### Adding New Tools/Applications
1. Update application data in shared UI package
2. Extend application slice if needed
3. Add installation logic for new tool types

### Custom Profiles
1. Extend profile management in profiles slice
2. Add profile-specific application sets
3. Implement profile import/export functionality

## Key File References

### State Management
- `src/lib/store/genie-store.ts` - Main store factory
- `src/lib/store/genie-store-type.ts` - Combined store types
- `src/lib/store/_slices/` - Individual domain slices

### API Integration
- `src/lib/mise-api.ts` - mise tool integration
- `src/lib/logic.ts` - Command execution utilities
- `src/lib/pm-logic.ts` - Package manager logic

### UI Components
- `src/app/layout.tsx` - Root layout with providers
- `src/components/app-shell.tsx` - Main application shell
- `src/components/environment/` - Environment management UI

### Configuration
- `src-tauri/tauri.conf.json` - Tauri application configuration
- `next.config.mjs` - Next.js static export configuration
- `package.json` - Dependencies and scripts