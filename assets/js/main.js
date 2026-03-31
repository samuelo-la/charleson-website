const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden", isOpen);
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
  });

  document.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Smooth scroll for internal anchors with sticky header offset.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    const headerOffset = 92;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  });
});

// Lightweight reveal animation; disables motion for users who request less motion.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const revealItems = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px"
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const heroBg = document.querySelector("[data-hero-bg]");
  if (heroBg) {
    let ticking = false;

    const updateHeroParallax = () => {
      const y = window.scrollY || window.pageYOffset;
      const offset = -Math.min(36, y * 0.12);
      heroBg.style.setProperty("--hero-parallax", `${offset}px`);
      ticking = false;
    };

    updateHeroParallax();

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateHeroParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
  }
} else {
  document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
}

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const contactNotice = document.getElementById("contactNotice");
if (contactNotice) {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("contactStatus");

  const noticeMap = {
    success: {
      text: "Message sent successfully. We'll get back to you shortly.",
      classes: ["border-mint-500/70", "bg-mint-500/10", "text-mint-500"]
    },
    invalid: {
      text: "Please fill in all required fields and try again.",
      classes: ["border-teal-700/60", "bg-teal-700/15", "text-white"]
    },
    error: {
      text: "We could not send your message right now. Please try again shortly.",
      classes: ["border-teal-700/60", "bg-teal-700/15", "text-white"]
    }
  };

  if (status && noticeMap[status]) {
    const selectedNotice = noticeMap[status];
    contactNotice.textContent = selectedNotice.text;
    contactNotice.classList.remove("hidden");
    contactNotice.classList.add(...selectedNotice.classes);

    window.setTimeout(() => {
      contactNotice.classList.add("hidden");
      contactNotice.textContent = "";
    }, 5000);

    const cleanUrl = `${window.location.pathname}${window.location.hash || ""}`;
    window.history.replaceState({}, document.title, cleanUrl);
  }
}
