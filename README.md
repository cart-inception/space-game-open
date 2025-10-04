# Space Simulation Game

A Kerbal Space Program-like game built with TypeScript and Electron.

## Project Structure

```
/src
  /main (Electron main process)
    main.ts - Main entry point for the Electron application
    preload.ts - Preload script for secure IPC communication
  /renderer (Renderer process)
    index.html - Main HTML file
    main.ts - Renderer entry point
    game.ts - Main game class
    style.css - Global styles
    types.d.ts - TypeScript type definitions
    /systems
      graphics-engine.ts - Three.js graphics engine wrapper
      scene-manager.ts - Scene management system
      input-manager.ts - Input handling system
      camera-controller.ts - 3D camera controller
  /components (UI components)
  /systems (Game logic systems)
  /assets (3D models, textures)
  /generators (Procedural asset generation code)
  /data (Celestial body data, part configurations)
  /utils (Helper functions)
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

This will start both the Vite development server and the Electron main process.

### Building

To build the application for production:

```bash
npm run build
```

To build the distributable application:

```bash
npm run build:all
```

## Scripts

- `npm run dev` - Start development servers
- `npm run dev:renderer` - Start only the renderer development server
- `npm run dev:main` - Start only the main process
- `npm run build` - Build the application
- `npm run build:renderer` - Build only the renderer
- `npm run build:main` - Build only the main process
- `npm run build:all` - Build and create distributable
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier

## Technologies Used

- **Electron** - Desktop application framework
- **TypeScript** - Type-safe JavaScript
- **Three.js** - 3D graphics library
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Game Features

### Phase 1: Project Setup and Foundation (In Progress)

- [x] Initialize Project Structure
- [x] Set up directory structure
- [x] Configure TypeScript with strict settings
- [x] Set up Vite for bundling
- [x] Configure ESLint and Prettier for code consistency
- [x] Set up basic Electron main process and renderer process
- [x] Choose and Integrate Graphics Engine (Three.js)
- [x] Initialize Three.js in the Electron renderer
- [x] Set up basic scene, camera, and lighting
- [x] Implement basic render loop
- [x] Create simple debug UI to display FPS and performance metrics
- [x] Create scene manager to handle different game states
- [x] Implement state management system for the application
- [x] Set up basic input handling for keyboard and mouse
- [x] Create basic camera controller for navigating 3D space

### Future Phases

- Celestial Bodies System
- Physics System
- Vehicle System
- Flight Control and Navigation
- UI and Game Systems
- Advanced Features
- Steam Integration and Distribution
- Testing and Quality Assurance
- Final Polish and Release

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push to the branch
6. Create a Pull Request

## License

This project is licensed under the MIT License.