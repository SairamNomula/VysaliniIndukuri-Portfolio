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
   * Initiate Pure Counter
   */
  new PureCounter();

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
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

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

  // Developer Credit Visibility
  function handleDeveloperCredit() {
    const credit = document.querySelector('.developer-credit');
    let isVisible = false;
    let clickCount = 0;
    let lastClickTime = 0;

    document.addEventListener('click', (e) => {
      const currentTime = new Date().getTime();
      
      // Reset click count if more than 1 second has passed
      if (currentTime - lastClickTime > 1000) {
        clickCount = 0;
      }
      
      clickCount++;
      lastClickTime = currentTime;

      // Show credit after 5 clicks within 1 second
      if (clickCount >= 5) {
        isVisible = !isVisible;
        credit.style.display = isVisible ? 'block' : 'none';
        clickCount = 0;
      }
    });
  }

  // Initialize developer credit handler
  handleDeveloperCredit();

})();

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 2000,
  reset: true
});

/* Scroll */
// sr.reveal('.about__typing',{delay: 400});

// var typed = new Typed(".typing", {
//   strings: ["Project Manager", "Designer", "Supply Chain Manager" , "Business Analyst", "Quality Assurance Manager", "Product Manager"],
//   typeSpeed: 70,
//   backSpeed: 40,
//   loop: true
// });

// Initialize AOS
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
  mirror: false,
  offset: 100
});

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const headerOffset = 100;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Section visibility animation
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section:not(.hero):not(.footer)');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeToggle.innerHTML = isDark ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme === 'dark');
} else {
  setTheme(prefersDarkScheme.matches);
}

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  setTheme(!isDark);
});

// Form validation and submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Basic form validation
    const formData = new FormData(contactForm);
    let isValid = true;
    
    for (let [key, value] of formData.entries()) {
      if (!value.trim()) {
        isValid = false;
        const input = contactForm.querySelector(`[name="${key}"]`);
        input.classList.add('is-invalid');
      }
    }
    
    if (!isValid) {
      return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      const successAlert = document.createElement('div');
      successAlert.className = 'alert alert-success mt-3';
      successAlert.textContent = 'Message sent successfully!';
      contactForm.appendChild(successAlert);
      
      // Reset form
      contactForm.reset();
      
      // Remove success message after 3 seconds
      setTimeout(() => {
        successAlert.remove();
      }, 3000);
    } catch (error) {
      // Show error message
      const errorAlert = document.createElement('div');
      errorAlert.className = 'alert alert-danger mt-3';
      errorAlert.textContent = 'Failed to send message. Please try again.';
      contactForm.appendChild(errorAlert);
      
      // Remove error message after 3 seconds
      setTimeout(() => {
        errorAlert.remove();
      }, 3000);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
  
  // Remove invalid class on input
  contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('is-invalid');
    });
  });
}

// Skill items animation
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    gsap.to(item, {
      y: -5,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  item.addEventListener('mouseleave', () => {
    gsap.to(item, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});

// Hero section parallax effect
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
  });
}

// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: index * 0.2
  });
});

// Project cards animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: index * 0.2
  });
});

// Featured items animation
const featuredItems = document.querySelectorAll('.featured-item');
featuredItems.forEach((item, index) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: index * 0.2
  });
});

// Cursor interactions
document.addEventListener('mousedown', () => {
  cursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
  cursor.classList.remove('active');
});

// Add cursor effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .featured-card, .project-card, .skill-item, .nav-link');
interactiveElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
  });
  element.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
  });
});

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Enhanced scroll animations
gsap.utils.toArray('section').forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1
    }
  });
});

// Skills Section Animations
function initSkillsSection() {
  const skillCards = document.querySelectorAll('.skill-card');
  const skillProgresses = document.querySelectorAll('.skill-progress');

  // Animate skill progress bars
  skillProgresses.forEach(progress => {
    const level = progress.getAttribute('data-level');
    progress.style.width = `${level}%`;
  });

  // Add hover effects and tooltips
  skillCards.forEach(card => {
    const skill = card.getAttribute('data-skill');
    const level = card.querySelector('.skill-progress').getAttribute('data-level');

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.innerHTML = `
      <div class="tooltip-content">
        <h4>${skill}</h4>
        <p>Proficiency: ${level}%</p>
      </div>
    `;
    card.appendChild(tooltip);

    // Add hover effects
    card.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'translateY(0)';
    });

    card.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
      tooltip.style.transform = 'translateY(10px)';
    });
  });

  // Add parallax effect to skill icons
  skillCards.forEach(card => {
    const icon = card.querySelector('.skill-icon');
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      icon.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px) rotate(${deltaX * 5}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      icon.style.transform = 'translate(0, 0) rotate(0)';
    });
  });
}

// Initialize skills section when it's in view
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        initSkillsSection();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(skillsSection);
}

// Add CSS for tooltips
const style = document.createElement('style');
style.textContent = `
  .skill-tooltip {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background: var(--background-color);
    padding: 10px 15px;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    z-index: 1000;
  }

  .skill-tooltip::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--background-color);
  }

  .tooltip-content h4 {
    margin: 0;
    color: var(--text-color);
    font-size: 0.9rem;
  }

  .tooltip-content p {
    margin: 5px 0 0;
    color: var(--text-light);
    font-size: 0.8rem;
  }
`;
document.head.appendChild(style);

// Loading Screen
window.addEventListener('load', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 1500);
});

// Image Carousel
document.addEventListener('DOMContentLoaded', function() {
  const carousels = document.querySelectorAll('.image-carousel');
  
  carousels.forEach(carousel => {
    const items = carousel.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function showNextImage() {
      // Remove active class from current image
      items[currentIndex].classList.remove('active');
      
      // Move to next image
      currentIndex = (currentIndex + 1) % items.length;
      
      // Add active class to new image
      items[currentIndex].classList.add('active');
    }

    // Initialize first image
    if (items.length > 0) {
      // Show first image
      items[0].classList.add('active');
      
      // Start the carousel
      setInterval(showNextImage, 3000);
    }
  });
});