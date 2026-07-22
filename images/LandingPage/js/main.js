document.addEventListener('DOMContentLoaded', function () {

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Quote modal ----------
  var modal = document.getElementById('quoteModal');
  var openTriggers = document.querySelectorAll('.js-open-modal');
  var closeTriggers = document.querySelectorAll('.js-close-modal');
  var lastFocused = null;

  function openModal(e) {
    if (e) e.preventDefault();
    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    var firstField = modal.querySelector('input, select, textarea');
    if (firstField) firstField.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocused) lastFocused.focus();
  }

  openTriggers.forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });

  closeTriggers.forEach(function (btn) {
    btn.addEventListener('click', closeModal);
  });

  // Click on the dark overlay (outside the panel) closes it
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  // Esc key closes it
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  // ---------- Testimonial carousel ----------
  var testimonialTrack = document.querySelector('.testimonial-track');
  var testimonialSlides = document.querySelectorAll('.testimonial-slide');
  var testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
  var testimonialPrev = document.querySelector('.testimonial-prev');
  var testimonialNext = document.querySelector('.testimonial-next');
  var testimonialCurrent = 0;
  var testimonialStartX = 0;

  function showTestimonial(index) {
    if (!testimonialSlides.length) return;

    testimonialCurrent = (index + testimonialSlides.length) % testimonialSlides.length;

    testimonialSlides.forEach(function (slide, i) {
      slide.classList.toggle('active', i === testimonialCurrent);
    });

    testimonialDots.forEach(function (dot, i) {
      var isActive = i === testimonialCurrent;
      dot.classList.toggle('active', isActive);
      dot.classList.toggle('dot--active', isActive);
    });

    if (testimonialTrack) {
      testimonialTrack.style.transform = 'translateX(' + (-testimonialCurrent * 100) + '%)';
    }
  }

  if (testimonialTrack && testimonialSlides.length) {
    showTestimonial(0);

    if (testimonialNext) {
      testimonialNext.addEventListener('click', function () {
        showTestimonial(testimonialCurrent + 1);
      });
    }

    if (testimonialPrev) {
      testimonialPrev.addEventListener('click', function () {
        showTestimonial(testimonialCurrent - 1);
      });
    }

    testimonialDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        showTestimonial(i);
      });
    });

    testimonialTrack.addEventListener('touchstart', function (e) {
      testimonialStartX = e.touches[0].clientX;
    }, { passive: true });

    testimonialTrack.addEventListener('touchend', function (e) {
      var diff = e.changedTouches[0].clientX - testimonialStartX;
      if (Math.abs(diff) > 40) {
        showTestimonial(testimonialCurrent + (diff < 0 ? 1 : -1));
      }
    }, { passive: true });
  }

  // ---------- Basic client-side validation feedback (optional) ----------
  // The real submission is handled by procesar-formulario.php (provided by IT).
  // This just prevents a broken/blank action from throwing a confusing error
  // if the file isn't uploaded yet during local preview.
  document.querySelectorAll('.quote-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      // Let native HTML5 validation run first (required fields, email type, etc.)
      if (!form.checkValidity()) return; // browser shows its own messages
      // No preventDefault here: the form posts normally to procesar-formulario.php
    });
  });

});
