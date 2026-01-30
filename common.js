/* Common JavaScript for REmake Speedrun Guide */

// ============================================
// BLOOD DRIP ANIMATION
// ============================================
(function initBloodDrips() {
  const bloodDripsContainer = document.getElementById('bloodDrips');
  if (!bloodDripsContainer) return;

  for (let i = 0; i < 5; i++) {
    const drip = document.createElement('div');
    drip.className = 'blood-drip';
    drip.style.left = Math.random() * 100 + '%';
    drip.style.animationDelay = Math.random() * 3 + 's';
    drip.style.animationDuration = (Math.random() * 2 + 2) + 's';
    bloodDripsContainer.appendChild(drip);
  }
})();

// ============================================
// HEADER SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (!header) return;

  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });
})();

// ============================================
// BACKGROUND MUSIC SYSTEM
// ============================================
let backgroundMusic = null;
let musicControlPanel = null;
const musicFiles = ['01 R.E. 1 Save Room- Safe Haven.mp3'];

function initBackgroundMusic() {
  const musicAllowed = localStorage.getItem('musicAllowed') === 'true';
  const musicInteracted = localStorage.getItem('musicInteracted') === 'true';

  if (musicAllowed || musicInteracted) {
    showMusicControlButton();
  } else {
    document.addEventListener('click', () => {
      document.getElementById('musicControlButton')?.remove();
      showMusicControlButton();
    }, { once: true });
  }
}

