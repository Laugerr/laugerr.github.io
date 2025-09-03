// script.js

document.addEventListener("DOMContentLoaded", () => {
  /* ========= Navigation ========= */
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section");

  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-section");

      // Remove active from all
      navButtons.forEach(btn => btn.classList.remove("active"));
      sections.forEach(sec => sec.classList.remove("active"));

      // Activate the clicked section
      button.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });

  /* ========= Portfolio Filter ========= */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  function filterPortfolio(category) {
    portfolioItems.forEach(item => {
      const itemCategory = item.getAttribute("data-category");
      if (category === "all" || itemCategory === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
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
  const activeFilterBtn = document.querySelector('.filter-btn.active');
  filterPortfolio(activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all");

  /* ========= Resume Filter ========= */
  const resumeButtons = document.querySelectorAll(".resume-btn");
  const resumeCategories = document.querySelectorAll(".resume-category");

  function showResumeCategory(category) {
    resumeCategories.forEach(cat => {
      if (category === "all" || cat.getAttribute("data-category") === category) {
        cat.style.display = "block";
      } else {
        cat.style.display = "none";
      }
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
});

document.addEventListener("DOMContentLoaded", () => {
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
    const formatted = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Dubai",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    }).format(now);

    const el = document.getElementById("local-time");
    if (el) el.textContent = formatted;
  }

  updateDubaiTime();
  setInterval(updateDubaiTime, 1000);
});
