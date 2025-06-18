# Comprehensive Guide: Interfacing with mise in Tauri Applications

## Table of Contents
1. [Understanding mise: The Tool Version Manager](#understanding-mise-the-tool-version-manager)
2. [Tauri Integration Architecture](#tauri-integration-architecture)
3. [The MiseAPI Class: Deep Dive](#the-miseapi-class-deep-dive)
4. [Command Execution Flow](#command-execution-flow)
5. [Data Models and Type Safety](#data-models-and-type-safety)
6. [Error Handling and User Feedback](#error-handling-and-user-feedback)
7. [State Management Integration](#state-management-integration)
8. [Advanced Features and Registry Integration](#advanced-features-and-registry-integration)
9. [Performance Optimizations](#performance-optimizations)
10. [Testing and Validation](#testing-and-validation)
11. [Troubleshooting Common Issues](#troubleshooting-common-issues)

---

## Understanding mise: The Tool Version Manager

### What is mise?

mise (pronounced "meez") is a polyglot tool version manager that replaces tools like `nvm`, `pyenv`, `rbenv`, etc. It manages multiple runtime versions and supports:

- **Runtime Management**: Install and switch between versions of Node.js, Python, Ruby, Go, etc.
- **Plugin System**: Extensible through ASDF plugins and custom backends
- **Configuration Files**: `.mise.toml`, `.tool-versions` for project-specific versions
- **Global & Local Versions**: System-wide defaults with project overrides

### How mise Works Internally

```bash
# mise stores tools in versioned directories
~/.local/share/mise/
├── versions/
│   ├── node/
│   │   ├── 18.17.0/
│   │   ├── 20.9.0/
│   │   └── latest -> 20.9.0/
│   ├── python/
│   │   ├── 3.11.0/
│   │   └── 3.12.0/
├── plugins/
├── installs/
└── config.toml
```

### Key mise Commands We Interface With

```bash
# Version and status
mise --version                    # Get mise version
mise ls                          # List installed tools (JSON format)
mise ls-remote <tool>            # List available versions for a tool

# Installation and management
mise install <tool>@<version>    # Install specific version
mise use --global <tool>@<version> # Set global default
mise use <tool>@<version>        # Set local project version
mise uninstall <tool>@<version>  # Remove version

# Plugin management
mise plugins ls                  # List installed plugins
mise plugins install <plugin>   # Install new plugin

# Registry (experimental)
mise registry                    # List all available tools from registries
```

---

## Tauri Integration Architecture

### Sidecar Binary Approach

In our Tauri application, mise runs as a **sidecar binary**—a standalone executable bundled with the app. This approach provides:

- **Consistency**: Same mise version across all platforms
- **Isolation**: No dependency on system-installed mise
- **Security**: Controlled execution environment
- **Reliability**: Predictable behavior regardless of user's system setup

### Tauri Configuration

```json
// src-tauri/tauri.conf.json
{
  "bundle": {
    "externalBin": [
      "binaries/mise"  // Points to platform-specific mise binary
    ]
  }
}
```

### Sidecar Binary Structure

```
src-tauri/
└── binaries/
    ├── mise-x86_64-pc-windows-msvc.exe  // Windows
    ├── mise-x86_64-apple-darwin         // macOS Intel
    ├── mise-aarch64-apple-darwin         // macOS ARM
    └── mise-x86_64-unknown-linux-gnu    // Linux
```

---

## The MiseAPI Class: Deep Dive

### Architecture Overview

The `MiseAPI` class serves as the **single source of truth** for all mise interactions. It's designed with these principles:

1. **Static Methods**: No instantiation required, pure utility class
2. **Command Abstraction**: Hides complex command construction
3. **Error Handling**: Consistent error patterns across all operations
4. **Notification Integration**: User feedback for all operations
5. **Type Safety**: Strong TypeScript typing for all responses

### Core Implementation Structure

```typescript
// src/utils/mise.ts
import { Command } from '@tauri-apps/plugin-shell';
import { toast } from 'sonner';
import type { ToolVersion, CommandResult, MiseListResponse, InstalledTool, RegistryTool } from '../types';
import { useNotificationStore } from '../store';

export class MiseAPI {
  // Core functionality methods
  static async checkMiseInstalled(): Promise<boolean>
  static async listInstalledTools(): Promise<InstalledTool[]>
  static async listAvailableVersions(tool: string): Promise<ToolVersion[]>
  static async installVersion(tool: string, version: string): Promise<CommandResult>
  static async useVersion(tool: string, version: string, global: boolean): Promise<CommandResult>
  static async uninstallVersion(tool: string, version: string): Promise<CommandResult>
  
  // Plugin management
  static async listPlugins(): Promise<string[]>
  static async installPlugin(pluginName: string): Promise<CommandResult>
  
  // Registry integration
  static async listRegistry(): Promise<RegistryTool[]>
  static async installTool(toolName: string): Promise<CommandResult>
}
```

### Command Execution Pattern

Every mise operation follows this consistent pattern:

```typescript
static async someOperation(params: any): Promise<ReturnType> {
  // 1. Logging and user notification
  console.log(`🔄 MiseAPI: Starting operation...`);
  addNotification({ type: 'loading', title: 'Operation', message: 'Starting...' });
  
  try {
    // 2. Command construction
    const command = Command.sidecar('binaries/mise', [
      'command-name', 
      ...args
    ]);
    
    // 3. Command execution
    const result = await command.execute();
    
    // 4. Result validation
    if (result.code === 0) {
      // 5. Data parsing (if needed)
      const data = result.stdout.trim();
      const parsed = JSON.parse(data); // or custom parsing
      
      // 6. Success notification
      addNotification({ type: 'success', title: 'Success', message: 'Operation completed' });
      
      return parsed;
    } else {
      throw new Error(`Command failed with code ${result.code}: ${result.stderr}`);
    }
  } catch (error) {
    // 7. Error handling and notification
    console.error('💥 MiseAPI: Operation failed:', error);
    addNotification({ type: 'error', title: 'Error', message: 'Operation failed' });
    throw error;
  }
}
```

### Specific Method Implementations

#### 1. Health Check: `checkMiseInstalled()`

```typescript
static async checkMiseInstalled(): Promise<boolean> {
  console.log('🔍 MiseAPI: Checking sidecar availability...');
  addNotification({ 
    type: 'loading', 
    title: 'Checking Mise', 
    message: 'Verifying sidecar connection...' 
  });
  
  try {
    // Simple version check to verify mise is accessible
    const command = Command.sidecar('binaries/mise', ['--version']);
    const result = await command.execute();
    
    if (result.code === 0) {
      console.log('✅ MiseAPI: Sidecar is working');
      addNotification({ 
        type: 'success', 
        title: 'Mise Connected', 
        message: 'Sidecar is running successfully', 
        details: `Version: ${result.stdout.trim()}` 
      });
      return true;
    } else {
      console.log('❌ MiseAPI: Sidecar failed - unexpected output');
      return false;
    }
  } catch (error) {
    console.error('💥 MiseAPI: Sidecar check failed:', error);
    return false;
  }
}
```

**Key Points:**
- Tests basic sidecar functionality
- Extracts version information for display
- Provides detailed error feedback
- Used during app initialization

#### 2. Tool Discovery: `listInstalledTools()`

```typescript
static async listInstalledTools(): Promise<InstalledTool[]> {
  console.log('📋 MiseAPI: Listing installed tools...');
  
  try {
    // Use 'ls --json' for structured output
    const command = Command.sidecar('binaries/mise', ['ls', '--json']);
    const result = await command.execute();
    
    if (result.code === 0) {
      if (!result.stdout.trim()) {
        console.log('📋 MiseAPI: No tools installed');
        return [];
      }

      // Parse mise's JSON output format
      const data: MiseListResponse = JSON.parse(result.stdout);
      
      // Transform mise format to our internal format
      const tools: InstalledTool[] = Object.entries(data).map(([name, versions]) => ({
        name,
        versions
      }));
      
      addNotification({ 
        type: 'success', 
        title: 'Tools Loaded', 
        message: `Found ${tools.length} installed tools`,
        details: `Tools: ${tools.map(t => `${t.name} (${t.versions.length} versions)`).join(', ')}`
      });
      
      return tools;
    } else {
      throw new Error(`Command failed with code ${result.code}: ${result.stderr}`);
    }
  } catch (error) {
    console.error('💥 MiseAPI: Error listing tools:', error);
    throw error;
  }
}
```

**mise JSON Output Format:**
```json
{
  "node": [
    {
      "version": "18.17.0",
      "install_path": "/home/user/.local/share/mise/versions/node/18.17.0",
      "source": {
        "type": "mise.toml",
        "path": "/home/user/.config/mise/config.toml"
      },
      "installed": true,
      "active": false
    },
    {
      "version": "20.9.0", 
      "installed": true,
      "active": true
    }
  ],
  "python": [
    // ... similar structure
  ]
}
```

#### 3. Version Management: `installVersion()`

```typescript
static async installVersion(tool: string, version: string): Promise<CommandResult> {
  console.log(`🔽 MiseAPI: Installing ${tool}@${version}...`);
  addNotification({ 
    type: 'loading', 
    title: 'Installing Version', 
    message: `Installing ${tool}@${version}...` 
  });
  
  try {
    // Construct install command
    const command = Command.sidecar('binaries/mise', ['install', `${tool}@${version}`]);
    const result = await command.execute();
    
    console.log(`📦 MiseAPI: Install result for ${tool}@${version}:`, result);
    
    const success = result.code === 0;
    if (success) {
      addNotification({ 
        type: 'success', 
        title: 'Installation Complete', 
        message: `Successfully installed ${tool}@${version}` 
      });
    } else {
      addNotification({ 
        type: 'error', 
        title: 'Installation Failed', 
        message: `Failed to install ${tool}@${version}`, 
        details: `Exit code: ${result.code}\nError: ${result.stderr}` 
      });
    }
    
    // Return standardized result
    return {
      success,
      stdout: result.stdout,
      stderr: result.stderr
    };
  } catch (error) {
    console.error(`💥 MiseAPI: Error installing ${tool}@${version}:`, error);
    throw error;
  }
}
```

#### 4. Registry Integration: `listRegistry()`

```typescript
static async listRegistry(): Promise<RegistryTool[]> {
  console.log('🌐 MiseAPI: Listing registry tools...');
  addNotification({ 
    type: 'loading', 
    title: 'Loading Registry', 
    message: 'Fetching available tools from registry...' 
  });
  
  try {
    // Use experimental registry command
    const command = Command.sidecar('binaries/mise', ['registry']);
    const result = await command.execute();
    
    if (result.code === 0) {
      // Parse text output format: "tool_name    backend:source"
      const tools: RegistryTool[] = result.stdout
        .trim()
        .split('\n')
        .filter(line => line.trim())
        .map(line => {
          const parts = line.trim().split(/\s+/);
          const name = parts[0];
          const backend = parts[1] || 'unknown';
          
          return {
            name,
            backend,
            shortName: name,
            fullName: backend
          };
        });
      
      console.log(`🌐 MiseAPI: Found ${tools.length} registry tools`);
      addNotification({ 
        type: 'success', 
        title: 'Registry Loaded', 
        message: `Found ${tools.length} available tools in registry` 
      });
      
      return tools;
    } else {
      throw new Error(`Command failed with code ${result.code}: ${result.stderr}`);
    }
  } catch (error) {
    console.error('💥 MiseAPI: Error listing registry:', error);
    return []; // Graceful fallback for experimental feature
  }
}
```

**Registry Output Format:**
```
node     core:node
python   core:python  
java     core:java
poetry   asdf:mise-plugins/mise-poetry
ubi      cargo:ubi
kubectl  ubi:kubernetes/kubectl
```

---

## Command Execution Flow

### Tauri Shell Plugin Integration

```typescript
import { Command } from '@tauri-apps/plugin-shell';

// The Command.sidecar() method is provided by Tauri's shell plugin
const command = Command.sidecar('binaries/mise', ['ls', '--json']);
```

### Execution Lifecycle

1. **Command Construction**
   ```typescript
   const command = Command.sidecar('binaries/mise', [
     'install',      // mise subcommand
     'node@20.9.0'   // arguments
   ]);
   ```

2. **Async Execution**
   ```typescript
   const result = await command.execute();
   // result = {
   //   code: 0,           // Exit code
   //   stdout: "...",     // Standard output
   //   stderr: "...",     // Standard error
   //   signal: null       // Signal that terminated process
   // }
   ```

3. **Result Processing**
   ```typescript
   if (result.code === 0) {
     // Success path
     const data = result.stdout.trim();
     if (data) {
       return JSON.parse(data); // For JSON commands
     }
   } else {
     // Error path
     throw new Error(`Command failed: ${result.stderr}`);
   }
   ```

### Security Considerations

- **Sidecar Isolation**: Commands run in controlled environment
- **Argument Sanitization**: TypeScript types prevent injection
- **Error Boundary**: All commands wrapped in try-catch
- **No Shell Execution**: Direct binary execution, no shell interpretation

---

## Data Models and Type Safety

### Core Type Definitions

```typescript
// src/types/index.ts

// Individual tool version information
export interface ToolVersion {
  version: string;                    // "20.9.0"
  requested_version?: string;         // "20" (what user requested)
  install_path?: string;             // Full filesystem path
  source?: {                         // Where version was defined
    type: string;                   // "mise.toml", ".tool-versions"
    path: string;                   // File path
  };
  symlinked_to?: string;            // If version is symlinked
  installed: boolean;               // Actually installed on system
  active: boolean;                  // Currently active version
  isInstalling?: boolean;           // UI state for loading
}

// Tool with all its versions
export interface InstalledTool {
  name: string;                     // "node", "python"
  versions: ToolVersion[];          // Array of installed versions
}

// mise ls --json response format
export interface MiseListResponse {
  [toolName: string]: ToolVersion[];
}

// Registry tool information
export interface RegistryTool {
  name: string;                     // "kubectl" 
  backend: string;                  // "ubi:kubernetes/kubectl"
  shortName?: string;               // Display name
  fullName?: string;                // Full registry identifier
}

// Command execution result
export interface CommandResult {
  success: boolean;                 // Derived from exit code
  stdout: string;                   // Command output
  stderr: string;                   // Error output
}

// Supported backend types
export type BackendType = 
  | 'core'      // Built-in mise tools
  | 'asdf'      // ASDF plugins
  | 'ubi'       // Universal Binary Installer
  | 'cargo'     // Rust crates
  | 'npm'       // Node packages
  | 'pipx'      // Python packages
  | 'spm'       // Swift packages
  | 'aqua'      // Aqua registry
  | 'vfox'      // VFox registry
  | 'go'        // Go packages
  | 'github';   // GitHub releases
```

### Type Safety Benefits

1. **Compile-Time Validation**: TypeScript catches type mismatches
2. **IDE Support**: IntelliSense and autocompletion
3. **Runtime Safety**: Interfaces document expected data structure
4. **Refactoring Safety**: Changes propagate through type system

### Data Transformation Examples

```typescript
// Transform mise JSON to our internal format
const transformMiseResponse = (miseData: MiseListResponse): InstalledTool[] => {
  return Object.entries(miseData).map(([name, versions]) => ({
    name,
    versions: versions.map(version => ({
      ...version,
      isInstalling: false  // Add UI state
    }))
  }));
};

// Extract tool names for registry comparison
const getInstalledToolNames = (tools: InstalledTool[]): string[] => {
  return tools.map(tool => tool.name);
};

// Find active version for a tool
const getActiveVersion = (tool: InstalledTool): ToolVersion | null => {
  return tool.versions.find(v => v.active) || null;
};
```

---

## Error Handling and User Feedback

### Multi-Layer Error Strategy

Our error handling operates on multiple levels:

1. **Command Level**: Catch execution failures
2. **Parse Level**: Handle malformed responses  
3. **Business Logic Level**: Validate data consistency
4. **UI Level**: Present user-friendly messages

### Notification System Integration

```typescript
// src/store/index.ts (Zustand store)
interface NotificationStore {
  notifications: NotificationItem[];
  addNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

// Notification helper function
const addNotification = (notification: {
  type: 'info' | 'success' | 'warning' | 'error' | 'loading';
  title: string;
  message: string;
  details?: string;
}) => {
  useNotificationStore.getState().addNotification(notification);
};
```

### Error Handling Patterns

#### 1. Command Execution Errors

```typescript
try {
  const command = Command.sidecar('binaries/mise', ['install', 'invalid-tool@1.0']);
  const result = await command.execute();
  
  if (result.code !== 0) {
    // mise returned error code
    const errorMessage = result.stderr.trim() || 'Unknown error';
    
    addNotification({
      type: 'error',
      title: 'Installation Failed',
      message: `Could not install invalid-tool@1.0`,
      details: `Exit code: ${result.code}\nError: ${errorMessage}`
    });
    
    return { success: false, stdout: result.stdout, stderr: result.stderr };
  }
} catch (error) {
  // Sidecar execution failed (binary not found, permission issues, etc.)
  console.error('💥 MiseAPI: Command execution failed:', error);
  
  addNotification({
    type: 'error',
    title: 'Command Failed',
    message: 'Could not execute mise command',
    details: error instanceof Error ? error.message : 'Unknown error'
  });
  
  throw error;
}
```

#### 2. JSON Parsing Errors

```typescript
try {
  const result = await command.execute();
  
  if (result.code === 0) {
    if (!result.stdout.trim()) {
      // Empty output is valid (no tools installed)
      return [];
    }
    
    try {
      const data = JSON.parse(result.stdout);
      return data;
    } catch (parseError) {
      // JSON parsing failed - mise output format may have changed
      console.error('💥 MiseAPI: JSON parsing failed:', parseError);
      
      addNotification({
        type: 'error',
        title: 'Data Parse Error',
        message: 'Could not parse mise output',
        details: `Raw output: ${result.stdout}`
      });
      
      throw new Error(`Invalid JSON response: ${parseError.message}`);
    }
  }
} catch (error) {
  // Handle error...
}
```

#### 3. Graceful Degradation

```typescript
static async listRegistry(): Promise<RegistryTool[]> {
  try {
    // Attempt to load registry
    const command = Command.sidecar('binaries/mise', ['registry']);
    const result = await command.execute();
    
    if (result.code === 0) {
      return this.parseRegistryOutput(result.stdout);
    } else {
      throw new Error(`Registry command failed: ${result.stderr}`);
    }
  } catch (error) {
    console.error('💥 MiseAPI: Registry unavailable:', error);
    
    // Don't fail the entire app - registry is experimental
    addNotification({
      type: 'warning',
      title: 'Registry Unavailable',
      message: 'Could not load tool registry (experimental feature)',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
    
    // Return empty array to allow app to continue functioning
    return [];
  }
}
```

### User Feedback Strategy

#### Loading States
```typescript
// Show immediate feedback for long-running operations
addNotification({ type: 'loading', title: 'Installing...', message: 'This may take a few minutes' });

try {
  await longRunningOperation();
  addNotification({ type: 'success', title: 'Complete!', message: 'Installation finished' });
} catch (error) {
  addNotification({ type: 'error', title: 'Failed', message: 'Installation failed' });
}
```

#### Progress Indication
```typescript
// UI components show loading state based on operation tracking
const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

const handleInstall = async (tool: string, version: string) => {
  setLoading(prev => ({ ...prev, [`install-${tool}-${version}`]: true }));
  
  try {
    await MiseAPI.installVersion(tool, version);
  } finally {
    setLoading(prev => ({ ...prev, [`install-${tool}-${version}`]: false }));
  }
};
```

---

## State Management Integration

### Zustand Store Architecture

```typescript
// src/store/index.ts
import { create } from 'zustand';

interface MiseStore {
  // Tool management state
  installedTools: InstalledTool[];
  currentTool: string | null;
  loading: boolean;
  
  // Actions
  setInstalledTools: (tools: InstalledTool[]) => void;
  setCurrentTool: (tool: string) => void;
  setLoading: (loading: boolean) => void;
  refreshTools: () => Promise<void>;
}

export const useMiseStore = create<MiseStore>((set, get) => ({
  installedTools: [],
  currentTool: null,
  loading: false,
  
  setInstalledTools: (tools) => set({ installedTools: tools }),
  setCurrentTool: (tool) => set({ currentTool: tool }),
  setLoading: (loading) => set({ loading }),
  
  refreshTools: async () => {
    set({ loading: true });
    try {
      const tools = await MiseAPI.listInstalledTools();
      set({ installedTools: tools });
    } catch (error) {
      console.error('Failed to refresh tools:', error);
    } finally {
      set({ loading: false });
    }
  }
}));
```

### React Component Integration

```typescript
// Example: ToolManager component
const ToolManager: React.FC = () => {
  const { installedTools, refreshTools } = useMiseStore();
  const [selectedTool, setSelectedTool] = useState<string>('');
  
  useEffect(() => {
    // Load tools on component mount
    refreshTools();
  }, [refreshTools]);
  
  const handleInstallVersion = async (tool: string, version: string) => {
    try {
      await MiseAPI.installVersion(tool, version);
      // Refresh tools to show new installation
      await refreshTools();
    } catch (error) {
      // Error already handled in MiseAPI
      console.error('Installation failed:', error);
    }
  };
  
  // Component render logic...
};
```

### Data Flow Architecture

```
User Action (Install Tool)
    ↓
UI Component (Button Click)
    ↓
MiseAPI.installVersion()
    ↓
Command.sidecar('binaries/mise', ['install', 'node@20'])
    ↓
mise Binary Execution
    ↓
Command Result Processing
    ↓
Notification System (Success/Error)
    ↓
State Store Update (refreshTools)
    ↓
UI Re-render (New Tool Visible)
```

---

## Advanced Features and Registry Integration

### Backend-Aware Tool Management

The registry integration adds sophisticated backend support:

```typescript
// src/components/RegistryBrowser.tsx

const BACKEND_COLORS: Record<string, string> = {
  'core': 'bg-primary/10 text-primary border-primary/20',
  'asdf': 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  'ubi': 'bg-purple-500/10 text-purple-700 border-purple-500/20',
  'cargo': 'bg-orange-500/10 text-orange-700 border-orange-500/20',
  // ... more backends
};

const BACKEND_DESCRIPTIONS: Record<string, string> = {
  'core': 'Built-in mise tools with first-class support',
  'asdf': 'Community plugins from the asdf ecosystem', 
  'ubi': 'Universal Binary Installer for GitHub releases',
  'cargo': 'Rust packages from crates.io',
  // ... more descriptions
};
```

### Smart Tool Installation

```typescript
static async installTool(toolName: string): Promise<CommandResult> {
  console.log(`🔧 MiseAPI: Installing tool ${toolName}...`);
  
  try {
    // For registry tools, we use 'use' command with '@latest'
    // This automatically installs if not present
    const command = Command.sidecar('binaries/mise', [
      'use', 
      '--global', 
      `${toolName}@latest`
    ]);
    
    const result = await command.execute();
    
    const success = result.code === 0;
    if (success) {
      addNotification({ 
        type: 'success', 
        title: 'Tool Installed', 
        message: `Successfully installed ${toolName}` 
      });
    } else {
      addNotification({ 
        type: 'error', 
        title: 'Tool Install Failed', 
        message: `Failed to install ${toolName}`, 
        details: `Exit code: ${result.code}\nError: ${result.stderr}` 
      });
    }
    
    return { success, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    console.error(`💥 MiseAPI: Error installing tool ${toolName}:`, error);
    throw error;
  }
}
```

### Advanced Filtering and Search

```typescript
const filterTools = () => {
  let filtered = [...registryTools];

  // Text search across name and backend
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(tool => 
      tool.name.toLowerCase().includes(query) ||
      tool.backend.toLowerCase().includes(query)
    );
  }

  // Backend-specific filtering
  if (selectedBackend !== 'all') {
    filtered = filtered.filter(tool => 
      tool.backend.toLowerCase().includes(selectedBackend.toLowerCase())
    );
  }

  // Installation status filtering
  if (showInstalled) {
    filtered = filtered.filter(tool => installedTools.includes(tool.name));
  } else {
    filtered = filtered.filter(tool => !installedTools.includes(tool.name));
  }

  setFilteredTools(filtered);
};
```

### Statistics and Analytics

```typescript
const getBackendStats = (): Record<string, number> => {
  const stats: Record<string, number> = {};
  for (const tool of registryTools) {
    const backend = tool.backend.split(':')[0]; // Extract main backend type
    stats[backend] = (stats[backend] || 0) + 1;
  }
  return stats;
};

const getAvailableBackends = (): string[] => {
  const backends = new Set<string>();
  for (const tool of registryTools) {
    backends.add(tool.backend.split(':')[0]);
  }
  return Array.from(backends).sort();
};
```

---

## Performance Optimizations

### Command Caching Strategy

```typescript
// Cache frequently accessed data
class MiseAPICache {
  private static cache = new Map<string, { data: any, timestamp: number }>();
  private static CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  
  static get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (entry && Date.now() - entry.timestamp < this.CACHE_TTL) {
      return entry.data as T;
    }
    return null;
  }
  
  static set<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
  
  static clear(): void {
    this.cache.clear();
  }
}

// Usage in MiseAPI
static async listAvailableVersions(tool: string): Promise<ToolVersion[]> {
  const cacheKey = `versions-${tool}`;
  const cached = MiseAPICache.get<ToolVersion[]>(cacheKey);
  if (cached) {
    return cached;
  }
  
  // Fetch from mise...
  const versions = await this.fetchVersionsFromMise(tool);
  MiseAPICache.set(cacheKey, versions);
  
  return versions;
}
```

### Parallel Operations

```typescript
// Load multiple tool data in parallel
const loadAllToolData = async (): Promise<{
  installed: InstalledTool[],
  registry: RegistryTool[],
  plugins: string[]
}> => {
  try {
    // Execute all commands in parallel
    const [installed, registry, plugins] = await Promise.all([
      MiseAPI.listInstalledTools(),
      MiseAPI.listRegistry(),
      MiseAPI.listPlugins()
    ]);
    
    return { installed, registry, plugins };
  } catch (error) {
    console.error('Failed to load tool data:', error);
    throw error;
  }
};
```

---

## Testing and Validation

### Unit Testing MiseAPI

```typescript
// __tests__/mise-api.test.ts
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Command } from '@tauri-apps/plugin-shell';
import { MiseAPI } from '../src/utils/mise';

// Mock Tauri command
vi.mock('@tauri-apps/plugin-shell', () => ({
  Command: {
    sidecar: vi.fn()
  }
}));

describe('MiseAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('should check mise installation successfully', async () => {
    const mockExecute = vi.fn().mockResolvedValue({
      code: 0,
      stdout: 'mise 2024.1.0',
      stderr: ''
    });
    
    vi.mocked(Command.sidecar).mockReturnValue({ execute: mockExecute });
    
    const result = await MiseAPI.checkMiseInstalled();
    
    expect(result).toBe(true);
    expect(Command.sidecar).toHaveBeenCalledWith('binaries/mise', ['--version']);
  });
  
  it('should handle mise installation failure', async () => {
    const mockExecute = vi.fn().mockResolvedValue({
      code: 1,
      stdout: '',
      stderr: 'command not found'
    });
    
    vi.mocked(Command.sidecar).mockReturnValue({ execute: mockExecute });
    
    const result = await MiseAPI.checkMiseInstalled();
    
    expect(result).toBe(false);
  });
  
  it('should parse installed tools correctly', async () => {
    const mockOutput = JSON.stringify({
      node: [
        {
          version: '20.9.0',
          installed: true,
          active: true
        }
      ],
      python: [
        {
          version: '3.11.0',
          installed: true,
          active: false
        }
      ]
    });
    
    const mockExecute = vi.fn().mockResolvedValue({
      code: 0,
      stdout: mockOutput,
      stderr: ''
    });
    
    vi.mocked(Command.sidecar).mockReturnValue({ execute: mockExecute });
    
    const tools = await MiseAPI.listInstalledTools();
    
    expect(tools).toHaveLength(2);
    expect(tools[0].name).toBe('node');
    expect(tools[0].versions[0].version).toBe('20.9.0');
    expect(tools[0].versions[0].active).toBe(true);
  });
});
```

### Integration Testing

```typescript
// __tests__/integration.test.ts
import { test, expect } from '@playwright/test';

test('mise integration workflow', async ({ page }) => {
  await page.goto('/');
  
  // Wait for mise check to complete
  await expect(page.getByText('Connected to mise')).toBeVisible();
  
  // Navigate to tool manager
  await page.click('text=Tool Manager');
  
  // Install a new version
  await page.click('text=Install');
  await page.fill('input[placeholder*="version"]', '20.10.0');
  await page.click('button:has-text("Install")');
  
  // Verify installation success
  await expect(page.getByText('Successfully installed')).toBeVisible();
  
  // Verify tool appears in installed list
  await page.click('text=Installed Tools');
  await expect(page.getByText('node@20.10.0')).toBeVisible();
});
```

---

## Troubleshooting Common Issues

### 1. Sidecar Binary Issues

**Problem**: Sidecar fails to execute
**Symptoms**: App shows "Mise Sidecar Error"
**Solutions**:

```typescript
// Add more detailed error checking
static async checkMiseInstalled(): Promise<boolean> {
  try {
    const command = Command.sidecar('binaries/mise', ['--version']);
    const result = await command.execute();
    
    if (result.code === 0) {
      return true;
    } else {
      console.error('Mise sidecar failed:', {
        code: result.code,
        stdout: result.stdout,
        stderr: result.stderr
      });
      return false;
    }
  } catch (error) {
    // Check specific error types
    if (error.message.includes('No such file')) {
      console.error('Mise binary not found - check bundle configuration');
    } else if (error.message.includes('Permission denied')) {
      console.error('Mise binary not executable - check file permissions');
    } else {
      console.error('Unknown sidecar error:', error);
    }
    return false;
  }
}
```

### 2. JSON Parsing Failures

**Problem**: mise output format changes
**Symptoms**: "Data Parse Error" notifications
**Solutions**:

```typescript
static async parseWithFallback(stdout: string): Promise<any> {
  try {
    return JSON.parse(stdout);
  } catch (error) {
    console.warn('JSON parsing failed, attempting text parsing:', error);
    
    // Fallback to text parsing for non-JSON commands
    return stdout.split('\n').filter(line => line.trim());
  }
}
```

### 3. Command Timeout Issues

**Problem**: Long-running installations freeze UI
**Solutions**:

```typescript
static async installVersionWithTimeout(
  tool: string, 
  version: string, 
  timeoutMs: number = 300000 // 5 minutes
): Promise<CommandResult> {
  const command = Command.sidecar('binaries/mise', ['install', `${tool}@${version}`]);
  
  // Create timeout promise
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('Installation timeout')), timeoutMs);
  });
  
  try {
    const result = await Promise.race([
      command.execute(),
      timeoutPromise
    ]);
    
    return {
      success: result.code === 0,
      stdout: result.stdout,
      stderr: result.stderr
    };
  } catch (error) {
    if (error.message === 'Installation timeout') {
      addNotification({
        type: 'warning',
        title: 'Installation Taking Long',
        message: `${tool}@${version} is still installing in background`
      });
    }
    throw error;
  }
}
```

---

## Conclusion

This integration between Tauri and mise demonstrates several key architectural patterns:

1. **Sidecar Pattern**: Bundling external tools with desktop applications
2. **Command Abstraction**: Hiding complexity behind clean APIs
3. **Type Safety**: Using TypeScript for robust data handling
4. **Error Resilience**: Graceful handling of external command failures
5. **User Experience**: Providing feedback for all operations
6. **State Management**: Reactive UI updates based on external state changes

The `MiseAPI` class serves as a robust bridge between the GUI and the mise command-line tool, providing type-safe, error-handled access to mise's functionality while maintaining excellent user experience through comprehensive notification and loading state management.

This architecture can be extended to interface with other CLI tools by following the same patterns: sidecar execution, consistent error handling, type-safe data models, and reactive state management. 