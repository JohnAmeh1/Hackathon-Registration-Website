// Form validation and progress tracking
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("pitchForm");
  const progressFill = document.getElementById("progress-fill");
  const progressText = document.getElementById("progress-text");
  const submitBtn = document.getElementById("submitBtn");
  const buttonText = document.getElementById("button-text");
  const loadingSpinner = document.getElementById("loading-spinner");

  // Track form fields for progress
  const formFields = form.querySelectorAll("input, textarea, select");
  const totalFields = formFields.length;

  // Update progress as user fills the form
  formFields.forEach((field) => {
    field.addEventListener("input", updateProgress);
    field.addEventListener("change", updateProgress);
  });

  function updateProgress() {
    let completed = 0;

    formFields.forEach((field) => {
      if (field.type === "checkbox") {
        if (field.checked) completed++;
      } else if (field.value.trim() !== "") {
        completed++;
      }
    });

    const percentage = Math.min(
      100,
      Math.round((completed / totalFields) * 100)
    );
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}% Complete`;
  }

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading state
    buttonText.textContent = "Processing...";
    loadingSpinner.classList.remove("hidden");
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      document.getElementById("success-modal").classList.remove("hidden");

      // Reset button state (in case of form errors in real implementation)
      buttonText.textContent = "Reserve Pitch Slot";
      loadingSpinner.classList.add("hidden");
      submitBtn.disabled = false;
    }, 2000);
  });
});

function closeModal() {
  document.getElementById("success-modal").classList.add("hidden");
}
