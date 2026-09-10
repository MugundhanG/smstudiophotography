/**
 * SM Studio — Interactive & Cinematic Atelier Web Application
 * Mambalam, Chennai, Tamil Nadu
 */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initPortfolioFilters();
  initLightbox();
  initBeforeAfterSlider();
  initQuoteCalculator();
  initAmbientSoundscape();
  initFormHandler();
  initSmoothScroll();
  initHeroParallax();
});

/* ----------------------------------------------------
 * 1. REAL-TIME MAMBALAM ATELIER CLOCK
 * ---------------------------------------------------- */
function initClock() {
  const clockElement = document.getElementById('mambalam-clock');
  if (!clockElement) return;

  function updateTime() {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const istTime = new Date().toLocaleTimeString('en-US', options);
    clockElement.textContent = `${istTime} IST (Mambalam)`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* ----------------------------------------------------
 * 2. DYNAMIC PORTFOLIO CATEGORY FILTERING
 * ---------------------------------------------------- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      // Update Active Button Style
      filterBtns.forEach(b => {
        b.classList.remove('bg-primary', 'text-on-primary');
        b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
      });
      btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
      btn.classList.add('bg-primary', 'text-on-primary');

      // Filter Cards
      portfolioItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'block';
          item.style.animation = 'fadeInBackdrop 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ----------------------------------------------------
 * 3. HIGH-RESOLUTION ARCHIVAL LIGHTBOX MODAL
 * ---------------------------------------------------- */
let currentItemIndex = 0;
const portfolioData = [
  {
    title: "The Sacred Agni — Joyous Garland Exchange",
    category: "Weddings • Chennai",
    location: "Mylapore Kalyana Mandapam, Chennai",
    exif: "Leica SL2 • 50mm Summilux • f/1.4 • 1/250s • ISO 400",
    description: "Unscripted burst of laughter as flowers are exchanged before the sacred fire. Capturing pure, unguarded devotion and family celebration.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzFjnZsiRfNKxgGLtpTYOJ5OmsNemUCrpWqcx_pGyS9FZz4fUelqvF6UdkSZ-YDdrUyuqKpEJtxF-C-8ypHnZQZ2olCr-1A0h-WNA8dF7351dxRvGRhzDm_Avj2g4CisfbvJAVfFm8e2do_99KhsVXvHOc9xOe4Tv9e43eE_Pbfu9onXsNazcWxrP5AJ-pOXKZzrjsb1ctmh3GtNKg1aee8w0DqdsCitc3TZbX8_HwbeejSXaB3iVV"
  },
  {
    title: "Dust & Silk — Mahabalipuram Shore",
    category: "Heritage • Shore",
    location: "Shore Temple Courtyard, Mahabalipuram",
    exif: "Hasselblad X2D 100C • 38mm f/2.5 • 1/500s • ISO 100",
    description: "Ancient stone arches frame a floating organza veil catching the Bay of Bengal twilight sea breeze.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHOrFPSZ-8XeAfGJKZ7kJd3nTHHYuIwoQhz-kA6AFzWuwlZIXyCykRMlyN138jX-LfG0xkQOf1LD2DczYLY4DZoGsGlx2kvosa38LVRrax44cFTWExEAfdYMQ3YpteYBVI4vD35uXS8DhxvXEJrYI7red5JrR-kQoFSuyTH0FgeNHGHP6T-as98Kk_dH3yhpQ5FBVDasp_MZOqqHRUrQjykVnKdCrLLFVHtU21VVA6x1E8jxkXs6dv"
  },
  {
    title: "The Kanjeevaram Heirloom — Bridal Study",
    category: "Portraits • Editorial",
    location: "SM Atelier Darkroom Suite, Mambalam",
    exif: "Sony A7R V • 85mm G-Master • f/1.8 • 1/160s • Natural Window Reflected Light",
    description: "Intricate antique temple gold jewelry, matha patti, and fresh Madurai jasmine strands documented with painterly chiaroscuro nuance.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCq0gJzXNUk1JTNDzbDtE4128T8V9P4FigCxwNHVsZUoy1Wyq9m_QgWVWQZBTQh8ZsfZgM1WdS27DZSj_h4yFWztsnvfxFONyPo7Qhp7mtEKMm9bs2TbtkAi0WJWAf80-VOXKFhk3hAy7QWQxLvwoqHcKyPr2OTR_hbiI4UqptmfNEhO3-ZEPzvkVxXpyXqRbiRPluJdZzNbxQuznR72E3UwHedkCln0NA9iOUUTDroQ4VA5Xnfkive"
  },
  {
    title: "The Temple of Light — Traditional Muhurtham",
    category: "Ceremony • Madurai",
    location: "Heritage Granite Sanctum, Madurai",
    exif: "Leica M11 • 35mm Summicron-M • f/2.0 • 1/125s • Ambient Oil Lamp Glow",
    description: "Reverent silence as ancient carved granite pillars reflect the glowing brass lamps of the temple sanctum.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCukbXbfyCBw8FGB2aTKt_D_cvHB7gn_0pdITB3maRSUEXCxzRmrUgxHz2aZYELL3N2maayAPe1I14yrQvkJzsa8jofEKTBvWnqVOzJN0RsxPRdHexwDy6yzCSdLdwkOQITu4R8BlQnJN_8w45MAIc9H9Sby_mq4XBtoQR6ETnvXHlyx9X_XBLMzKGcpIll4cyvYinRgKtxNuPQq7_wdT8SUWCeDnmoAdtnsyCNHIsK-UtWgcgqPoxI"
  }
];

function initLightbox() {
  const dialog = document.getElementById('lightbox-dialog');
  if (!dialog) return;

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxLocation = document.getElementById('lightbox-location');
  const lightboxExif = document.getElementById('lightbox-exif');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  function openLightbox(index) {
    currentItemIndex = index;
    const item = portfolioData[currentItemIndex];
    if (!item) return;

    lightboxImg.src = item.img;
    lightboxTitle.textContent = item.title;
    lightboxCategory.textContent = item.category;
    lightboxLocation.textContent = item.location;
    lightboxExif.textContent = item.exif;
    lightboxDesc.textContent = item.description;

    dialog.showModal();
  }

  // Attach click to portfolio triggers
  const triggers = document.querySelectorAll('.lightbox-trigger');
  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(trigger.getAttribute('data-index') || index);
      openLightbox(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', () => dialog.close());
  if (prevBtn) prevBtn.addEventListener('click', () => {
    currentItemIndex = (currentItemIndex - 1 + portfolioData.length) % portfolioData.length;
    openLightbox(currentItemIndex);
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    currentItemIndex = (currentItemIndex + 1) % portfolioData.length;
    openLightbox(currentItemIndex);
  });

  // Lightbox click backdrop to close
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      dialog.close();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!dialog.open) return;
    if (e.key === 'ArrowLeft') prevBtn && prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn && nextBtn.click();
  });
}

