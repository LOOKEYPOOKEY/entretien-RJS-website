(function() {
  "use strict";

  /* Apply .scrolled class to the body as the page is scrolled down */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /* Mobile nav toggle */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /* Hide mobile nav on same-page/hash links */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /* Toggle mobile nav dropdowns */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /* Preloader */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /* Scroll top button */
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

  /* Animation on scroll function and init */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /* Initiate glightbox */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /* Initiate Pure Counter */
  new PureCounter();

  /* Init swiper sliders */
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

  /* Correct scrolling position upon page load for URLs containing hash links. */
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

  // Navmenu Scrollspy
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

// === VEHICLE CLEANING ESTIMATION SCRIPT ===

// === COLLAPSIBLE INFO BOX ===
function toggleInfoBox(lang) {
  if (lang === 'en') {
    document.getElementById('infoContentEn').classList.toggle('open');
  } else {
    document.getElementById('infoContentFr').classList.toggle('open');
  }
}

function showInfoForLang(lang) {
  const enBox = document.getElementById("info-en");
  const frBox = document.getElementById("info-fr");
  const enContent = document.getElementById("infoContentEn");
  const frContent = document.getElementById("infoContentFr");

// If any of the required elements do not exist on this page, stop here
  if (!enBox || !frBox || !enContent || !frContent) {
    return;
  }

  if (lang === "fr") {
    enBox.style.display = "none";
    frBox.style.display = "block";
  } else {
    enBox.style.display = "block";
    frBox.style.display = "none";
  }

// Always close boxes when switching languages
  enContent.classList.remove("open");
  frContent.classList.remove("open");
}

// === MAIN LANGUAGE SWITCH SYSTEM ===
function setLanguage(lang) {
  // Store selected language (optional)
  localStorage.setItem("site-lang", lang);

  // Update HTML lang attribute (good for SEO)
  document.documentElement.setAttribute("lang", lang);

  // IMPORTANT: This is the line that makes the collapsible switch
  showInfoForLang(lang);
}

// === AUTO-DETECT LANGUAGE ON PAGE LOAD ===
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("site-lang") || "en";
  setLanguage(savedLang);
});

// --- PRICE TABLE ---
const priceTable = {
  bronze: {
    small: { "1-2": 75, "3-5": 65, "6-10": 60, "11-20": 55 },
    medium: { "1-2": 80, "3-5": 70, "6-10": 65, "11-20": 60 },
    large: { "1-2": 85, "3-5": 75, "6-10": 70, "11-20": 65 },
    "xl-notipper": { "1-2": 100, "3-5": 90, "6-10": 85, "11-20": 80 },
    "xl-tipper": { "1-2": 115, "3-5": 100, "6-10": 95, "11-20": 90 },
    box: { "1-2": 95, "3-5": 85, "6-10": 80, "11-20": 75 }
  },
  silver: {
    small: { "1-2": 90, "3-5": 80, "6-10": 75, "11-20": 70 },
    medium: { "1-2": 100, "3-5": 90, "6-10": 85, "11-20": 80 },
    large: { "1-2": 110, "3-5": 100, "6-10": 95, "11-20": 90 },
    "xl-notipper": { "1-2": 125, "3-5": 115, "6-10": 110, "11-20": 105 },
    "xl-tipper": { "1-2": 140, "3-5": 125, "6-10": 120, "11-20": 115 },
    box: { "1-2": 130, "3-5": 115, "6-10": 110, "11-20": 105 }
  }
};

const vehicleNames = {
  small: "Small (Sedan, Hatchback)",
  medium: "Medium (SUV, Mini-Van)",
  large: "Large (Pickup Truck)",
  "xl-notipper": "Extra Large (Semi without Tipper)",
  "xl-tipper": "Extra Large (Semi with Tipper)",
  box: "Box Truck (≤26 feet)"
};

// --- FREQUENCY DISCOUNT MULTIPLIERS ---
const frequencyMultiplier = {
  oneTime: 1,
  weekly: 1,
  biweekly: 1,
  monthly: 1
};

// --- HELPER FUNCTION: DETERMINE GROUP BASED ON QUANTITY ---
function getQuantityGroup(qty) {
  if (qty >= 1 && qty <= 2) return "1-2";
  if (qty >= 3 && qty <= 5) return "3-5";
  if (qty >= 6 && qty <= 10) return "6-10";
  if (qty >= 11 && qty <= 20) return "11-20";
  return null;
}

