// toggle background slide active
const slideNavigator = (name) => {
    let slides = document.querySelectorAll('.bg-slide');
    slides.forEach((slide) => {
        slide.classList.remove('active');
        if (slide.classList.contains(name)) {
            slide.classList.add('active');
        }
    });
};

// switch background slides on click
window.addEventListener('load', () => {
    const slideBtnList = document.querySelectorAll('.slide-btn');
    slideBtnList.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            slideBtnList.forEach((el) => el.classList.remove('active'));
            this.classList.add('active');
            slideNavigator(this.getAttribute('data-target'));
        });
    });
});

// activate the requested section
const sectionNavigator = (name) => {
    let sections = document.querySelectorAll('section');
    let header = document.querySelector('header');

    // Hide all sections
    sections.forEach((section) => {
        section.classList.remove('section-show');
    });

    // Show selected section or reset if 'home'
    if (name === 'home') {
        resetHeader();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        document.querySelectorAll('section').forEach(section => {
        section.classList.remove('section-show');
        });

        document.querySelectorAll('.bg-slide').forEach(slide => slide.classList.remove('active'));
        document.querySelector('.bg-slide.slide-1')?.classList.add('active');

        document.querySelectorAll('.slide-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.slide-btn[data-target="slide-1"]')?.classList.add('active');

        return; // Stop further execution
} else {
        let section = document.getElementById(name);
        if (section) {
            section.classList.add('section-show');
            header.classList.add('activate');
        }
    }
};


// bind nav button functionality for both desktop and mobile
window.addEventListener('load', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove 'active' from all nav buttons (both menus)
            document.querySelectorAll('.nav-btn').forEach((el) =>
                el.classList.remove('active')
            );
            this.classList.add('active');

            // Navigate to section
            const target = this.getAttribute('data-target');
            if (target) {
                sectionNavigator(target);
            }

            // Close mobile menu if on small screen
            if (window.innerWidth < 768) {
                toggleMenu();
            }
        });
    });
});

// reset header background to initial state
const resetHeader = () => {
    let header = document.querySelector('header');
    header.classList.remove('active');
};

// default navigation to 'about' section
const initNavigation = () => {
    const navList = document.querySelectorAll('.nav-btn');
    navList.forEach((el) => {
        el.classList.remove('active');
        if (el.getAttribute('data-target') === 'about') {
            el.classList.add('active');
        }
    });
    sectionNavigator('about');
};

// toggle mobile menu visibility
const toggleMenu = () => {
    const menu = document.querySelector('.menu');
    const navMobile = document.querySelector('.nav-mobile');
    menu.classList.toggle('active');
    navMobile.classList.toggle('active');
};

// Auto-scroll through banner slides while still allowing manual control
(function () {
  const slides = document.querySelectorAll(".bg-slide");
  const buttons = document.querySelectorAll(".slide-btn");
  let current = 0;
  let intervalId;

  const activateSlide = (index) => {
    slides.forEach((slide) => slide.classList.remove("active"));
    buttons.forEach((btn) => btn.classList.remove("active"));
    slides[index].classList.add("active");
    buttons[index].classList.add("active");
    current = index;
  };

  const nextSlide = () => {
    let next = (current + 1) % slides.length;
    activateSlide(next);
  };

  const startAutoScroll = () => {
    intervalId = setInterval(nextSlide, 6000); // 6 seconds per slide
  };

  const stopAutoScroll = () => {
    clearInterval(intervalId);
  };

  // Manual control
  buttons.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      activateSlide(index);
      stopAutoScroll();
      startAutoScroll();
    });
  });

  window.addEventListener("load", () => {
    activateSlide(current);
    startAutoScroll();
  });
})();