/* ----------------------------------------------------
 * 4. BEFORE / AFTER CHIAROSCURO SPLIT SLIDER
 * ---------------------------------------------------- */
function initBeforeAfterSlider() {
  const container = document.getElementById('ba-slider');
  if (!container) return;

  const overlay = container.querySelector('.ba-overlay');
  const handle = container.querySelector('.ba-handle');
  const afterImg = overlay.querySelector('img');

  let isDragging = false;

  function updateSlider(clientX) {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percentage = (x / rect.width) * 100;
    overlay.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
    if (afterImg) {
      afterImg.style.width = `${rect.width}px`;
    }
  }

  // Synchronize initial image width on resize
  window.addEventListener('resize', () => {
    const rect = container.getBoundingClientRect();
    if (afterImg) afterImg.style.width = `${rect.width}px`;
  });
  // Initial width trigger
  setTimeout(() => {
    const rect = container.getBoundingClientRect();
    if (afterImg) afterImg.style.width = `${rect.width}px`;
  }, 100);

  // Event Listeners for Dragging
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch support for mobile
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches[0]) updateSlider(e.touches[0].clientX);
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches[0]) updateSlider(e.touches[0].clientX);
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

/* ----------------------------------------------------
 * 5. INTERACTIVE ARCHIVAL INVESTMENT ESTIMATOR
 * ---------------------------------------------------- */
