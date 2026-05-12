// Wangechi.js - Main JavaScript for app functionality

// Register Service Worker for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('✓ Service Worker registered successfully:', registration);
        
        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute
      })
      .catch(error => {
        console.log('✗ Service Worker registration failed:', error);
      });
  });
}

// Navigation between sections
function showContent(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.prayer-section');
  sections.forEach(section => {
    section.classList.remove('active');
  });

  // Show selected section
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.classList.add('active');
  }

  // Update menu items active state
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.classList.remove('active');
  });

  // Find and activate the clicked menu item
  const activeItem = document.querySelector(`[onclick="showContent('${sectionId}')"]`);
  if (activeItem) {
    activeItem.classList.add('active');
  }

  // Scroll to top
  document.querySelector('.main-content').scrollTop = 0;
}

// Toggle main accordion
function toggleAccordion(element) {
  const panel = element.nextElementSibling;
  
  // Close other open accordions
  const allPanels = document.querySelectorAll('.accordion-panel');
  allPanels.forEach(p => {
    if (p !== panel && p.style.maxHeight) {
      p.style.maxHeight = null;
      p.previousElementSibling.style.backgroundColor = '';
    }
  });

  // Toggle current accordion
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
    element.style.backgroundColor = '';
  } else {
    panel.style.maxHeight = panel.scrollHeight + 'px';
    element.style.backgroundColor = '#e3f2fd';
  }
}

// Toggle sub-accordion
function toggleSubAccordion(element) {
  const panel = element.nextElementSibling;

  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Show welcome section by default
  showContent('welcome');
  
  console.log('✓ Wangechi app loaded successfully');
});

// Handle app updates
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('✓ App updated! Refresh to see latest version.');
  });
}