function showMusicControlButton() {
  const musicButton = document.createElement('div');
  musicButton.id = 'musicControlButton';
  musicButton.innerHTML = '🎵 Music';
  musicButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(139, 0, 0, 0.8);
    color: var(--re-white);
    padding: 12px 18px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(139, 0, 0, 0.3);
    border: 2px solid rgba(139, 0, 0, 0.3);
  `;

  musicButton.addEventListener('mouseenter', () => {
    musicButton.style.background = 'var(--re-blood)';
    musicButton.style.transform = 'scale(1.05)';
    musicButton.style.boxShadow = '0 6px 20px rgba(139, 0, 0, 0.5)';
  });

  musicButton.addEventListener('mouseleave', () => {
    musicButton.style.background = 'rgba(139, 0, 0, 0.8)';
    musicButton.style.transform = 'scale(1)';
    musicButton.style.boxShadow = '0 4px 15px rgba(139, 0, 0, 0.3)';
  });

  musicButton.addEventListener('click', () => {
    localStorage.setItem('musicAllowed', 'true');
    localStorage.setItem('musicInteracted', 'true');
    createMusicControl();
    musicButton.remove();
  });

  document.body.appendChild(musicButton);
}

function startBackgroundMusic() {
  if (backgroundMusic) return;

  backgroundMusic = new Audio();
  backgroundMusic.src = musicFiles[0];
  backgroundMusic.loop = true;

  // Restore saved state from session storage (persists across page navigation)
  const savedTime = parseFloat(sessionStorage.getItem('musicTime')) || 0;
  const savedVolume = parseFloat(sessionStorage.getItem('musicVolume'));
  const wasPlaying = sessionStorage.getItem('musicPlaying') !== 'false';

  backgroundMusic.volume = !isNaN(savedVolume) ? savedVolume : 0.3;

  // Also check localStorage for volume preference
  const storedVolume = localStorage.getItem('musicVolume');
  if (storedVolume && !savedVolume) {
    backgroundMusic.volume = parseInt(storedVolume) / 100;
  }

  // Set time position once audio is loaded
  backgroundMusic.addEventListener('loadedmetadata', () => {
    if (savedTime > 0 && savedTime < backgroundMusic.duration) {
      backgroundMusic.currentTime = savedTime;
    }
  }, { once: true });

  // Handle autoplay restrictions
  if (wasPlaying) {
    backgroundMusic.play().then(() => {
      updateMusicUI(true);
    }).catch(() => {
      updateMusicUI(false);
    });
  }

  // Handle errors
  backgroundMusic.addEventListener('ended', () => {
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
  });

  backgroundMusic.addEventListener('error', () => {
    const status = document.getElementById('musicStatus');
    if (status) {
      status.textContent = 'Music file not found';
      status.style.color = 'var(--re-blood)';
    }
  });
}

function updateMusicUI(isPlaying) {
  const toggleIcon = document.getElementById('musicToggleIcon');
  const toggleText = document.getElementById('musicToggleText');
  const status = document.getElementById('musicStatus');

  if (!toggleIcon || !toggleText || !status) return;

  if (isPlaying) {
    toggleIcon.textContent = '⏸️';
    toggleText.textContent = 'Pause';
    status.textContent = 'Playing Resident Evil Theme';
    status.style.color = 'var(--re-green)';
  } else {
    toggleIcon.textContent = '▶️';
    toggleText.textContent = 'Play';
    status.textContent = 'Click play to start music';
    status.style.color = 'var(--re-gray)';
  }
}

function createMusicControl() {
  musicControlPanel = document.createElement('div');
  musicControlPanel.id = 'musicControlPanel';
  musicControlPanel.innerHTML = `
    <div class="music-control-header">
      <span class="music-icon">🎵</span>
      <span class="music-title">Background Music</span>
      <button id="musicCloseBtn" class="music-close-btn">×</button>
    </div>
    <div class="music-control-content">
      <button id="musicToggleBtn" class="music-toggle-btn">
        <span id="musicToggleIcon">▶️</span>
        <span id="musicToggleText">Play</span>
      </button>
      <div class="music-volume-container">
        <span class="music-volume-label">Volume</span>
        <input type="range" id="musicVolumeSlider" min="0" max="100" value="30" class="music-volume-slider">
        <span id="musicVolumeValue">30</span>
      </div>
      <div class="music-status" id="musicStatus">Ready to play</div>
    </div>
  `;

  musicControlPanel.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 250px;
    background: rgba(13, 13, 13, 0.95);
    border: 2px solid var(--re-blood);
    border-radius: 15px;
    box-shadow: 0 8px 30px rgba(139, 0, 0, 0.4);
    backdrop-filter: blur(20px);
    z-index: 1000;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    font-family: 'Barlow', sans-serif;
  `;

  // Inject music control styles if not already present
  if (!document.getElementById('musicControlStyles')) {
    const style = document.createElement('style');
    style.id = 'musicControlStyles';
    style.textContent = `
      .music-control-header {
        background: var(--re-blood);
        color: white;
        padding: 12px 15px;
        border-radius: 13px 13px 0 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 700;
        font-size: 14px;
      }
      .music-icon { font-size: 16px; }
      .music-close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s ease;
      }
      .music-close-btn:hover { background: rgba(255, 255, 255, 0.2); }
      .music-control-content { padding: 15px; }
      .music-toggle-btn {
        width: 100%;
        background: rgba(139, 0, 0, 0.2);
        border: 2px solid var(--re-blood);
        color: white;
        padding: 12px 15px;
        border-radius: 25px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 15px;
        transition: all 0.3s ease;
      }
      .music-toggle-btn:hover {
        background: var(--re-blood);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(139, 0, 0, 0.4);
      }
      .music-volume-container {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
      }
      .music-volume-label {
        color: var(--re-gray);
        font-size: 12px;
        font-weight: 600;
        min-width: 50px;
      }
      .music-volume-slider {
        flex: 1;
        height: 6px;
        background: rgba(139, 0, 0, 0.3);
        border-radius: 3px;
        outline: none;
        cursor: pointer;
      }
      .music-volume-slider::-webkit-slider-thumb {
        appearance: none;
        width: 18px;
        height: 18px;
        background: var(--re-blood);
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 0 8px rgba(139, 0, 0, 0.6);
      }
      .music-volume-slider::-moz-range-thumb {
        width: 18px;
        height: 18px;
        background: var(--re-blood);
        border-radius: 50%;
        cursor: pointer;
        border: none;
        box-shadow: 0 0 8px rgba(139, 0, 0, 0.6);
      }
      #musicVolumeValue {
        color: var(--re-white);
        font-weight: 600;
        font-size: 12px;
        min-width: 30px;
        text-align: right;
      }
      .music-status {
        color: var(--re-gray);
        font-size: 11px;
        font-weight: 500;
        text-align: center;
        padding: 5px;
        background: rgba(139, 0, 0, 0.1);
        border-radius: 8px;
        margin-top: 10px;
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(musicControlPanel);

  // Show with animation
  setTimeout(() => {
    musicControlPanel.style.opacity = '1';
    musicControlPanel.style.transform = 'translateY(0)';
  }, 100);

  // Setup events
  setupMusicControlEvents();

  // Start music
  startBackgroundMusic();
}

function setupMusicControlEvents() {
  const toggleBtn = document.getElementById('musicToggleBtn');
  const volumeSlider = document.getElementById('musicVolumeSlider');
  const volumeValue = document.getElementById('musicVolumeValue');
  const closeBtn = document.getElementById('musicCloseBtn');

  if (toggleBtn) toggleBtn.addEventListener('click', toggleMusic);
  if (volumeSlider) volumeSlider.addEventListener('input', updateVolume);
  if (closeBtn) closeBtn.addEventListener('click', hideMusicControl);

  // Initialize volume from localStorage
  const storedVolume = localStorage.getItem('musicVolume') || '30';
  if (volumeSlider) volumeSlider.value = storedVolume;
  if (volumeValue) volumeValue.textContent = storedVolume;

  updateVolume();
}

function toggleMusic() {
  const toggleIcon = document.getElementById('musicToggleIcon');
  const toggleText = document.getElementById('musicToggleText');
  const status = document.getElementById('musicStatus');

  if (!backgroundMusic) {
    startBackgroundMusic();
    if (backgroundMusic) {
      backgroundMusic.play().then(() => {
        updateMusicUI(true);
      }).catch(() => {
        updateMusicUI(false);
      });
    }
  } else if (backgroundMusic.paused) {
    backgroundMusic.play();
    updateMusicUI(true);
  } else {
    backgroundMusic.pause();
    if (toggleIcon) toggleIcon.textContent = '▶️';
    if (toggleText) toggleText.textContent = 'Play';
    if (status) {
      status.textContent = 'Music paused';
      status.style.color = 'var(--re-gray)';
    }
  }
}

function updateVolume() {
  const volumeSlider = document.getElementById('musicVolumeSlider');
  const volumeValue = document.getElementById('musicVolumeValue');

  if (!volumeSlider) return;

  const volume = parseInt(volumeSlider.value) / 100;

  if (volumeValue) volumeValue.textContent = volumeSlider.value;

  if (backgroundMusic) {
    backgroundMusic.volume = volume;
  }

  localStorage.setItem('musicVolume', volumeSlider.value);
}

function hideMusicControl() {
  if (musicControlPanel) {
    musicControlPanel.style.opacity = '0';
    musicControlPanel.style.transform = 'translateY(20px)';
    setTimeout(() => {
      if (musicControlPanel && musicControlPanel.parentNode) {
        musicControlPanel.parentNode.removeChild(musicControlPanel);
      }
      musicControlPanel = null;
      showMusicControlButton();
    }, 300);
  }
}

// Save music state before page unload
window.addEventListener('pagehide', () => {
  if (backgroundMusic) {
    sessionStorage.setItem('musicPlaying', !backgroundMusic.paused);
    sessionStorage.setItem('musicTime', backgroundMusic.currentTime);
    sessionStorage.setItem('musicVolume', backgroundMusic.volume);
  }
});

// Initialize music on page load
document.addEventListener('DOMContentLoaded', initBackgroundMusic);

// ============================================
// MOBILE DROPDOWN NAVIGATION
// ============================================
(function initMobileDropdown() {
  const dropdown = document.querySelector('.dropdown');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  if (!dropdown || !dropdownToggle || !dropdownMenu) return;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  dropdownToggle.addEventListener('click', function(e) {
    if (isMobile()) {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle('open');
    }
  });

  document.addEventListener('click', function(e) {
    if (isMobile() && !dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });

  const dropdownLinks = dropdownMenu.querySelectorAll('a');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (isMobile()) {
        dropdown.classList.remove('open');
      }
    });
  });

  let wasMobile = isMobile();
  window.addEventListener('resize', function() {
    const nowMobile = isMobile();
    if (wasMobile !== nowMobile) {
      dropdown.classList.remove('open');
    }
    wasMobile = nowMobile;
  });
})();
