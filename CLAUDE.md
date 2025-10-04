# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Application
- `npm run dev` - Start both the Vite renderer dev server (port 3000) and Electron main process concurrently
- `npm run dev:renderer` - Start only the Vite dev server for the renderer process
- `npm run dev:main` - Compile main process TypeScript and start Electron

### Building
- `npm run build` - Build both renderer and main process
- `npm run build:renderer` - Build only the renderer process using Vite
- `npm run build:main` - Compile only the main process TypeScript
- `npm run build:all` - Build everything and create distributable with electron-builder

### Code Quality
- `npm run lint` - Run ESLint on the src directory
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier

## Architecture Overview

This is a Kerbal Space Program-like space simulation game built with Electron, TypeScript, and Three.js.

### Process Architecture

**Electron Main Process** (`src/main/`)
- `main.ts` - Main entry point, creates BrowserWindow, handles app lifecycle
- `preload.ts` - Preload script for secure IPC communication with contextIsolation enabled
- IPC handlers for app metadata (version, name, paths)

**Renderer Process** (`src/renderer/`)
- Vite-based renderer with Three.js for 3D graphics
- Uses ES modules with `.js` extensions in imports (TypeScript outputs .js)

### Core Systems Architecture

The game uses a **systems-based architecture** where independent managers handle specific responsibilities:

**Game Loop** (`game.ts`)
- Central coordinator that initializes and updates all systems
- Manages the main game loop with `requestAnimationFrame`
- Handles deltaTime calculations and visibility changes

**GraphicsEngine** (`systems/graphics-engine.ts`)
- Wraps Three.js renderer, scene, and camera
- Manages lighting setup and debug UI for performance stats
- Provides access to Three.js core objects for other systems

**SceneManager** (`systems/scene-manager.ts`)
- Manages different game states: `main-menu`, `main-game`, `settings`, `loading`
- Each scene implements init/update/destroy lifecycle methods
- `MainGameScene` orchestrates the core simulation systems

**TimeManager** (`systems/time-manager.ts`)
- Handles time acceleration/deceleration for space simulation
- Manages distance scaling to handle vast space distances
- Provides time change callbacks for dependent systems

**CelestialBodiesManager** (`systems/celestial-bodies-manager.ts`)
- Loads celestial body data from JSON files (`/src/data/solar-system.json`)
- Manages procedural generation of planets, moons, stars, asteroids
- Updates positions based on orbital mechanics and time
- Handles LOD (Level of Detail) system for distant bodies
- Creates and manages orbit visualization lines

**OrbitalMechanics** (`systems/orbital-mechanics.ts`)
- Calculates orbital positions and velocities from Keplerian elements
- Computes orbit paths for visualization

**CameraController** (`systems/camera-controller.ts`)
- Handles 3D camera navigation in space
- Integrates with InputManager for user controls

**InputManager** (`systems/input-manager.ts`)
- Centralizes keyboard and mouse input handling
- Provides input state to other systems

### Generators

**CelestialBodyGenerator** (`generators/celestial-body-generator.ts`)
- Procedurally generates 3D meshes and textures for celestial bodies
- Creates spheres with varying detail levels for LOD
- Generates atmospheric effects and skyboxes
- Reduces asset file size by generating content at runtime

### Module Resolution

Path aliases are configured in both `tsconfig.json` and `vite.config.ts`:
- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/systems/*` → `src/systems/*`
- `@/assets/*` → `src/assets/*`
- `@/generators/*` → `src/generators/*`
- `@/data/*` → `src/data/*`
- `@/utils/*` → `src/utils/*`

### Important Implementation Details

1. **Import Extensions**: All TypeScript imports use `.js` extensions because the code is compiled to ES modules
2. **Renderer Root**: Vite uses `src/renderer` as root directory
3. **Build Output**:
   - Renderer → `dist/renderer/`
   - Main process → `dist/` (outputs `main.js` and `preload.js`)
4. **Development Mode**: Determined by `NODE_ENV === 'development'`, affects whether Electron loads from localhost:3000 or dist files
5. **Security**: Electron uses `contextIsolation: true` and `nodeIntegration: false`

### Data Flow

1. User starts game → `Game.startNewGame()` → `SceneManager.loadScene('main-game')`
2. `MainGameScene` initializes all subsystems (TimeManager, CelestialBodiesManager, CameraController, etc.)
3. `CelestialBodiesManager` loads JSON data from `/src/data/solar-system.json`
4. Generator creates procedural 3D meshes and adds them to the Three.js scene
5. Game loop continuously calls `update()` on all active systems with deltaTime
6. TimeManager broadcasts time changes → CelestialBodiesManager updates positions via OrbitalMechanics
7. GraphicsEngine renders the scene each frame

### Current Development Phase

Phase 1 (Foundation) is complete. The project is transitioning to implementing the celestial bodies system with orbital mechanics, procedural generation, and time management.
