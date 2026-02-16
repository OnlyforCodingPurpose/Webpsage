const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
if(styleSwitcherToggle) {
    styleSwitcherToggle.addEventListener("click", () => {
        document.querySelector(".style-switcher").classList.toggle("open");
    });
}

window.addEventListener("scroll", () => {
    const styleSwitcher = document.querySelector(".style-switcher");
    if (styleSwitcher && styleSwitcher.classList.contains("open")) {
        styleSwitcher.classList.remove("open");
    }
});

const alternateStyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
    });
}

const dayNight = document.querySelector(".day-night");
if(dayNight) {
    dayNight.addEventListener("click", () => {
        const icon = dayNight.querySelector("i");
        if(icon) {
            icon.classList.toggle("fa-sun");
            icon.classList.toggle("fa-moon");
        }
        document.body.classList.toggle("dark");
    });
}

window.addEventListener("load", () => {
    if(dayNight) {
        const icon = dayNight.querySelector("i");
        if(icon) {
            if (document.body.classList.contains("dark")) {
                icon.classList.add("fa-sun");
            } else {
                icon.classList.add("fa-moon");
            }
        }
    }
});
