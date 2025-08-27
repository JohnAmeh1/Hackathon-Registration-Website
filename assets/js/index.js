// Mobile menu functionality
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenuBtn = document.getElementById("close-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

closeMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll("a");
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

// Nav link hover effects
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("mouseenter", function () {
    const underline = this.querySelector("span");
    underline.style.width = "100%";
  });

  link.addEventListener("mouseleave", function () {
    const underline = this.querySelector("span");
    underline.style.width = "0%";
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Counter animations
      if (entry.target.id === "counter-participants") {
        animateCounter(entry.target, 500);
      } else if (entry.target.id === "counter-hours") {
        animateCounter(entry.target, 48);
      } else if (entry.target.id === "counter-prizes") {
        animateCounter(entry.target, 50000);
      }

      // Card animations
      if (entry.target.classList.contains("card-hover")) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe counter elements
const counters = document.querySelectorAll('[id^="counter-"]');
counters.forEach((counter) => observer.observe(counter));

// Observe card elements
const cards = document.querySelectorAll(".card-hover");
cards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "all 0.6s ease-out";
  observer.observe(card);
});

// Back to top button
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.opacity = "1";
    backToTopBtn.style.pointerEvents = "auto";
  } else {
    backToTopBtn.style.opacity = "0";
    backToTopBtn.style.pointerEvents = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Active navigation highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-purple-600");
    link.classList.add("text-gray-700");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.remove("text-gray-700");
      link.classList.add("text-purple-600");
    }
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".floating");

  parallaxElements.forEach((element) => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add loading animation on page load
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease-in-out";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Dynamic particle generation
function createParticles() {
  const particlesContainer = document.querySelector(".particles");
  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 8 + "s";
    particle.style.animationDuration = Math.random() * 3 + 5 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles
createParticles();

// Form validation and enhancement (if forms are added later)
function enhanceForms() {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focus");
      });

      input.addEventListener("blur", () => {
        if (input.value === "") {
          input.parentElement.classList.remove("focus");
        }
      });
    });
  });
}

// Call form enhancement
enhanceForms();

// Add some interactive elements
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".cursor");
  if (cursor) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  }
});

// Performance optimization - lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}