function initQuoteCalculator() {
  const eventTypeSelect = document.getElementById('calc-event-type');
  const daysSelect = document.getElementById('calc-days');
  const albumCheckbox = document.getElementById('calc-album');
  const filmCheckbox = document.getElementById('calc-film');
  const resultDisplay = document.getElementById('calc-result');
  const applyBtn = document.getElementById('calc-apply-btn');

  if (!eventTypeSelect || !resultDisplay) return;

  function calculateEstimate() {
    let base = parseInt(eventTypeSelect.value) || 125000;
    const daysMultiplier = parseFloat(daysSelect ? daysSelect.value : 1) || 1;
    let albumCost = albumCheckbox && albumCheckbox.checked ? 35000 : 0;
    let filmCost = filmCheckbox && filmCheckbox.checked ? 55000 : 0;

    let totalLow = Math.round((base * daysMultiplier) + albumCost + filmCost);
    let totalHigh = Math.round(totalLow * 1.2);

    resultDisplay.textContent = `₹${totalLow.toLocaleString('en-IN')} — ₹${totalHigh.toLocaleString('en-IN')}`;
  }

  eventTypeSelect.addEventListener('change', calculateEstimate);
  if (daysSelect) daysSelect.addEventListener('change', calculateEstimate);
  if (albumCheckbox) albumCheckbox.addEventListener('change', calculateEstimate);
  if (filmCheckbox) filmCheckbox.addEventListener('change', calculateEstimate);

  calculateEstimate();

  // Apply quote to form
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const notesArea = document.querySelector('textarea[placeholder*="venue"]');
      if (notesArea) {
        const eventText = eventTypeSelect.options[eventTypeSelect.selectedIndex].text;
        notesArea.value = `[Calculated Estimate: ${resultDisplay.textContent}]\nEvent Type: ${eventText}\nCoverage: ${daysSelect.value} Day(s)\nInclude Album: ${albumCheckbox.checked ? 'Yes' : 'No'}\nInclude 4K Film: ${filmCheckbox.checked ? 'Yes' : 'No'}`;
      }
      showToast('Calculated estimate applied to your Atelier Inquiry form below!');
      const inquirySection = document.getElementById('inquiry-section');
      if (inquirySection) inquirySection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ----------------------------------------------------
 * 6. AMBIENT CARNATIC / BELL SOUNDSCAPE TOGGLE
 * ---------------------------------------------------- */
function initAmbientSoundscape() {
  const soundBtn = document.getElementById('ambient-sound-btn');
  if (!soundBtn) return;

  let audioCtx = null;
  let isPlaying = false;
  let oscillator = null;
  let gainNode = null;

  soundBtn.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (!isPlaying) {
      // Start soft warm tanpura-like drone pitch
      oscillator = audioCtx.createOscillator();
      gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(146.83, audioCtx.currentTime); // D3 frequency
      gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 2); // Soft volume

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();

      isPlaying = true;
      soundBtn.querySelectorAll('.sound-bar').forEach(b => b.classList.remove('muted'));
      showToast('Ambient Atelier Drone Enabled 🎵');
    } else {
      if (gainNode) {
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
        setTimeout(() => {
          if (oscillator) oscillator.stop();
        }, 500);
      }
      isPlaying = false;
      soundBtn.querySelectorAll('.sound-bar').forEach(b => b.classList.add('muted'));
      showToast('Ambient Audio Muted');
    }
  });
}

/* ----------------------------------------------------
 * 7. FORM SUBMISSION & TOAST NOTIFICATION
 * ---------------------------------------------------- */
function initFormHandler() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = form.querySelector('input[type="text"]');
    const name = nameInput ? nameInput.value.trim() : 'Esteemed Guest';

    // Show simulated confirmation toast
    showToast(`Thank you, ${name}! Your commission request has been received. Our principal photographer will contact you within 12 hours.`);
    form.reset();
  });
}

function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast-notification bg-surface-container-highest border border-primary/30 text-on-surface px-lg py-md rounded-xl shadow-2xl flex items-center gap-3 font-body-sm text-body-sm';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ----------------------------------------------------
 * 8. SMOOTH SCROLL & HERO PARALLAX INTERACTION
 * ---------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function initHeroParallax() {
  const heroImg = document.getElementById('hero-bg-img');
  if (!heroImg) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled < 900) {
      heroImg.style.transform = `scale(${1.05 + scrolled * 0.00015}) translateY(${scrolled * 0.1}px)`;
    }
  }, { passive: true });
}
