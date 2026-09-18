
document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right, .reveal-scale"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });



    /* =====================================================
       STAGGERED CARD ANIMATION
    ===================================================== */

    const staggerGroups =
        document.querySelectorAll(".row");


    const staggerObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting)
                        return;


                    const items =
                        entry.target.querySelectorAll(
                            ".stagger-item"
                        );


                    items.forEach(
                        (item, index) => {

                            item.style.transitionDelay =
                                `${index * 120}ms`;

                            item.classList.add(
                                "is-visible"
                            );

                        }
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.08
            }
        );


    staggerGroups.forEach((group) => {

        if (
            group.querySelector(
                ".stagger-item"
            )
        ) {

            staggerObserver.observe(
                group
            );

        }

    });



    /* =====================================================
       ANIMATED COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(
            ".stat-number"
        );


    const animateCounter =
        (element) => {

            const target =
                Number(
                    element.dataset.target
                );

            const suffix =
                element.dataset.suffix || "";


            const duration = 1500;

            const startTime =
                performance.now();


            const update =
                (currentTime) => {

                    const progress =
                        Math.min(
                            (
                                currentTime -
                                startTime
                            ) / duration,
                            1
                        );


                    /* Ease-out */
                    const easedProgress =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );


                    const currentValue =
                        Math.floor(
                            target *
                            easedProgress
                        );


                    element.textContent =
                        currentValue
                            .toLocaleString() +
                        suffix;


                    if (progress < 1) {

                        requestAnimationFrame(
                            update
                        );

                    } else {

                        element.textContent =
                            target
                                .toLocaleString() +
                            suffix;

                    }

                };


            requestAnimationFrame(
                update
            );

        };


    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        animateCounter(
                            entry.target
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach((counter) => {

        counterObserver.observe(
            counter
        );

    });



    /* =====================================================
       NAVBAR SHADOW
    ===================================================== */

    const navbar =
        document.querySelector(
            ".navbar"
        );


    const updateNavbar =
        () => {

            if (
                window.scrollY > 30
            ) {

                navbar.classList.add(
                    "navbar-scrolled"
                );

            } else {

                navbar.classList.remove(
                    "navbar-scrolled"
                );

            }

        };


    updateNavbar();


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".navbar .nav-link[data-section]"
        );


    const sections = [];


    navLinks.forEach((link) => {

        const id =
            link.dataset.section;


        const section =
            document.getElementById(id);


        if (section) {

            sections.push({
                id: id,
                element: section
            });

        }

    });


    const updateActiveNav =
        () => {

            let current = "top";


            const scrollPosition =
                window.scrollY + 150;


            sections.forEach(
                ({ id, element }) => {

                    if (
                        scrollPosition >=
                        element.offsetTop
                    ) {

                        current = id;

                    }

                }
            );


            navLinks.forEach((link) => {

                link.classList.toggle(
                    "active",
                    link.dataset.section ===
                    current
                );

            });

        };


    updateActiveNav();


    window.addEventListener(
        "scroll",
        updateActiveNav,
        {
            passive: true
        }
    );



    /* =====================================================
       SMOOTH NAVIGATION
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target)
                        return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });


                    /* Close mobile menu */

                    const navbarCollapse =
                        document.getElementById(
                            "mainNavbar"
                        );


                    if (
                        navbarCollapse &&
                        navbarCollapse.classList.contains(
                            "show"
                        )
                    ) {

                        const collapse =
                            bootstrap.Collapse
                                .getInstance(
                                    navbarCollapse
                                ) ||
                            new bootstrap.Collapse(
                                navbarCollapse,
                                {
                                    toggle: false
                                }
                            );


                        collapse.hide();

                    }

                }
            );

        });



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    const updateBackToTop =
        () => {

            if (
                window.scrollY > 500
            ) {

                backToTop.classList.add(
                    "show"
                );

            } else {

                backToTop.classList.remove(
                    "show"
                );

            }

        };


    updateBackToTop();


    window.addEventListener(
        "scroll",
        updateBackToTop,
        {
            passive: true
        }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );



    /* =====================================================
       NEWSLETTER
    ===================================================== */

    const newsletterForm =
        document.querySelector(
            ".newsletter-form"
        );


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const input =
                    newsletterForm.querySelector(
                        "input[type='email']"
                    );


                if (
                    !input.value.trim()
                ) {

                    input.focus();

                    return;

                }


                alert(
                    "Thank you for subscribing."
                );


                newsletterForm.reset();

            }
        );

    }



    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForms =
        document.querySelectorAll(
            "#contact form"
        );


    contactForms.forEach((form) => {

        form.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                if (
                    !form.checkValidity()
                ) {

                    form.classList.add(
                        "was-validated"
                    );

                    return;

                }


                const button =
                    form.querySelector(
                        "button[type='submit']"
                    );


                const originalText =
                    button.innerHTML;


                button.disabled = true;


                button.innerHTML =
                    `<span
                        class="spinner-border
                        spinner-border-sm
                        me-2">
                    </span>
                    Sending...`;


                setTimeout(() => {

                    button.innerHTML =
                        `<i
                            class="bi
                            bi-check-circle
                            me-2">
                        </i>
                        Message Sent`;


                    button.classList.remove(
                        "btn-success"
                    );


                    button.classList.add(
                        "btn-dark"
                    );


                    form.reset();


                    setTimeout(() => {

                        button.disabled =
                            false;


                        button.innerHTML =
                            originalText;


                        button.classList.remove(
                            "btn-dark"
                        );


                        button.classList.add(
                            "btn-success"
                        );

                    }, 2500);


                }, 1200);

            }
        );

    });


    /* =====================================================
       RESPONSIVE ACTIVITIES CAROUSEL
       Desktop: 3 | Tablet: 2 | Mobile: 1
       Moves ONE activity at a time
    ===================================================== */

    const activityTrack =
        document.querySelector(".activities-track");

    const activitySlides =
        document.querySelectorAll(".activity-slide");

    const activityNext =
        document.querySelector(".activities-next");

    const activityPrev =
        document.querySelector(".activities-prev");

    const activityDots =
        document.querySelector(".activities-dots");


    if (
        activityTrack &&
        activitySlides.length &&
        activityNext &&
        activityPrev &&
        activityDots
    ) {

        let activityIndex = 0;
        let activityItemsPerView = 3;
        let activityAutoSlide;


        /* Get the number of visible cards */

        function getActivityItemsPerView() {

            if (window.innerWidth <= 767) {
                return 1;
            }

            if (window.innerWidth <= 991) {
                return 2;
            }

            return 3;

        }


        /* Maximum position */

        function getActivityMaxIndex() {

            return Math.max(
                0,
                activitySlides.length -
                activityItemsPerView
            );

        }


        /* Move the track */

        function moveActivities() {

            if (!activitySlides[0]) return;

            const slideWidth =
                activitySlides[0].getBoundingClientRect().width;

            activityTrack.style.transform =
                `translate3d(-${activityIndex * slideWidth}px, 0, 0)`;

            updateActivityDots();

        }


        /* Create indicator dots */

        function createActivityDots() {

            activityDots.innerHTML = "";

            const totalPositions =
                getActivityMaxIndex() + 1;


            for (
                let i = 0;
                i < totalPositions;
                i++
            ) {

                const dot =
                    document.createElement("button");

                dot.type = "button";

                dot.className =
                    "activities-dot";

                dot.setAttribute(
                    "aria-label",
                    `Go to activity position ${i + 1}`
                );


                dot.addEventListener(
                    "click",
                    () => {

                        activityIndex = i;

                        moveActivities();

                        restartActivityAutoSlide();

                    }
                );


                activityDots.appendChild(dot);

            }


            updateActivityDots();

        }


        /* Update active dot */

        function updateActivityDots() {

            const dots =
                activityDots.querySelectorAll(
                    ".activities-dot"
                );


            dots.forEach(
                (dot, index) => {

                    dot.classList.toggle(
                        "active",
                        index === activityIndex
                    );

                }
            );

        }


        /* Next activity */

        function nextActivity() {

            const maxIndex =
                getActivityMaxIndex();


            if (
                activityIndex <
                maxIndex
            ) {

                activityIndex++;

            } else {

                /*
                 * Return to the beginning
                 * after reaching the last position.
                 */

                activityIndex = 0;

            }


            moveActivities();

        }


        /* Previous activity */

        function previousActivity() {

            const maxIndex =
                getActivityMaxIndex();


            if (activityIndex > 0) {

                activityIndex--;

            } else {

                activityIndex = maxIndex;

            }


            moveActivities();

        }


        /* Buttons */

        activityNext.addEventListener(
            "click",
            () => {

                nextActivity();

                restartActivityAutoSlide();

            }
        );


        activityPrev.addEventListener(
            "click",
            () => {

                previousActivity();

                restartActivityAutoSlide();

            }
        );


        /* Auto slide */

        function startActivityAutoSlide() {

            clearInterval(
                activityAutoSlide
            );


            activityAutoSlide =
                setInterval(
                    () => {

                        nextActivity();

                    },
                    5000
                );

        }


        function restartActivityAutoSlide() {

            clearInterval(
                activityAutoSlide
            );

            startActivityAutoSlide();

        }


        /* Pause while the mouse is over the carousel */

        const activityCarousel =
            document.querySelector(
                ".activities-carousel-wrapper"
            );


        activityCarousel.addEventListener(
            "mouseenter",
            () => {

                clearInterval(
                    activityAutoSlide
                );

            }
        );


        activityCarousel.addEventListener(
            "mouseleave",
            () => {

                startActivityAutoSlide();

            }
        );


        /* Touch / swipe support */

        let activityTouchStartX = 0;
        let activityTouchEndX = 0;


        activityTrack.addEventListener(
            "touchstart",
            (event) => {

                activityTouchStartX =
                    event.changedTouches[0].screenX;

                clearInterval(
                    activityAutoSlide
                );

            },
            { passive: true }
        );


        activityTrack.addEventListener(
            "touchend",
            (event) => {

                activityTouchEndX =
                    event.changedTouches[0].screenX;


                const distance =
                    activityTouchEndX -
                    activityTouchStartX;


                if (Math.abs(distance) > 50) {

                    if (distance < 0) {

                        nextActivity();

                    } else {

                        previousActivity();

                    }

                }


                startActivityAutoSlide();

            },
            { passive: true }
        );


        /* Responsive resize */

        function updateActivityLayout() {

            const newItemsPerView =
                getActivityItemsPerView();


            if (
                newItemsPerView !==
                activityItemsPerView
            ) {

                activityItemsPerView =
                    newItemsPerView;


                const maxIndex =
                    getActivityMaxIndex();


                if (
                    activityIndex >
                    maxIndex
                ) {

                    activityIndex =
                        maxIndex;

                }


                createActivityDots();

            }


            moveActivities();

        }


        window.addEventListener(
            "resize",
            updateActivityLayout
        );


        /* Initialize */

        activityItemsPerView =
            getActivityItemsPerView();

        createActivityDots();

        moveActivities();

        startActivityAutoSlide();

    }


});