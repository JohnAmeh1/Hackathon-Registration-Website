// Generate QR Code
const qr = new QRious({
  element: document.getElementById("qr"),
  value: "Applex Hackathon Registration Confirmed - ID: AH2025-001",
  size: 220,
  background: "white",
  foreground: "#1f2937",
  level: "M",
});

// Download QR Code function
function downloadQR() {
  const canvas = document.getElementById("qr");
  const link = document.createElement("a");
  link.download = "applex-hackathon-qr-code.png";
  link.href = canvas.toDataURL();
  link.click();

  // Visual feedback
  const btn = document.querySelector(".download-btn");
  const originalText = btn.innerHTML;
  btn.innerHTML = `
        <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        <span>Downloaded!</span>
      `;

  setTimeout(() => {
    btn.innerHTML = originalText;
  }, 2000);
}

// Add some interactive sparkle effect on hover
document
  .querySelector(".qr-container")
  .addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.02)";
    this.style.transition = "transform 0.3s ease";
  });

document
  .querySelector(".qr-container")
  .addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
