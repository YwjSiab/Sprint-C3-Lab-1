// Module for handling application state
const AppState = {
  isOnline: true,
  data: [],
  lastUpdate: null
};

// Arrow function for state management
const updateAppState = (newState) => {
  Object.assign(AppState, newState);
  console.log('App state updated:', AppState);
};

// Service Worker Registration
const registerServiceWorker = async () => {
  try {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.register('service-worker.js');
      console.log('Service Worker registered:', registration);
    }
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
};

// Call registration on load
window.addEventListener('load', () => {
  updateAppState({ lastUpdate: new Date().toISOString() });
  registerServiceWorker();
});
