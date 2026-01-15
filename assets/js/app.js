import headerAnimations from "./animations/headerAnimations.js";
import geoMapAnimation from './animations/geo_map.js';
import aboutUsHeader from './animations/about_us_header.js';
import homeHeader from './animations/home_header.js';
import workFlowAnimation from './animations/work_flow_animation.js';
import InspectionAnimation from './animations/inspection_animation.js';
import initClientLogos from './animations/client-logos.js';


const counterUp = window.counterUp.default;

document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello World!");
  initLibs();
  console.log("Bye World!");
  counters();

});


function counters() {

  // var $counters = $(".counter");
  var counters = document.querySelectorAll('.counter');
  /* Start counting, do this on DOM ready or with Waypoints. */
  if (counters.length > 0) {
    counters.forEach(function (counter, i) {
      var wp = new Waypoint({
        element: counter,
        handler: function () {
          counterUp(counter, {
            // duration: 2000,
            // delay: 16
          });
          // this.destroy();
        },
        offset: 'bottom-in-view',
      });
    });
  }

}
function contactForm() {
  document.getElementById("contact_form").addEventListener("submit", function (event) {
    console.log("contact_form submit");
    const form = document.getElementById("contact_form");
    const successMessage = document.getElementById("form-success");

    // Validate phone number before submitting
    if (!validatePhoneNumber()) {
      event.preventDefault();
      return false;
    }

    grecaptcha.ready(function () {
      grecaptcha.execute('6Lf0VbYZAAAAANiqgtzCtW5lzQAe2ijDiVcZpSn8', { action: 'contact' }).then(function (token) {
        // Add your logic to submit to your backend server here.
        if (form.dataset.submitted === "true") {
          event.preventDefault();
          return false;
        }


        var input = document.createElement("input");
        input.type = "hidden";
        input.name = "new_google_recaptcha_token";
        input.value = token;
        form.appendChild(input);


        form.dataset.submitted = "true";
        const formData = new FormData(form);
        // formData.forEach((value, key) => {
        //   console.log(`Form field: ${key} = ${value}`);
        // });
        const phoneInput = document.getElementById("phone");
        if (typeof iti !== 'undefined' && iti.getNumber) {
          // const countryData = iti.getSelectedCountryData();
          // console.log('country data', countryData, countryData.dialCode );
          phoneInput.value = iti.getNumber();
        } else {
          console.warn("The 'iti' instance is not defined or 'getNumber' method is not available.");
        }

        const serializedData = new URLSearchParams(formData).toString();
        console.log("Serialized form data:", serializedData);

        document.querySelectorAll(".waiting").forEach(el => el.style.display = "block");

        fetch(
          // "http://localhost:3000/api/contact",
          "https://happytenant.app/api/contact",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8;application/json"
            },
            body: serializedData
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {

            document.querySelectorAll(".waiting").forEach(el => el.style.display = "none");


            successMessage.style.display = "block";
            setTimeout(() => {
              successMessage.style.display = "none";
            }, 2000);


            // document.getElementById("form-response").innerHTML = data.message;
            // toast.show();
            document.getElementById("form-response").classList.remove("hidden");

            console.log("calling gtag_report_conversion");


            gtag('event', 'conversion', { 'send_to': 'AW-11118350238/gfSuCMXCq5IYEJ6f0rUp' });


            form.reset();
            form.insertAdjacentHTML('beforeend', '<img src="https://ct.capterra.com/capterra_tracker.gif?vid=2202696&vkey=add0778148334141fdafe64f8e440db0" />');
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          })
          .finally(() => {

            form.dataset.submitted = "false";
          });
      });
    });
    event.preventDefault();
  });
}

var awardsSlider = new Swiper(".awards-swiper", {
  // loop: true,
  autoHeight: true,
  slidesPerView: 3,
  spaceBetween: 0,
  // freeMode: true,
  // observeParents: true,
  // centeredSlides: true,
  roundLengths: true,
  grabCursor: true,
  slidesPerGroup: 2,
  // mousewheel: {
  //   releaseOnEdges: true,
  // },
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: false,
    clickable: true
  },
  breakpoints: {
    280: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    1000: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});



function loadSvg() {
  var elements = document.querySelectorAll(".load_svg");

  elements.forEach(function (element) {
    var src = element.getAttribute("src");

    fetch(src)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then(data => {
        var parser = new DOMParser();
        var svgDoc = parser.parseFromString(data, "image/svg+xml");
        element.parentNode.replaceChild(svgDoc.documentElement, element);

        // Check if there are elements with class "geo_map" and call geoMapAnimation
        if (document.querySelectorAll(".geo_map").length > 0 && element.classList.contains("geo_map_svg")) {
          setTimeout(() => {
            geoMapAnimation();
          }, 100);
        }

        if (document.querySelectorAll(".workflow_container").length > 0 && element.classList.contains("fm_workflow_svg")) {
          setTimeout(() => {
            workFlowAnimation();
          }, 100);
        }

        if (document.querySelectorAll(".workflow_container").length > 0 && element.classList.contains("inspections_workflow_svg")) {
          setTimeout(() => {
            InspectionAnimation();
          }, 100);
        }

      })
      .catch(error => {
        console.error("Error fetching SVG:", error);
      });
  });
}

