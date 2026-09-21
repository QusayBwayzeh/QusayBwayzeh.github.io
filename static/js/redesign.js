(function () {
  "use strict";

  // ---------- Mobile nav toggle ----------
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- Role rotator ----------
  var roleEl = document.getElementById("heroRole");
  if (roleEl) {
    var roles = [
      "Technical Team Leader",
      "Senior Software Engineer",
      "Creative Full-Stack Developer",
      "Solutions Architect",
      "AI-Assisted Developer",
      "Professional Technical Trainer"
    ];
    var roleIndex = 0;
    setInterval(function () {
      roleIndex = (roleIndex + 1) % roles.length;
      roleEl.style.opacity = 0;
      setTimeout(function () {
        roleEl.textContent = roles[roleIndex];
        roleEl.style.opacity = 1;
      }, 200);
    }, 2400);
  }

  // ---------- Animated counters (run once, when scrolled into view) ----------
  function animateValue(el, target, duration) {
    var start = performance.now();
    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll("[data-count-to]");
  if (counters.length) {
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var el = entry.target;
              var target = parseInt(el.getAttribute("data-count-to"), 10) || 0;
              animateValue(el, target, 900);
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      counters.forEach(function (el) {
        var target = parseInt(el.getAttribute("data-count-to"), 10) || 0;
        el.textContent = target;
      });
    }
  }

  // ---------- Contact form ----------
  var form = document.getElementById("ContactForm");
  if (form) {
    var alertSuccess = document.getElementById("alertSuccess");
    var alertError = document.getElementById("alertError");
    var submitBtn = document.getElementById("ContactBtn");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      submitBtn.disabled = true;
      alertSuccess.classList.remove("is-visible");
      alertError.classList.remove("is-visible");

      var name = "WSC: " + document.getElementById("name").value.trim();
      var message = document.getElementById("message").value.trim();
      var email = document.getElementById("email").value.trim();

      var requestData = {
        name: name,
        justification: message,
        mobileNumber: email
      };

      fetch("https://requestcv.runasp.net/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      })
        .then(function (response) {
          if (response.ok) {
            alertSuccess.textContent = "Thank you, we will contact you soon.";
            alertSuccess.classList.add("is-visible");
            form.reset();
          } else {
            alertError.textContent = "Failed to send, please try again later.";
            alertError.classList.add("is-visible");
          }
        })
        .catch(function () {
          alertError.textContent = "Network error, please try again later.";
          alertError.classList.add("is-visible");
        })
        .finally(function () {
          submitBtn.disabled = false;
        });
    });
  }

  // ---------- Footer year ----------
  var yearEl = document.getElementById("footerYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
