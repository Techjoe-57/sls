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
  
  // Saves the preference and swaps the icon
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

  //Auto Slider Feature
  // document.addEventListener('DOMContentLoaded', () => {
  // const sliderSection = document.querySelector('.simple-slider');
  // const slides = document.querySelectorAll('.simple-slider .slide');
  // const prevBtn = document.querySelector('.simple-slider .simple-prev');
  // const nextBtn = document.querySelector('.simple-slider .simple-next');
  
  // let currentIdx = 0;
  // let autoplayTimer = null;
  // const AUTOPLAY_DELAY = 5000; // 5 seconds

  // 1. Dynamically Create & Inject Navigation Dots
  // const dotsContainer = document.createElement('div');
  // dotsContainer.classList.add('slider-dots');
  
  // slides.forEach((_, index) => {
  //   const dot = document.createElement('button');
  //   dot.classList.add('slider-dot');
  //   dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
  //   if (index === 0) dot.classList.add('active'); // First dot starts active
    
  //   dot.addEventListener('click', () => {
  //     showSlide(index);
  //     resetAutoplay();
  //   });
    
  //   dotsContainer.appendChild(dot);
  // });
  
  // sliderSection.appendChild(dotsContainer);
  // const dots = document.querySelectorAll('.slider-dot');

  // Find initial active slide index if modified in original HTML
  // slides.forEach((slide, index) => {
  //   if (slide.classList.contains('active')) {
  //     currentIdx = index;
  //   }
  // });

  // 2. Core Function to Switch Slides & Update Dots
  // function showSlide(index) {
    // Remove active classes
    // slides[currentIdx].classList.remove('active');
    // dots[currentIdx].classList.remove('active');
    
    // Boundary checks
    // if (index >= slides.length) {
    //   currentIdx = 0;
    // } else if (index < 0) {
    //   currentIdx = slides.length - 1;
    // } else {
    //   currentIdx = index;
    // }
    
    // Add active classes
  //   slides[currentIdx].classList.add('active');
  //   dots[currentIdx].classList.add('active');
  // }

  // 3. Autoplay Management
  // function startAutoplay() {
  //   if (!autoplayTimer) {
  //     autoplayTimer = setInterval(() => {
  //       showSlide(currentIdx + 1);
  //     }, AUTOPLAY_DELAY);
  //   }
  // }

  // function pauseAutoplay() {
  //   clearInterval(autoplayTimer);
  //   autoplayTimer = null;
  // }

  // function resetAutoplay() {
  //   pauseAutoplay();
  //   startAutoplay();
  // }

  // 4. Manual Arrow Controls
  // nextBtn.addEventListener('click', () => {
  //   showSlide(currentIdx + 1);
  //   resetAutoplay(); 
  // });

  // prevBtn.addEventListener('click', () => {
  //   showSlide(currentIdx - 1);
  //   resetAutoplay();
  // });

  // 5. Pause on Hover
  // sliderSection.addEventListener('mouseenter', pauseAutoplay);
  // sliderSection.addEventListener('mouseleave', startAutoplay);

  // Initialize
//   startAutoplay();
// });


//TEST
document.addEventListener('DOMContentLoaded', () => {
  const sliderSection = document.querySelector('.simple-slider');
  const slides = document.querySelectorAll('.simple-slider .slide');
  const prevBtn = document.querySelector('.simple-slider .simple-prev');
  const nextBtn = document.querySelector('.simple-slider .simple-next');
  
  let currentIdx = 0;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 5000; // 5 seconds

  // --- 1. Touch Gesture Variables ---
  let touchStartX = 0;
  let touchEndX = 0;
  const SWIPE_THRESHOLD = 50; // Minimum swipe distance in pixels to trigger a flip

  // --- 2. Dynamically Create Navigation Dots ---
  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('slider-dots');
  
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    if (index === 0) dot.classList.add('active');
    
    dot.addEventListener('click', () => {
      showSlide(index);
      resetAutoplay();
    });
    
    dotsContainer.appendChild(dot);
  });
  
  sliderSection.appendChild(dotsContainer);
  const dots = document.querySelectorAll('.slider-dot');

  // Find initial active index
  slides.forEach((slide, index) => {
    if (slide.classList.contains('active')) {
      currentIdx = index;
    }
  });

  // --- 3. Core Slider Mechanics ---
  function showSlide(index) {
    slides[currentIdx].classList.remove('active');
    dots[currentIdx].classList.remove('active');
    
    if (index >= slides.length) {
      currentIdx = 0;
    } else if (index < 0) {
      currentIdx = slides.length - 1;
    } else {
      currentIdx = index;
    }
    
    slides[currentIdx].classList.add('active');
    dots[currentIdx].classList.add('active');
  }

  // --- 4. Autoplay Engine ---
  function startAutoplay() {
    if (!autoplayTimer) {
      autoplayTimer = setInterval(() => {
        showSlide(currentIdx + 1);
      }, AUTOPLAY_DELAY);
    }
  }

  function pauseAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  function resetAutoplay() {
    pauseAutoplay();
    startAutoplay();
  }

  // --- 5. Event Listeners: Click & Hover ---
  nextBtn.addEventListener('click', () => {
    showSlide(currentIdx + 1);
    resetAutoplay(); 
  });

  prevBtn.addEventListener('click', () => {
    showSlide(currentIdx - 1);
    resetAutoplay();
  });

  sliderSection.addEventListener('mouseenter', pauseAutoplay);
  sliderSection.addEventListener('mouseleave', startAutoplay);

  // --- 6. Event Listeners: Touch Swiping ---
  sliderSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    pauseAutoplay(); // Pause autoplay while the user is physically interacting
  }, { passive: true });

  sliderSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
    startAutoplay(); // Safely resume loop after interaction ends
  }, { passive: true });

  function handleSwipeGesture() {
    const swipeDistance = touchEndX - touchStartX;

    // Swiped Left -> Show Next Slide
    if (swipeDistance < -SWIPE_THRESHOLD) {
      showSlide(currentIdx + 1);
    } 
    // Swiped Right -> Show Previous Slide
    else if (swipeDistance > SWIPE_THRESHOLD) {
      showSlide(currentIdx - 1);
    }
  }

  // Boot the slider
  startAutoplay();
});
