import { VehicleManager } from '../systems/vehicle-manager.js';
import { Part } from '../types/part.js';
import { PartPlacement } from '../systems/part-placement.js';

/**
 * UI component for browsing and selecting parts from the catalog
 */
export class PartsCatalogUI {
  private vehicleManager: VehicleManager;
  private partPlacement: PartPlacement | null;
  private container: HTMLElement;
  private isVisible: boolean = true;

  // UI Elements
  private categoryTabs: Map<string, HTMLElement> = new Map();
  private partsGrid: HTMLElement | null = null;
  private searchInput: HTMLInputElement | null = null;
  private selectedCategory: string = 'command';

  // Categories
  private categories = [
    { id: 'command', name: 'Command', icon: '🎮' },
    { id: 'propulsion', name: 'Propulsion', icon: '🚀' },
    { id: 'fuel', name: 'Fuel Tanks', icon: '⛽' },
    { id: 'structural', name: 'Structural', icon: '🔧' },
    { id: 'utility', name: 'Utility', icon: '🛠️' },
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'aerodynamic', name: 'Aerodynamic', icon: '✈️' }
  ];

  constructor(vehicleManager: VehicleManager, partPlacement: PartPlacement | null = null) {
    this.vehicleManager = vehicleManager;
    this.partPlacement = partPlacement;

    this.container = document.createElement('div');
    this.container.id = 'parts-catalog-ui';

    this.createUI();

    // Add to document
    document.body.appendChild(this.container);
  }

  /**
   * Set part placement system
   */
  public setPartPlacement(partPlacement: PartPlacement): void {
    this.partPlacement = partPlacement;
  }

  /**
   * Create UI structure
   */
  private createUI(): void {
    // Main container styles
    this.container.style.position = 'absolute';
    this.container.style.right = '10px';
    this.container.style.top = '10px';
    this.container.style.width = '300px';
    this.container.style.maxHeight = '80vh';
    this.container.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    this.container.style.color = 'white';
    this.container.style.borderRadius = '8px';
    this.container.style.padding = '10px';
    this.container.style.fontFamily = 'Arial, sans-serif';
    this.container.style.fontSize = '14px';
    this.container.style.overflowY = 'auto';
    this.container.style.zIndex = '1000';

    // Title
    const title = document.createElement('h2');
    title.textContent = 'Parts Catalog';
    title.style.margin = '0 0 10px 0';
    title.style.fontSize = '18px';
    title.style.borderBottom = '2px solid #444';
    title.style.paddingBottom = '5px';
    this.container.appendChild(title);

    // Search bar
    this.createSearchBar();

    // Category tabs
    this.createCategoryTabs();

    // Parts grid
    this.partsGrid = document.createElement('div');
    this.partsGrid.style.display = 'grid';
    this.partsGrid.style.gridTemplateColumns = '1fr';
    this.partsGrid.style.gap = '8px';
    this.partsGrid.style.marginTop = '10px';
    this.container.appendChild(this.partsGrid);

    // Load initial category
    this.loadCategory(this.selectedCategory);
  }

  /**
   * Create search bar
   */
  private createSearchBar(): void {
    const searchContainer = document.createElement('div');
    searchContainer.style.marginBottom = '10px';

    this.searchInput = document.createElement('input');
    this.searchInput.type = 'text';
    this.searchInput.placeholder = 'Search parts...';
    this.searchInput.style.width = '100%';
    this.searchInput.style.padding = '8px';
    this.searchInput.style.backgroundColor = '#222';
    this.searchInput.style.color = 'white';
    this.searchInput.style.border = '1px solid #444';
    this.searchInput.style.borderRadius = '4px';
    this.searchInput.style.fontSize = '14px';

    this.searchInput.addEventListener('input', () => {
      this.filterParts();
    });

    searchContainer.appendChild(this.searchInput);
    this.container.appendChild(searchContainer);
  }

  /**
   * Create category tabs
   */
  private createCategoryTabs(): void {
    const tabsContainer = document.createElement('div');
    tabsContainer.style.display = 'flex';
    tabsContainer.style.flexWrap = 'wrap';
    tabsContainer.style.gap = '5px';
    tabsContainer.style.marginBottom = '10px';

    for (const category of this.categories) {
      const tab = document.createElement('button');
      tab.textContent = `${category.icon} ${category.name}`;
      tab.style.padding = '6px 10px';
      tab.style.backgroundColor = category.id === this.selectedCategory ? '#0066cc' : '#333';
      tab.style.color = 'white';
      tab.style.border = 'none';
      tab.style.borderRadius = '4px';
      tab.style.cursor = 'pointer';
      tab.style.fontSize = '12px';
      tab.style.transition = 'background-color 0.2s';

      tab.addEventListener('mouseenter', () => {
        if (category.id !== this.selectedCategory) {
          tab.style.backgroundColor = '#444';
        }
      });

      tab.addEventListener('mouseleave', () => {
        if (category.id !== this.selectedCategory) {
          tab.style.backgroundColor = '#333';
        }
      });

      tab.addEventListener('click', () => {
        this.selectCategory(category.id);
      });

      tabsContainer.appendChild(tab);
      this.categoryTabs.set(category.id, tab);
    }

    this.container.appendChild(tabsContainer);
  }

  /**
   * Select a category
   */
  private selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;

    // Update tab styles
    for (const [id, tab] of this.categoryTabs.entries()) {
      if (tab instanceof HTMLButtonElement) {
        tab.style.backgroundColor = id === categoryId ? '#0066cc' : '#333';
      }
    }

    // Load category parts
    this.loadCategory(categoryId);
  }

  /**
   * Load parts for a category
   */
  private loadCategory(categoryId: string): void {
    if (!this.partsGrid) return;

    // Clear existing parts
    this.partsGrid.innerHTML = '';

    // Get parts for this category
    const parts = this.vehicleManager.getPartsByCategory(categoryId);

    if (parts.length === 0) {
      const noParts = document.createElement('div');
      noParts.textContent = 'No parts in this category';
      noParts.style.color = '#888';
      noParts.style.textAlign = 'center';
      noParts.style.padding = '20px';
      this.partsGrid.appendChild(noParts);
      return;
    }

    // Create part cards
    for (const part of parts) {
      this.createPartCard(part);
    }
  }

  /**
   * Filter parts based on search
   */
  private filterParts(): void {
    if (!this.partsGrid || !this.searchInput) return;

    const searchTerm = this.searchInput.value.toLowerCase();

    // If empty, just load category
    if (searchTerm === '') {
      this.loadCategory(this.selectedCategory);
      return;
    }

    // Clear grid
    this.partsGrid.innerHTML = '';

    // Search all parts
    const allParts = this.vehicleManager.getAllPartTemplates();
    const filteredParts = allParts.filter(part =>
      part.name.toLowerCase().includes(searchTerm) ||
      part.description.toLowerCase().includes(searchTerm) ||
      part.manufacturer.toLowerCase().includes(searchTerm)
    );

    if (filteredParts.length === 0) {
      const noParts = document.createElement('div');
      noParts.textContent = 'No parts found';
      noParts.style.color = '#888';
      noParts.style.textAlign = 'center';
      noParts.style.padding = '20px';
      this.partsGrid.appendChild(noParts);
      return;
    }

    // Create part cards
    for (const part of filteredParts) {
      this.createPartCard(part);
    }
  }

  /**
   * Create a part card
   */
  private createPartCard(part: Part): void {
    if (!this.partsGrid) return;

    const card = document.createElement('div');
    card.style.backgroundColor = '#1a1a1a';
    card.style.border = '1px solid #333';
    card.style.borderRadius = '6px';
    card.style.padding = '10px';
    card.style.cursor = 'pointer';
    card.style.transition = 'all 0.2s';

    // Hover effect
    card.addEventListener('mouseenter', () => {
      card.style.backgroundColor = '#2a2a2a';
      card.style.borderColor = '#0066cc';
    });

    card.addEventListener('mouseleave', () => {
      card.style.backgroundColor = '#1a1a1a';
      card.style.borderColor = '#333';
    });

    // Click to select
    card.addEventListener('click', () => {
      this.selectPart(part);
    });

    // Part name
    const name = document.createElement('div');
    name.textContent = part.name;
    name.style.fontWeight = 'bold';
    name.style.marginBottom = '5px';
    name.style.fontSize = '14px';
    card.appendChild(name);

    // Part manufacturer
    const manufacturer = document.createElement('div');
    manufacturer.textContent = part.manufacturer;
    manufacturer.style.fontSize = '11px';
    manufacturer.style.color = '#888';
    manufacturer.style.marginBottom = '5px';
    card.appendChild(manufacturer);

    // Part description
    const description = document.createElement('div');
    description.textContent = part.description;
    description.style.fontSize = '12px';
    description.style.color = '#ccc';
    description.style.marginBottom = '8px';
    card.appendChild(description);

    // Part stats
    const stats = document.createElement('div');
    stats.style.fontSize = '11px';
    stats.style.color = '#aaa';
    stats.style.borderTop = '1px solid #333';
    stats.style.paddingTop = '5px';

    const statsText: string[] = [];
    statsText.push(`Mass: ${part.mass} kg`);
    statsText.push(`Cost: $${part.cost}`);

    // Category-specific stats
    if (part.category === 'propulsion') {
      const engineModule = part.modules.find(m => m.type === 'engine');
      if (engineModule && engineModule.thrust) {
        statsText.push(`Thrust: ${(engineModule.thrust / 1000).toFixed(1)} kN`);
      }
      if (engineModule && engineModule.specificImpulse) {
        statsText.push(`Isp: ${engineModule.specificImpulse}s`);
      }
    } else if (part.category === 'fuel' && part.resources) {
      const totalCapacity = part.resources.reduce((sum, r) => sum + r.maxAmount, 0);
      statsText.push(`Capacity: ${totalCapacity} units`);
    }

    stats.textContent = statsText.join(' | ');
    card.appendChild(stats);

    this.partsGrid.appendChild(card);
  }

  /**
   * Select a part for placement
   */
  private selectPart(part: Part): void {
    console.log(`Selected part: ${part.name}`);

    if (this.partPlacement) {
      this.partPlacement.selectPartTemplate(part.id);
    }

    // Visual feedback
    this.highlightSelectedPart(part.id);
  }

  /**
   * Highlight selected part in catalog
   */
  private highlightSelectedPart(partId: string): void {
    if (!this.partsGrid) return;

    // Remove previous highlights
    const cards = this.partsGrid.children;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      card.style.boxShadow = 'none';
    }

    // Add highlight to selected (simplified - would need to track which card matches)
    // For now, just give visual feedback
    const firstCard = cards[0] as HTMLElement;
    if (firstCard) {
      firstCard.style.boxShadow = '0 0 10px rgba(0, 102, 204, 0.5)';
    }
  }

  /**
   * Toggle visibility
   */
  public toggleVisibility(): void {
    this.isVisible = !this.isVisible;
    this.container.style.display = this.isVisible ? 'block' : 'none';
  }

  /**
   * Show catalog
   */
  public show(): void {
    this.isVisible = true;
    this.container.style.display = 'block';
  }

  /**
   * Hide catalog
   */
  public hide(): void {
    this.isVisible = false;
    this.container.style.display = 'none';
  }

  /**
   * Update (called each frame)
   */
  public update(): void {
    // Nothing to update per frame for now
  }

  /**
   * Dispose of resources
   */
  public dispose(): void {
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
