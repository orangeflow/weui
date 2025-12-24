// Theme Management (Same as success.js)
class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    this.init();
  }

  getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  getStoredTheme() {
    return localStorage.getItem('theme');
  }

  setStoredTheme(theme) {
    localStorage.setItem('theme', theme);
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.setupListeners();
    this.setupSystemThemeListener();
    this.setupKeyboardListener();
  }

  applyTheme(theme) {
    const appContainer = document.getElementById('appContainer');
    if (theme === 'dark') {
      appContainer.setAttribute('data-theme', 'dark');
    } else {
      appContainer.removeAttribute('data-theme');
    }
    this.currentTheme = theme;
    this.setStoredTheme(theme);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
  }

  setupListeners() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  }

  setupKeyboardListener() {
    document.addEventListener('keydown', (e) => {
      // Listen for Tab key to toggle theme
      if (e.key === 'Tab' || e.keyCode === 9) {
        // Only toggle if not focused on an interactive element
        const activeElement = document.activeElement;
        const isInteractiveElement = activeElement && (
          activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.tagName === 'BUTTON' ||
          activeElement.tagName === 'A' ||
          activeElement.isContentEditable
        );

        // If not in an interactive element, toggle theme and prevent default Tab behavior
        if (!isInteractiveElement) {
          e.preventDefault();
          this.toggleTheme();
          console.log('Theme toggled via Tab key. Current theme:', this.currentTheme);
        }
      }
    });
  }

  setupSystemThemeListener() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }
}

// Tab Management
class TabManager {
  constructor() {
    this.currentTab = 'hot';
    this.init();
  }

  init() {
    this.setupTabListeners();
    this.switchTab(this.currentTab);
  }

  setupTabListeners() {
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tab = button.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });
  }

  switchTab(tab) {
    this.currentTab = tab;
    
    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === tab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update content based on tab
    this.updateContent(tab);
  }

  updateContent(tab) {
    // For now, show the same content for both tabs
    // You can customize this to show different red packets
    const grid = document.getElementById('redpacketGrid');
    if (grid) {
      // In a real implementation, you would filter or load different content
      console.log('Switched to tab:', tab);
    }
  }
}

// Red Packet Selection
class RedPacketManager {
  constructor() {
    this.selectedId = null;
    this.init();
  }

  init() {
    this.setupCardListeners();
    this.updateUseButton();
  }

  setupCardListeners() {
    const cards = document.querySelectorAll('.redpacket-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        this.selectCard(id);
      });
    });
  }

  selectCard(id) {
    // Remove previous selection
    if (this.selectedId) {
      const prevCard = document.querySelector(`.redpacket-card[data-id="${this.selectedId}"]`);
      if (prevCard) {
        prevCard.classList.remove('selected');
      }
    }

    // Add new selection
    this.selectedId = id;
    const card = document.querySelector(`.redpacket-card[data-id="${id}"]`);
    if (card) {
      card.classList.add('selected');
    }

    this.updateUseButton();
    console.log('Selected red packet:', id);
  }

  updateUseButton() {
    const useButton = document.getElementById('useButton');
    if (useButton) {
      if (this.selectedId) {
        useButton.disabled = false;
      } else {
        useButton.disabled = true;
      }
    }
  }
}

// Button Handlers
function setupButtonHandlers() {
  // Back Button
  const backButton = document.getElementById('backButton');
  if (backButton) {
    backButton.addEventListener('click', () => {
      console.log('Back button clicked');
      if (window.history.length > 1) {
        window.history.back();
      } else {
        console.log('No history to go back');
      }
    });
  }

  // Use Button
  const useButton = document.getElementById('useButton');
  if (useButton) {
    useButton.addEventListener('click', () => {
      const redPacketManager = window.redPacketManager;
      if (redPacketManager && redPacketManager.selectedId) {
        console.log('Use button clicked. Selected red packet:', redPacketManager.selectedId);
        // You can add navigation logic here
        // For example: navigate to next page or show confirmation
        alert(`已选择红包封面 ID: ${redPacketManager.selectedId}`);
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme Manager
  const themeManager = new ThemeManager();
  window.themeManager = themeManager;

  // Initialize Tab Manager
  const tabManager = new TabManager();
  window.tabManager = tabManager;

  // Initialize Red Packet Manager
  const redPacketManager = new RedPacketManager();
  window.redPacketManager = redPacketManager;

  // Setup Button Handlers
  setupButtonHandlers();

  console.log('Red Packet Page initialized');
  console.log('Current theme:', themeManager.currentTheme);
  console.log('Current tab:', tabManager.currentTab);
});

