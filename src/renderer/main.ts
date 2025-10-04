import './style.css';
import { Game } from './game.js';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the game
  const game = new Game();
  game.init();

  // Set up UI event listeners
  setupUIEventListeners(game);
});

function setupUIEventListeners(game: Game): void {
  const newGameBtn = document.getElementById('new-game-btn');
  const loadGameBtn = document.getElementById('load-game-btn');
  const settingsBtn = document.getElementById('settings-btn');
  const quitBtn = document.getElementById('quit-btn');
  const debugInfo = document.getElementById('debug-info');

  // New Game button
  newGameBtn?.addEventListener('click', () => {
    game.startNewGame();
    hideMainMenu();
    showDebugInfo();
  });

  // Load Game button
  loadGameBtn?.addEventListener('click', () => {
    // TODO: Implement load game functionality
    console.log('Load game clicked');
  });

  // Settings button
  settingsBtn?.addEventListener('click', () => {
    // TODO: Implement settings menu
    console.log('Settings clicked');
  });

  // Quit button
  quitBtn?.addEventListener('click', () => {
    // In Electron, we can use the exposed API to quit the app
    if (window.electronAPI) {
      window.electronAPI.removeAllListeners('menu-new-game');
      window.electronAPI.removeAllListeners('menu-open-game');
    }
    window.close();
  });

  // Set up menu event listeners from main process
  if (window.electronAPI) {
    window.electronAPI.onNewGame(() => {
      game.startNewGame();
      hideMainMenu();
      showDebugInfo();
    });

    window.electronAPI.onOpenGame(() => {
      // TODO: Implement load game functionality
      console.log('Open game from menu');
    });
  }

  function hideMainMenu(): void {
    const mainMenu = document.getElementById('main-menu');
    if (mainMenu) {
      mainMenu.classList.add('hidden');
    }
  }

  function showDebugInfo(): void {
    if (debugInfo) {
      debugInfo.classList.remove('hidden');
    }
  }
}