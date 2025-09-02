document.addEventListener('DOMContentLoaded', () => {
    /*=============== MAIN MODALS (N1–N4) ===============*/
    const optionButtons = document.querySelectorAll('.option-btn');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-btn-edu');

    if (optionButtons.length > 0) {
        optionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modalId = button.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modals.forEach(m => m.style.display = 'none'); // Close other modals
                    modal.style.display = 'flex';
                } else {
                    console.error(`Modal with ID ${modalId} not found`);
                }
            });
        });
    }

    if (closeButtons.length > 0) {
        closeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent event bubbling to window click listener
                const modal = button.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                    console.log(`Closed modal: ${modal.id}`);
                } else {
                    console.error('Modal not found for close button');
                }
            });
        });
    }

    if (modals.length > 0) {
        window.addEventListener('click', (event) => {
            modals.forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    console.log(`Closed modal by clicking outside: ${modal.id}`);
                }
            });
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                modals.forEach(modal => {
                    modal.style.display = 'none';
                    console.log(`Closed modal by Escape key: ${modal.id}`);
                });
            }
        });
    }

    /*=============== SLIDESHOW ===============*/
    const slideshows = document.querySelectorAll('.slideshow');
    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide');
        if (slides.length === 0) {
            console.warn('No slides found in slideshow');
            return;
        }

        let currentSlide = 0;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        };

        showSlide(currentSlide);
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 3000);
    });

    /*=============== SCROLLABLE EDU BOXES ===============*/
    const eduRow = document.querySelector('.edu-row');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const eduBoxes = document.querySelectorAll('.edu-box');

    if (eduRow && eduBoxes.length > 0) {
        let currentIndex = 0;

        const scrollToBox = (index) => {
            if (index >= 0 && index < eduBoxes.length) {
                const box = eduBoxes[index];
                if (box) {
                    box.scrollIntoView({ behavior: 'smooth', inline: 'start' });
                    currentIndex = index;
                }
            }
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    scrollToBox(currentIndex - 1);
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < eduBoxes.length - 1) {
                    scrollToBox(currentIndex + 1);
                }
            });
        }

        // Debounce scroll event
        let scrollTimeout;
        eduRow.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollLeft = eduRow.scrollLeft;
                const boxWidth = eduBoxes[0].offsetWidth + 20; // Account for gap
                const newIndex = Math.round(scrollLeft / boxWidth);
                if (newIndex !== currentIndex && newIndex >= 0 && newIndex < eduBoxes.length) {
                    currentIndex = newIndex;
                }
            }, 100);
        });
    } else {
        console.warn('Education row or boxes not found');
    }
});