
javascript(
  /* ============================================
   REAL ESTATE AGENT WEBSITE TEMPLATE
   JavaScript for Interactive Features
   ============================================ */

  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================
  function initMobileMenu() {
    const toggle = document.querySelector(".mobile-menu-toggle");
    const nav = document.querySelector(".main-nav");

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        const isExpanded = this.getAttribute("aria-expanded") === "true";
        this.setAttribute("aria-expanded", !isExpanded);
        nav.classList.toggle("active");
      });

      // Close menu when clicking outside
      document.addEventListener("click", function (e) {
        if (!toggle.contains(e.target) && !nav.contains(e.target)) {
          toggle.setAttribute("aria-expanded", "false");
          nav.classList.remove("active");
        }
      });
    }
  }
)();

// ============================================
// MODAL FUNCTIONALITY
// ============================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Focus first input in modal
    const firstInput = modal.querySelector("input, textarea, select");
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

// Close modal on outside click
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal")) {
    closeModal(e.target.id);
  }
});

// Close modal on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const activeModal = document.querySelector(".modal.active");
    if (activeModal) {
      closeModal(activeModal.id);
    }
  }
});

// ============================================
// MOBILE NAVIGATION TOGGLE (SAFE VERSION)
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (!mobileToggle || !mainNav) {
    console.warn("Mobile nav elements not found");
    return;
  }

  mobileToggle.addEventListener("click", function () {
    alert("Hamburger clicked");
    const isOpen = mainNav.classList.toggle("active");
    mobileToggle.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
});

// ============================================
// FORM SUBMISSION HANDLER
// ============================================
function handleFormSubmit(event) {
  event.preventDefault();

  // Get form data
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Add loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    console.log("Form submitted:", data);

    // Reset form
    form.reset();

    // Remove loading state
    submitButton.textContent = originalText;
    submitButton.disabled = false;

    // Show success message
    alert("Thank you for your message! I'll get back to you soon.");

    // Close modal if form is in modal
    const modal = form.closest(".modal");
    if (modal) {
      closeModal(modal.id);
    }
  }, 1500);
}

// ============================================
// FILTER TOGGLE (Mobile)
// ============================================
function toggleFilters() {
  const filterBar = document.getElementById("filterBar");
  const filterToggle = document.querySelector(".filter-toggle");

  if (filterBar && filterToggle) {
    filterBar.classList.toggle("active");
    const isExpanded = filterToggle.getAttribute("aria-expanded") === "true";
    filterToggle.setAttribute("aria-expanded", !isExpanded);
  }
}

function applyFilters() {
  // Get filter values
  const priceMin = document.getElementById("price-min")?.value;
  const priceMax = document.getElementById("price-max")?.value;
  const bedrooms = document.getElementById("bedrooms")?.value;
  const bathrooms = document.getElementById("bathrooms")?.value;
  const propertyType = document.getElementById("property-type")?.value;
  const neighborhood = document.getElementById("neighborhood")?.value;

  // In a real application, this would filter the listings
  console.log("Applying filters:", {
    priceMin,
    priceMax,
    bedrooms,
    bathrooms,
    propertyType,
    neighborhood,
  });

  // Close filter bar on mobile
  if (window.innerWidth <= 768) {
    toggleFilters();
  }

  // Show loading state briefly
  const resultsSection = document.querySelector(".listings-page");
  if (resultsSection) {
    resultsSection.classList.add("loading");
    setTimeout(() => {
      resultsSection.classList.remove("loading");
    }, 500);
  }
}

// ============================================
// IMAGE GALLERY (Listing Detail Page)
// ============================================
(function initGallery() {
  const images = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1600&h=1000&fit=crop",
  ];

  let currentIndex = 0;

  window.showImage = function (index) {
    const mainImage = document.getElementById("mainImage");
    const thumbnails = document.querySelectorAll(".thumbnail");

    if (mainImage && index >= 0 && index < images.length) {
      currentIndex = index;
      mainImage.src = images[index];

      // Update active thumbnail
      thumbnails.forEach((thumb, i) => {
        if (i === index) {
          thumb.classList.add("active");
        } else {
          thumb.classList.remove("active");
        }
      });
    }
  };

  window.changeImage = function (direction) {
    let newIndex = currentIndex + direction;

    // Loop around
    if (newIndex < 0) {
      newIndex = images.length - 1;
    } else if (newIndex >= images.length) {
      newIndex = 0;
    }

    showImage(newIndex);
  };

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    const gallery = document.querySelector(".listing-gallery");
    if (gallery) {
      if (e.key === "ArrowLeft") {
        changeImage(-1);
      } else if (e.key === "ArrowRight") {
        changeImage(1);
      }
    }
  });
})();

// ============================================
// TABS (About Page Process Section)
// ============================================
function showTab(tabName) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach((content) => {
    content.classList.remove("active");
  });

  // Remove active class from all buttons
  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach((button) => {
    button.classList.remove("active");
  });

  // Show selected tab content
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add("active");
  }

  // Add active class to clicked button
  event.target.classList.add("active");
}

// ============================================
// FAQ ACCORDION
// ============================================
function toggleFAQ(button) {
  const faqItem = button.closest(".faq-item");
  const isExpanded = button.getAttribute("aria-expanded") === "true";

  // Close all other FAQ items
  const allFAQs = document.querySelectorAll(".faq-item");
  allFAQs.forEach((item) => {
    if (item !== faqItem) {
      item.classList.remove("active");
      const btn = item.querySelector(".faq-question");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  // Toggle current FAQ
  faqItem.classList.toggle("active");
  button.setAttribute("aria-expanded", !isExpanded);
}

// ============================================
// SMOOTH SCROLL TO ANCHOR LINKS
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just "#"
      if (href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight =
          document.querySelector(".site-header").offsetHeight;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

// ============================================
// LAZY LOADING ENHANCEMENT
// ============================================
(function initLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }
          observer.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => imageObserver.observe(img));
  }
})();

// ============================================
// SCROLL TO TOP BUTTON (Optional Enhancement)
// ============================================
(function initScrollToTop() {
  // Create scroll to top button
  const scrollButton = document.createElement("button");
  scrollButton.className = "scroll-to-top";
  scrollButton.innerHTML = "↑";
  scrollButton.setAttribute("aria-label", "Scroll to top");
  scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--color-accent);
        color: #ffffff;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;

  document.body.appendChild(scrollButton);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollButton.style.opacity = "1";
      scrollButton.style.visibility = "visible";
    } else {
      scrollButton.style.opacity = "0";
      scrollButton.style.visibility = "hidden";
    }
  });

  // Scroll to top on click
  scrollButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
})();

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("Real Estate Agent Website Template Loaded");

  // Add fade-in animation to sections as they come into view
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => sectionObserver.observe(section));
  }
});
