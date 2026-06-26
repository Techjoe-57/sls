// Dark mode or light button toggle
// Dark/light mode function
const btn = document.getElementById("themeToggle");

// Check the saved theme on load
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  if (btn) btn.textContent = "☀️"; // Optional: Change icon to sun in dark mode
}

// Toggle theme on click safely
btn?.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  
  // Save the preference and swap the icon
  localStorage.setItem("theme", isDark ? "dark" : "light");
  btn.textContent = isDark ? "☀️" : "🌙"; 
});

// Event countdown
const countdownEl = document.getElementById("countdownTimer")
const events = document.querySelectorAll(".calendar-list li")

let nextEventDate = null;

events.forEach(event => {
  const date = new Date(event.dataset.date).getTime();
  const now = new Date().getTime();

  if (date > now) {
    if (!nextEventDate || date < nextEventDate) {
      nextEventDate = date;
    }
  }
});

if (countdownEl && nextEventDate) {
  setInterval(() => {

    const now = new Date().getTime();
    const distance = nextEventDate - now;

    if (distance < 0) {
      countdownEl.textContent = "Event Started!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const status = form.querySelector(".form-status");

    emailjs.sendForm("service_iippmsj", "template_sdf8mu3", this)
      .then(() => {
        status.textContent = "Message sent successfully!";
        status.style.color = "green";
        form.reset();
      })
      .catch(() => {
        status.textContent = "Something went wrong.";
        status.style.color = "red";
      });
  });
}

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Floating contact modal
const contactFloat = document.getElementById("contactFloat");
const contactModal = document.getElementById("contactModal");
const closeModal = document.getElementById("closeModal");

if (contactFloat && contactModal && closeModal) {

  contactFloat.addEventListener("click", () => {
    contactModal.classList.add("active");
  });

  closeModal.addEventListener("click", () => {
    contactModal.classList.remove("active");
  });

  // Close when clicking outside
  contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.classList.remove("active");
    }
  });

}

// Blog Script
fetch('assets/data/blog.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('blogContainer');

    data.forEach(post => {
      container.innerHTML += `
        <div class="blog-card">
          <img src="${post.image}" alt="">
          <div class="blog-content">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <a href="#">Read More →</a>
          </div>
        </div>
      `;
    });
  });