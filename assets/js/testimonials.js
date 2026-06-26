//Current JS
let testimonialsData = [];

const grid = document.getElementById("testimonialGrid");

fetch("assets/data/testimonials.json")
  .then(res => res.json())
  .then(data => {

    testimonialsData = data;

    renderGridTestimonials();

  })
  .catch(err=> {
    console.error("Failed to load testimonials:", err);
  });

/* GRID TESTIMONIALS */
function renderGridTestimonials() {

  if (!grid) return;

  grid.innerHTML = testimonialsData.map(t => `

    <div class="testimonial-grid-card">

      <div class="testimonial-top">

        <img src="${t.image}" alt="${t.name}">

        <div class="testimonial-info">

          <strong>${t.name}</strong>

          <small>${t.institution}</small><br>

          <small>${t.level}</small>

        </div>

      </div>

      <p>
        ${t.message}
      </p>

    </div>

  `).join("");
}