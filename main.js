document.addEventListener("DOMContentLoaded", () => {
  /* ================= HEADER AO SCROLL ================= */
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* ================= CARROSSEL DE SERVIÇOS ================= */
  document.querySelectorAll(".services-carousel").forEach((carousel) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      carousel.style.cursor = "grabbing";
    });

    carousel.addEventListener("mouseleave", () => {
      isDown = false;
      carousel.style.cursor = "grab";
    });

    carousel.addEventListener("mouseup", () => {
      isDown = false;
      carousel.style.cursor = "grab";
    });

    carousel.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.2;
      carousel.scrollLeft = scrollLeft - walk;
    });
  });

  /* ================= FAQ (AJUSTADO) ================= */
  const faqButtons = document.querySelectorAll(".faq-question");

  faqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const answer = item.querySelector(".faq-answer");
      const isActive = item.classList.contains("active");

      // Fecha todos os outros
      document.querySelectorAll(".faq-item").forEach((i) => {
        if (i !== item) {
          i.classList.remove("active");
          i.querySelector(".faq-answer").style.maxHeight = null;
          i.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        }
      });

      // Toggle do item clicado
      if (isActive) {
        item.classList.remove("active");
        answer.style.maxHeight = null;
        btn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
});

/* ================= ANIMAÇÃO REVEAL ================= */
const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.85;

  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
