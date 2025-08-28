Hackathon Registration Website

This is the frontend-only website of a Hackathon Registration Platform. The site provides information about the hackathon and allows both participants and audience members to register. After registration and simulated payment, users receive a **QR code** that serves as their event pass.

🚀 Features

* Home Page

  * Overview of the hackathon .
  * About section explaining the event.
  * Registration options for Participants and Audience.

* Participants Registration

  * Teams must consist of 5 members.
  * Simple form to input team name and members’ details.
  * Simulated payment flow (frontend-only).
  * Redirects to a QR Code confirmation page.

* Audience Registration

  * Registration form for event viewers.
  * Simulated payment flow (frontend-only).
  * Redirects to a QR Code confirmation page.

* QR Code Generation

  * Uses [Qrious.js](https://github.com/neocotic/qrious) to generate a QR code dynamically.
  * Confirms successful registration.

* Responsive Design

  * Built with Tailwind CSS for a modern and mobile-friendly interface.


🛠️ Tech Stack

* HTML5 – Structure and layout
* CSS3 + Tailwind CSS – Styling and responsiveness
* JavaScript (Vanilla JS) – Interactivity, form handling, and QR code generation
* [Qrious.js](https://cdnjs.com/libraries/qrious) – QR code library


📸 Screenshots

### Home Page


<img width="1915" height="895" alt="Screenshot 2025-08-27 023647" src="https://github.com/user-attachments/assets/59280c9d-5fcc-43d1-a209-eb4a477e5859" />

### Participant Registration

<img width="601" height="896" alt="Screenshot 2025-08-27 023747" src="https://github.com/user-attachments/assets/950628b1-7ad9-4840-869c-75d4f96fd0ed" />


### Audience Registration

<img width="642" height="844" alt="Screenshot 2025-08-27 023824" src="https://github.com/user-attachments/assets/ae5386d8-eeaf-4354-bb18-60c50717c01f" />


### QR Code Confirmation

<img width="183" height="358" alt="Screenshot 2025-08-27 024353" src="https://github.com/user-attachments/assets/dd449aec-1d5d-4890-93f6-045249d07cf1" />



⚠️ Note

* This project is frontend-only.
* Payment is **simulated** — no real transactions occur.
* To make it production-ready, integrate a backend (e.g., Node.js, PHP, Django) and a payment gateway (e.g., Stripe, Paystack, Flutterwave).

