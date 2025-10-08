/**
* Template Name: Append
* Template URL: https://bootstrapmade.com/append-bootstrap-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();


  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// VEHICLE CLEANING ESTIMATION FORM
const basePrices = {
  sedan: { interior: 50, exterior: 40 },
  suv: { interior: 60, exterior: 50 },
  pickup: { interior: 70, exterior: 60 },
  van: { interior: 75, exterior: 65 },
  semi: { interior: 90, exterior: 85 },
  box: { interior: 100, exterior: 90 }
};

const frequencyMultiplier = {
  oneTime: 1,
  weekly: 0.9,
  biweekly: 0.925,
  monthly: 0.95
};

// --- Calculate estimate ---
function calculateEstimate() {
  const vehicleCheckboxes = document.querySelectorAll('input[name="vehicle"]:checked');
  const service = document.getElementById('service-type').value;
  const freq = document.getElementById('frequency').value;

  if (!vehicleCheckboxes.length || !service || !freq) {
    alert("Please select at least one vehicle and all options.");
    return;
  }

  let total = 0;
  let selectedVehicles = [];

  vehicleCheckboxes.forEach(v => {
    const type = v.value;
    // Support both input and select for qty fields
    let qtyElem = document.querySelector(`input[name="${type}-qty"]`) || document.querySelector(`select[name="${type}-qty"]`);
    const qty = qtyElem ? parseInt(qtyElem.value) || 0 : 0;
    if (qty > 0) {
      selectedVehicles.push(`${type} x${qty}`);

      let price = 0;
      if (service === "interior") price += basePrices[type].interior;
      else if (service === "exterior") price += basePrices[type].exterior;
      else if (service === "both") price += basePrices[type].interior + basePrices[type].exterior;

      total += price * qty;
    }
  });

  total *= frequencyMultiplier[freq];
  total = Math.round(total * 100) / 100;

  const resultText = `Estimated Price: $${total.toFixed(2)}`;
  document.getElementById('price-result').innerText = resultText;

  // Store summary in hidden field for EmailJS
  document.getElementById('price-result').dataset.summary = `
Vehicles: ${selectedVehicles.join(", ")}
Service: ${service}
Frequency: ${freq}
Estimated Price: $${total.toFixed(2)}
  `.trim();
}

// --- Button listener for calculation ---
document.getElementById('calculate-btn').addEventListener('click', calculateEstimate);

// --- EmailJS form submission ---
document.getElementById('truck-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const vehicleCheckboxes = document.querySelectorAll('input[name="vehicle"]:checked');
  const service = document.getElementById('service-type').value;
  const freq = document.getElementById('frequency').value;

  let vehicles = [];
  let quantities = [];
  let totalPrice = 0;

  vehicleCheckboxes.forEach(v => {
    const type = v.value;
    const qtyInput = document.querySelector(`input[name="${type}-qty"]`);
    const qty = parseInt(qtyInput.value) || 0;
    if (qty > 0) {
      vehicles.push(type);
      quantities.push(qty);

      let price = 0;
      if (service === "interior") price += basePrices[type].interior;
      else if (service === "exterior") price += basePrices[type].exterior;
      else if (service === "both") price += basePrices[type].interior + basePrices[type].exterior;

      totalPrice += price * qty;
    }
  });

  totalPrice *= frequencyMultiplier[freq];
  totalPrice = Math.round(totalPrice * 100) / 100;

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();

  // Send individual variables to EmailJS
  emailjs.send("entretien-rjs", "template_f6rvobd", {
    name: name,
    email: email,
    phone: phone,
    message: message,
    vehicles: vehicles.join(", "),
    service: service,
    frequency: freq,
    quantity: quantities.join(", "),
    price: `$${totalPrice.toFixed(2)}`
  }).then(function(response) {
    alert("Your request has been sent successfully! We'll contact you shortly.");
    document.getElementById('truck-form').reset();
    document.getElementById('price-result').innerText = '';
  }, function(error) {
    console.error("FAILED...", error);
    console.log(error.text);
    alert("There was an error sending your request.");
  });
});