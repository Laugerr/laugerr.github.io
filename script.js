// script.js

document.addEventListener("DOMContentLoaded", () => {
  /* ========= Navigation ========= */
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section");

  function activateSection(id) {
    navButtons.forEach((btn) => {
      const isActive = btn.getAttribute("data-section") === id;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
      btn.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    sections.forEach((sec) => sec.classList.remove("active"));
    const targetSection = document.getElementById(id);
    if (targetSection) targetSection.classList.add("active");
    // persist
    try { localStorage.setItem("activeSection", id); } catch {}
  }

  navButtons.forEach((button) => {
    const target = button.getAttribute("data-section");
    button.addEventListener("click", () => activateSection(target));
    // Keyboard support: left/right to move between tabs
    button.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const list = Array.from(navButtons);
      const i = list.indexOf(button);
      const nextIdx = e.key === "ArrowRight" ? (i + 1) % list.length : (i - 1 + list.length) % list.length;
      list[nextIdx].focus();
      list[nextIdx].click();
    });
  });

  // Restore last active section if available, else first
  const savedSection = (() => {
    try { return localStorage.getItem("activeSection"); } catch { return null; }
  })();
  if (savedSection && document.getElementById(savedSection)) {
    activateSection(savedSection);
  } else {
    navButtons[0]?.click();
  }

  /* ========= Portfolio Filter ========= */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  function filterPortfolio(category) {
    portfolioItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");
      const show = category === "all" || itemCategory === category;
      item.classList.toggle("hidden", !show);
    });
  }

  function setActiveFilter(btn, group) {
    group.forEach((b) => {
      const isActive = b === btn;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-pressed", String(isActive));
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-filter") || "all";
      setActiveFilter(button, filterButtons);
      filterPortfolio(category);
      try { localStorage.setItem("portfolioFilter", category); } catch {}
    });
  });

  // Initial portfolio state
  const savedFilter = (() => {
    try { return localStorage.getItem("portfolioFilter"); } catch { return null; }
  })();
  const initialFilterBtn =
    (savedFilter && document.querySelector(`.filter-btn[data-filter="${savedFilter}"]`)) ||
    document.querySelector(".filter-btn.active");
  const initialFilter = initialFilterBtn ? initialFilterBtn.getAttribute("data-filter") : "all";
  if (initialFilterBtn) setActiveFilter(initialFilterBtn, filterButtons);
  filterPortfolio(initialFilter || "all");

  /* ========= Resume Filter ========= */
  const resumeButtons = document.querySelectorAll(".resume-btn");
  const resumeCategories = document.querySelectorAll(".resume-category");

  function showResumeCategory(category) {
    resumeCategories.forEach((cat) => {
      const match = category === "all" || cat.getAttribute("data-category") === category;
      cat.classList.toggle("hidden", !match);
    });
  }

  resumeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category") || "all";
      setActiveFilter(button, resumeButtons);
      showResumeCategory(category);
      try { localStorage.setItem("resumeFilter", category); } catch {}
    });
  });

  const savedResume = (() => {
    try { return localStorage.getItem("resumeFilter"); } catch { return null; }
  })();
  const initialResumeBtn =
    (savedResume && document.querySelector(`.resume-btn[data-category="${savedResume}"]`)) ||
    document.querySelector(".resume-btn.active");
  const initialResume = initialResumeBtn ? initialResumeBtn.getAttribute("data-category") : "all";
  if (initialResumeBtn) setActiveFilter(initialResumeBtn, resumeButtons);
  showResumeCategory(initialResume || "all");

  /* ========= Footer Info ========= */
  const lastUpdateEl = document.getElementById("last-update");
  if (lastUpdateEl && !lastUpdateEl.textContent.trim()) {
    const d = new Date(document.lastModified);
    lastUpdateEl.textContent = d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const visitorCountEl = document.getElementById("visitor-count");
  if (visitorCountEl) {
    fetch("https://laugerr.goatcounter.com/counter/TOTAL.json")
      .then((response) => {
        if (!response.ok) throw new Error("Counter request failed");
        return response.json();
      })
      .then((data) => {
        visitorCountEl.textContent = data.count || "0";
      })
      .catch(() => {
        visitorCountEl.textContent = "Unavailable";
      });
  }

  // Live Vilnius time
  function updateVilniusTime() {
    const now = new Date();

    const date = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Vilnius",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(now);

    const time = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Vilnius",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now);

    const el = document.getElementById("local-time");
    if (el) el.textContent = `${time} | ${date}`;
  }

  updateVilniusTime();
  setInterval(updateVilniusTime, 1000);

  /* ========= Background Music ========= */
  const music = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("music-toggle");
  const nextBtn = document.getElementById("next-track");
  const prevBtn = document.getElementById("prev-track");
  const volumeSlider = document.getElementById("volume-control");

  if (music && toggleBtn && nextBtn && prevBtn && volumeSlider) {
    const tracks = [
      "./assets/music/Stromae_Santé.mp3",
      "./assets/music/Stromae_Moules_Frites.mp3",
    ];

    let isPlaying = false;
    let currentTrackIndex = 0;

    function setToggleText(playing) {
      toggleBtn.textContent = playing ? "⏸ Pause Music" : "🎵 Play Music";
      toggleBtn.setAttribute("aria-pressed", playing ? "true" : "false");
    }

    async function loadTrack(index, autoPlay = true) {
      currentTrackIndex = index;
      music.src = tracks[currentTrackIndex];
      if (autoPlay) {
        try {
          await music.play();
          isPlaying = true;
          setToggleText(true);
        } catch (err) {
          // Autoplay blocked until user gesture—show play state
          isPlaying = false;
          setToggleText(false);
          console.warn("Autoplay prevented:", err);
        }
      } else {
        isPlaying = false;
        setToggleText(false);
      }
    }

    toggleBtn.addEventListener("click", async () => {
      if (!isPlaying) {
        // If nothing is playing, pick random track
        const randomIndex = Math.floor(Math.random() * tracks.length);
        await loadTrack(randomIndex, true);
      } else {
        music.pause();
        isPlaying = false;
        setToggleText(false);
      }
    });

    nextBtn.addEventListener("click", async () => {
      const nextIndex = (currentTrackIndex + 1) % tracks.length;
      await loadTrack(nextIndex, true);
    });

    prevBtn.addEventListener("click", async () => {
      const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
      await loadTrack(prevIndex, true);
    });

    volumeSlider.addEventListener("input", () => {
      music.volume = Number(volumeSlider.value);
    });

    // When a track ends, advance
    music.addEventListener("ended", async () => {
      const nextIndex = (currentTrackIndex + 1) % tracks.length;
      await loadTrack(nextIndex, true);
    });

    // Initialize (no autoplay to avoid errors)
    loadTrack(0, false);
  }

});