// === MAIN CALCULATION FUNCTION ===
function calculateEstimate() {
  const serviceType = document.getElementById("service-type").value; // bronze/silver
  const frequency = document.getElementById("frequency").value;
  const vehicleCheckboxes = document.querySelectorAll('input[name="vehicle"]:checked');
  const resultDiv = document.getElementById("price-result");

  if (!vehicleCheckboxes.length) {
    alert("Please select at least one vehicle type.");
    return;
  }

  let total = 0;
  let summary = [];
  let vehicles = [];
  let quantities = [];

  vehicleCheckboxes.forEach(vehicle => {
    const type = vehicle.value;
    console.log(`Processing vehicle type: ${type}`);
    const qtyInput = document.querySelector(`select[name="${type}-qty"]`);
    if (!qtyInput) {
      console.error(`Quantity input not found for vehicle type: ${type}`);
      console.log('Available inputs:', document.querySelectorAll('input'));
      return;
    }
    const qty = parseInt(qtyInput.value) || 0;

    if (qty > 0) {
      const qtyGroup = getQuantityGroup(qty);
      if (!qtyGroup) return;

      const pricePerVehicle = priceTable[serviceType][type][qtyGroup];
      const subtotal = pricePerVehicle * qty;

      total += subtotal;
      vehicles.push(type);
      quantities.push(qty);
      summary.push(`${type} x${qty} (${pricePerVehicle}$/ea)`);
    }
  });

  total *= frequencyMultiplier[frequency];
  total = Math.round(total * 100) / 100;

  resultDiv.innerText = `Total: $${total.toFixed(2)}`;
  resultDiv.dataset.summary = `
Service: ${serviceType.toUpperCase()}
Frequency: ${frequency}
Vehicles: ${summary.join(", ")}
Total: $${total.toFixed(2)}
  `.trim();
}

// === BUTTON LISTENER FOR CALCULATION ===
const calculateBtn = document.getElementById("calculate-btn");
if (calculateBtn) {
    calculateBtn.addEventListener("click", calculateEstimate);
}

// === EMAILJS FORM SUBMISSION ===
const truckForm = document.getElementById("truck-form");

if (truckForm) {
  truckForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const serviceType = document.getElementById("service-type").value;
    const frequency = document.getElementById("frequency").value;
    const vehicleCheckboxes = document.querySelectorAll('input[name="vehicle"]:checked');

    let totalPrice = 0;
    let vehicles = [];
    let quantities = [];
    let summary = [];

    vehicleCheckboxes.forEach(vehicle => {
      const type = vehicle.value;
      const qtyInput = document.querySelector(`select[name="${type}-qty"]`);
      const qty = parseInt(qtyInput.value) || 0;

      if (qty > 0) {
        const qtyGroup = getQuantityGroup(qty);
        const pricePerVehicle = priceTable[serviceType][type][qtyGroup];
        const subtotal = pricePerVehicle * qty;
        totalPrice += subtotal;

        vehicles.push(type);
        quantities.push(qty);
        summary.push(`${type} x${qty} (${pricePerVehicle}$/ea)`);
      }
    });

  totalPrice *= frequencyMultiplier[frequency];
  totalPrice = Math.round(totalPrice * 100) / 100;
  
  // === BUILD VEHICLE SUMMARY FOR EMAIL ===
  let vehicleSummary = "";

  for (let i = 0; i < vehicles.length; i++) {
    const fullName = vehicleNames[vehicles[i]] || vehicles[i];
    vehicleSummary += `${quantities[i]} ${fullName}`;
    if (i < vehicles.length - 1) vehicleSummary += ", ";
  }

  // === CONTACT INFO ===
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  // === EMAILJS SEND ===
  emailjs.send("entretien-rjs", "template_f6rvobd", {
    name: name,
    email: email,
    phone: phone,
    message: message,
    vehicleSummary: vehicleSummary,
    service: serviceType.toUpperCase(),
    frequency: frequency,
    summary: summary.join(", "),
    total_price: `$${totalPrice.toFixed(2)}`
  }).then(
    function(response) {
      alert("Your request has been sent successfully! We'll contact you shortly.");
      truckForm.reset();
      document.getElementById("price-result").innerText = '';
    },
    function(error) {
      console.error("FAILED...", error);
      alert("There was an error sending your request. Please try again.");
    }
  );
});
}