function initLibs() {
  // console.log('initLibs');
  setTimeout(() => {

    // headerAnimations();
    if (document.querySelector('.about_us_header')) {
      aboutUsHeader();
    }
    if (document.querySelector('.header')) {
      homeHeader();
    }
    testimonialSwiper();
    loadSvg();
    aiRequest();
    contactForm();


    AOS.init();
    // var scrollToElements = document.querySelectorAll("[data-scrollto]");
    // if (scrollToElements.length > 0) {
    //   ui_scroll_to();
    // }

  }, 100);


}

function testimonialSwiper() {
  var swiperTestimonials = new Swiper(".swiper-testimonials", {
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,
    slideToClickedSlide: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

function aiRequest() {
  const form = document.getElementById('openai-form');
  if (!form) return;

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const prompt = document.getElementById('prompt').value;

    try {
      const response = await fetch('http://localhost:3000/ai/openai/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await response.json();
      console.log(data);
      const content = data.response.choices[0].message.content;
      typeWriterEffect(content, document.getElementById('response'));
    } catch (error) {
      console.error('Error:', error);
    }
  });
}





var swiper = new Swiper(".swiper-benefits", {
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    768: {
      slidesPerView: 1,
      spaceBetween: 20
    },

    1024: {
      slidesPerView: 2,
      spaceBetween: 40
    },

    1280: {
      slidesPerView: 3,
      spaceBetween: 50
    }
  }
});


var swiper = new Swiper(".mySwiper", {
  spaceBetween: 10,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesProgress: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});

var swiper2 = new Swiper(".mySwiper2", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});

function typeWriterEffect(text, element) {
  element.innerHTML = '';
  let i = 0;

  function type() {
    if (i < text.length) {
      let char = text.charAt(i);
      if (char === '\n') {
        element.innerHTML += '<br/>';
      } else if (char === ' ') {
        element.innerHTML += '&nbsp;';
      } else {
        element.innerHTML += char;
      }
      i++;
      setTimeout(type, 50);
    }
  }

  type();
}

// contactfeild data

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('country-select').addEventListener('click', function () {
    fetch('/countries.json')
      .then(response => response.json())
      .then(countries => {
        const dropdown = document.getElementById('country-select');
        countries.forEach(country => {
          let option = document.createElement('option');
          option.value = country.name;
          option.setAttribute('data-code', country.code);
          option.textContent = country.name;
          dropdown.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error loading countries:', error);
      });
  });
});

const countrySelect = document.querySelector("#country-select");
countrySelect.addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  const selectedCountryCode = selectedOption.getAttribute("data-code");
  if (selectedCountryCode) {
    iti.setCountry(selectedCountryCode);
  }
});



const input = document.querySelector("#phone");
const iti = window.intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function (callback) {
    fetch('//ip-api.com/json/')
      .then(response => response.json())
      .then(data => {
        callback(data.countryCode);
      })
      .catch(function () { callback('ae'); });
  },
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});

// Add phone number validation
function validatePhoneNumber() {
  const phoneInput = document.querySelector("#phone");
  const errorMsg = document.querySelector("#phone-error");
  
  // Remove any existing error styling
  phoneInput.classList.remove("error");
  
  // Check if phone number is valid
  if (phoneInput.value.trim()) {
    if (iti.isValidNumber()) {
      // Valid number
      phoneInput.classList.remove("error");
      if (errorMsg) {
        errorMsg.style.display = "none";
      }
      return true;
    } else {
      // Invalid number
      phoneInput.classList.add("error");
      if (errorMsg) {
        errorMsg.textContent = "Please enter a valid phone number for the selected country";
        errorMsg.style.display = "block";
      }
      return false;
    }
  } else {
    // Empty field
    phoneInput.classList.remove("error");
    if (errorMsg) {
      errorMsg.style.display = "none";
    }
    return true; // Allow empty field, you can change this to false if phone is required
  }
}

// Add real-time validation on input
input.addEventListener('input', validatePhoneNumber);
input.addEventListener('blur', validatePhoneNumber);

// Add validation on country change
input.addEventListener('countrychange', function() {
  // Clear the input when country changes to avoid confusion
  input.value = '';
  validatePhoneNumber();
});


// Clinet slider

var swiperClients = new Swiper(".clinet-slider", {
  spaceBetween: 30,
  slidesPerView: 5,
  loop: true,
  slideToClickedSlide: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  speed: 3000,
  freeMode: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
   
    320: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 30,
      speed: 5000,
      grid: {
        fill: 'row',
        rows: 2
      },
    },
  
    480: {
      slidesPerView: 3,
      spaceBetween: 30,
      grid: {
        fill: 'row',
        rows: 2
      },
    },
   
    768: {
      slidesPerView: 5,
      spaceBetween: 25,

      grid: {
        fill: 'row',
        rows: 2
      },
    },
   
    1024: {
      slidesPerView: 5,
      spaceBetween: 20,

      grid: {
        fill: 'row',
        rows: 2
      },
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true, 
  },
});




document.addEventListener('DOMContentLoaded', function () {
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      targetElement.scrollIntoView();
    }
  }
});


  initClientLogos();

