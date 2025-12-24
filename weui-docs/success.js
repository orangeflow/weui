// Theme Management
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

// Button Handlers
function setupButtonHandlers() {
  // Close Button
  const closeButton = document.getElementById('closeButton');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      console.log('Close button clicked');
      // You can add navigation logic here
      // For example: window.history.back() or navigate to another page
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // Fallback: close window or navigate to home
        console.log('No history to go back, closing or navigating...');
      }
    });
  }

  // Got It Button
  const gotItButton = document.getElementById('gotItButton');
  if (gotItButton) {
    gotItButton.addEventListener('click', () => {
      console.log('Got it button clicked');
      // You can add navigation logic here
      // For example: navigate to home or close modal
      if (window.history.length > 1) {
        window.history.back();
      } else {
        console.log('Navigating to home or closing...');
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme Manager
  const themeManager = new ThemeManager();

  // Setup Button Handlers
  setupButtonHandlers();

  console.log('Payment Success Page initialized');
  console.log('Current theme:', themeManager.currentTheme);
});

