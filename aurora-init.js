import Aurora from './Aurora.js';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const auroraContainer = document.getElementById('aurora-background');

  if (auroraContainer) {
    // Initialize Aurora with your custom colors
    // Using your site's gold and blue theme
    const aurora = new Aurora(auroraContainer, {
      colorStops: ['#f4c430', '#4a9eff', '#d4af37'], // Gold -> Blue -> Dark Gold
      amplitude: 1.2,      // Slightly more pronounced waves
      blend: 0.6,          // Smooth blending
      speed: 0.55          // Slower, more elegant movement
    });

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      aurora.destroy();
    });
  }
});
