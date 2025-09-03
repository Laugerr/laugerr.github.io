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

// Visitor counter using CountAPI
document.addEventListener("DOMContentLoaded", () => {
  fetch('https://api.countapi.xyz/hit/laugerr.github.io/visits')
    .then(response => response.json())
    .then(data => {
      document.getElementById('visitor-count').textContent = data.value;
    })
    .catch(error => console.error('Visitor counter error:', error));

  // Last update date (based on document last modified)
  document.getElementById("last-update").textContent = document.lastModified;
});
