
document.addEventListener("DOMContentLoaded", () => {
    // 1. Dark / Light Mode
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    function updateTheme(theme) {
        document.documentElement.dataset.theme = theme;

        if (themeIcon) {
            themeIcon.textContent = theme === "light" ? "☀" : "☾";
        }

        if (themeToggle) {
            themeToggle.setAttribute(
                "aria-label",
                theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            );
            themeToggle.setAttribute("title", theme === "light" ? "Light mode" : "Dark mode");
        }
    }

    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem("portfolio-theme");
    } catch (error) {
        console.log("Theme preference could not be saved.");
    }

    updateTheme(savedTheme === "light" ? "light" : "dark");

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.dataset.theme;
            const newTheme = currentTheme === "light" ? "dark" : "light";

            updateTheme(newTheme);

            try {
                localStorage.setItem("portfolio-theme", newTheme);
            } catch (error) {
                console.log("Theme preference could not be saved.");
            }
        });
    }

    // 2. Typing Animation
    const typingText = document.getElementById("typingText");

    if (typingText) {
        const words = [
            "Full-Stack Web Developer",
            "Computer Science Student",
            "Aspiring Software Developer"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (deleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typingText.textContent = currentWord.substring(0, charIndex);

            let delay = deleting ? 45 : 90;

            if (!deleting && charIndex === currentWord.length) {
                deleting = true;
                delay = 1200;
            } else if (deleting && charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 350;
            }

            setTimeout(typeEffect, delay);
        }

        typeEffect();
    }

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach((element) => {
            observer.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // 4. Mobile Navigation Menu
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    function closeMenu() {
        if (navLinks) {
            navLinks.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
        }
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }
});
