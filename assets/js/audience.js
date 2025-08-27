// Form validation and progress tracking
const form = document.getElementById("audienceForm");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const submitBtn = document.getElementById("submitBtn");
const buttonText = document.getElementById("button-text");
const loadingSpinner = document.getElementById("loading-spinner");

// Create particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 12 + "s";
    particle.style.animationDuration = Math.random() * 5 + 8 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Update progress bar
function updateProgress() {
  const inputs = form.querySelectorAll("input[required], select[required]");
  const filledInputs = Array.from(inputs).filter((input) => {
    if (input.type === "checkbox") {
      return input.checked;
    } else if (input.type === "radio") {
      const radioGroup = form.querySelectorAll(`input[name="${input.name}"]`);
      return Array.from(radioGroup).some((radio) => radio.checked);
    }
    return input.value.trim() !== "";
  });

  const progress = (filledInputs.length / inputs.length) * 100;
  progressFill.style.width = progress + "%";
  progressText.textContent = Math.round(progress) + "% Complete";

  // Enable/disable submit button
  if (progress === 100) {
    submitBtn.disabled = false;
    submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
  } else {
    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-50", "cursor-not-allowed");
  }
}

// Add input listeners
form.addEventListener("input", updateProgress);
form.addEventListener("change", updateProgress);

// Form submission
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Show loading state
  buttonText.textContent = "Processing Payment...";
  loadingSpinner.classList.remove("hidden");
  submitBtn.disabled = true;

  // Simulate payment processing
  setTimeout(() => {
    buttonText.textContent = "Validating Information...";
  }, 500);

  setTimeout(() => {
    buttonText.textContent = "Confirming Registration...";
  }, 1500);

  setTimeout(() => {
    // Hide loading state
    buttonText.textContent = "Registration Complete!";
    loadingSpinner.classList.add("hidden");

    // Show success modal
    document.getElementById("success-modal").classList.remove("hidden");
    document.getElementById("success-modal").classList.add("flex");

    // Reset form
    setTimeout(() => {
      form.reset();
      updateProgress();
      buttonText.textContent = "Pay $49 & Register";
      submitBtn.disabled = false;
    }, 2000);
  }, 2500);
});

// Close modal function
function closeModal() {
  document.getElementById("success-modal").classList.add("hidden");
  document.getElementById("success-modal").classList.remove("flex");
  clearSavedData();

  setTimeout(() => {
    if (confirm("Redirecting to QR Code Page. Click OK to proceed.")) {
      window.location.href = "qr.html"; // Redirect to QR code page
    } else {
      //   form.reset();
      //   updateProgress();
      //   window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, 500);
}

// Show notification
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas fa-${
          type === "success" ? "check-circle" : "exclamation-circle"
        } mr-2"></i>
        ${message}
      `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Input validation
form.querySelectorAll('input[type="email"]').forEach((input) => {
  input.addEventListener("blur", function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailRegex.test(this.value)) {
      this.style.borderColor = "#ef4444";
      showNotification("Please enter a valid email address", "error");
    } else {
      this.style.borderColor = this.value ? "#10b981" : "#e5e7eb";
    }
  });
});

// Phone number formatting
form.querySelectorAll('input[type="tel"]').forEach((input) => {
  input.addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "");
    if (value.length >= 6) {
      value = value.replace(/(\d{3})(\d{4})(\d{4})/, "($1) $2-$3");
    } else if (value.length >= 3) {
      value = value.replace(/(\d{3})(\d{0,3})/, "($1) $2");
    }
    this.value = value;
  });
});

// Character count for textareas
form.querySelectorAll("textarea[maxlength]").forEach((textarea) => {
  const maxLength = textarea.getAttribute("maxlength");
  const counter = document.createElement("div");
  counter.className = "text-xs text-gray-400 mt-1";
  counter.textContent = `0/${maxLength} characters`;
  textarea.parentNode.appendChild(counter);

  textarea.addEventListener("input", function () {
    const currentLength = this.value.length;
    counter.textContent = `${currentLength}/${maxLength} characters`;

    if (currentLength > maxLength * 0.9) {
      counter.classList.add("text-orange-500");
      counter.classList.remove("text-gray-400");
    } else {
      counter.classList.add("text-gray-400");
      counter.classList.remove("text-orange-500");
    }
  });
});

// Save form data to localStorage
function saveFormData() {
  const formData = new FormData(form);
  const data = {};
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  localStorage.setItem("hackathon-audience-draft", JSON.stringify(data));
}

// Load saved form data
function loadFormData() {
  const saved = localStorage.getItem("hackathon-audience-draft");
  if (saved) {
    const data = JSON.parse(saved);
    Object.keys(data).forEach((key) => {
      const input = form.querySelector(`[name="${key}"]`);
      if (input) {
        if (input.type === "checkbox" || input.type === "radio") {
          input.checked = data[key] === input.value || data[key] === "on";
        } else {
          input.value = data[key];
        }
      }
    });
    updateProgress();
  }
}

// Clear saved data
function clearSavedData() {
  localStorage.removeItem("hackathon-audience-draft");
}

// Auto-save form data
form.addEventListener("input", debounce(saveFormData, 1000));

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize animations and features
document.addEventListener("DOMContentLoaded", function () {
  createParticles();
  updateProgress();
  loadFormData();

  // Add floating animation to cards
  const cards = document.querySelectorAll(".form-card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add("floating");
  });

  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  });

  // Observe benefit cards
  document.querySelectorAll(".benefit-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.6s ease-out";
    observer.observe(card);
  });
});

// Modal close on outside click
document
  .getElementById("success-modal")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closeModal();
    }
  });

// Close modal with escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const modal = document.getElementById("success-modal");
    if (!modal.classList.contains("hidden")) {
      closeModal();
    }
  }
});

// Add ripple effect to buttons
document.querySelectorAll(".btn-primary").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      }
      
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      .benefit-card:hover .fas {
        animation: bounce 0.5s ease-in-out;
      }
      
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
    `;
document.head.appendChild(style);
