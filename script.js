// script.js

document.addEventListener("DOMContentLoaded", () => {
  /* ========= Navigation ========= */
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".section");

navButtons.forEach(button => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-section");

    // Update active states
    navButtons.forEach(btn => {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
      btn.setAttribute("tabindex", "-1");
    });
    sections.forEach(sec => sec.classList.remove("active"));

    // Activate the clicked section
    const targetSection = document.getElementById(target);
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    button.setAttribute("tabindex", "0");
    targetSection.classList.add("active");
  });
});

// Restore last active section if available
const savedSection = localStorage.getItem("activeSection");
if (savedSection) {
  document.querySelector(`[data-section="${savedSection}"]`)?.click();
} else {
  // Default to the first nav button
  navButtons[0]?.click();
}


  /* ========= Portfolio Filter ========= */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  function filterPortfolio(category) {
    portfolioItems.forEach(item => {
      const itemCategory = item.getAttribute("data-category");
      item.classList.toggle(
        "hidden",
        !(category === "all" || itemCategory === category)
      );
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-filter");

      // Update button states
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter items
      filterPortfolio(category);
    });
  });

  // Initial state: "All" active
  const activeFilterBtn = document.querySelector(".filter-btn.active");
  filterPortfolio(activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all");

  /* ========= Resume Filter ========= */
  const resumeButtons = document.querySelectorAll(".resume-btn");
  const resumeCategories = document.querySelectorAll(".resume-category");

  function showResumeCategory(category) {
    resumeCategories.forEach(cat => {
      const match = category === "all" || cat.getAttribute("data-category") === category;
      cat.classList.toggle("hidden", !match);
    });
  }

  resumeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");

      // Update button states
      resumeButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Show categories
      showResumeCategory(category);
    });
  });

  // Initial state: "All" active
  const activeResumeBtn = document.querySelector(".resume-btn.active");
  showResumeCategory(activeResumeBtn ? activeResumeBtn.getAttribute("data-category") : "all");

  /* ========= Footer Info ========= */
  const lastUpdateEl = document.getElementById("last-update");
  if (lastUpdateEl && !lastUpdateEl.textContent.trim()) {
    const d = new Date(document.lastModified);
    lastUpdateEl.textContent = d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  // Live Dubai time
  function updateDubaiTime() {
  const now = new Date();

  // Format date as DD/MM/YYYY
  const date = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(now);

  // Format time
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dubai",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  }).format(now);

  const el = document.getElementById("local-time");
  if (el) el.textContent = `${time} | ${date}`;
}

  updateDubaiTime();
  setInterval(updateDubaiTime, 1000);
});

/* ========= Background Music ========= */

const music = document.getElementById("bg-music");
const toggleBtn = document.getElementById("music-toggle");
const nextBtn = document.getElementById("next-track");
const prevBtn = document.getElementById("prev-track");
const volumeSlider = document.getElementById("volume-control");

// List of available tracks
const tracks = [
  "./assets/music/Stromae_Santé.mp3",
  "./assets/music/Stromae_Moules_Frites.mp3"
];

let isPlaying = false;
let currentTrackIndex = 0;

// Load a specific track
function loadTrack(index) {
  currentTrackIndex = index;
  music.src = tracks[currentTrackIndex];
  music.play();
  toggleBtn.textContent = "⏸ Pause Music";
  isPlaying = true;
}

// Toggle Play/Pause
toggleBtn.addEventListener("click", () => {
  if (!isPlaying) {
    // If nothing is playing, pick random track
    const randomIndex = Math.floor(Math.random() * tracks.length);
    loadTrack(randomIndex);
  } else {
    music.pause();
    toggleBtn.textContent = "🎵 Play Music";
    isPlaying = false;
  }
});

// Next Track
nextBtn.addEventListener("click", () => {
  let nextIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(nextIndex);
});

// Previous Track
prevBtn.addEventListener("click", () => {
  let prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(prevIndex);
});

// Volume Control
volumeSlider.addEventListener("input", () => {
  music.volume = volumeSlider.value;
});
