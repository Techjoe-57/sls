// JS for About page
const track = document.querySelector(".testimonial-tracks");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

nextBtn.addEventListener("click", () => {
  track.scrollBy({ left: 360, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  track.scrollBy({ left: -360, behavior: "smooth" });
});

// testimonials-auto.js

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".testimonial-tracks");
  const cards = document.querySelectorAll(".testimonial-cards");

  let index = 0;
  let intervalId = null;
  let isPaused = false;

  function getCardWidth() {
    return cards[0].offsetWidth + 20; // includes gap
  }

  function scrollToCard(i) {
    track.scrollTo({
      left: i * getCardWidth(),
      behavior: "smooth",
    });
  }

  function startAutoPlay() {
    intervalId = setInterval(() => {
      if (isPaused) return;

      index++;

      if (index >= cards.length) {
        index = 0;
      }

      scrollToCard(index);
    }, 4000); // change speed here (ms)
  }

  function stopAutoPlay() {
    clearInterval(intervalId);
  }

  // Pause on hover
  track.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  track.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  // Touch support (mobile pause while interacting)
  track.addEventListener("touchstart", () => {
    isPaused = true;
  });

  track.addEventListener("touchend", () => {
    isPaused = false;
  });

  startAutoPlay();
});

track.addEventListener("scroll", () => {
  clearTimeout(track._scrollTimeout);

  track._scrollTimeout = setTimeout(() => {
    const indexApprox = Math.round(track.scrollLeft / getCardWidth());
    index = indexApprox;
  }, 100);
});