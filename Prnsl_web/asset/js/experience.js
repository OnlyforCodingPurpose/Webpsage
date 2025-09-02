// Modal functionality for opening and closing modals
function openModal(modalId) {
    console.log(`Opening modal: ${modalId}`);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        // Start carousel for any modal with a carousel
        const imageCarousel = modal.querySelector('.imageCarousel');
        if (imageCarousel) {
            startImageCarousel(modalId);
        } else {
            console.warn(`No imageCarousel found in modal: ${modalId}`);
        }
    } else {
        console.error(`Modal with ID ${modalId} not found`);
    }
}

function closeModal(modalId) {
    console.log(`Closing modal: ${modalId}`);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        // Stop carousel for any modal with a carousel
        const imageCarousel = modal.querySelector('.imageCarousel');
        if (imageCarousel) {
            stopImageCarousel(modalId);
        }
    } else {
        console.error(`Modal with ID ${modalId} not found`);
    }
}

// Carousel functionality for modals
const imageCarousels = {};

function startImageCarousel(modalId) {
    console.log(`Starting carousel for modal: ${modalId}`);
    const imageCarousel = document.querySelector(`#${modalId} .imageCarousel`);
    if (!imageCarousel) {
        console.error(`ImageCarousel not found in modal: ${modalId}`);
        return;
    }
    const carouselImages = imageCarousel.querySelectorAll('.carouselImage');
    if (carouselImages.length === 0) {
        console.error(`No carousel images found in carousel for modal: ${modalId}`);
        return;
    }
    if (!imageCarousels[modalId]) {
        imageCarousels[modalId] = { slideIndex: 0, interval: null };
    }
    clearInterval(imageCarousels[modalId].interval); // Clear any existing interval
    imageCarousels[modalId].interval = setInterval(() => {
        imageCarousels[modalId].slideIndex = (imageCarousels[modalId].slideIndex + 1) % carouselImages.length;
        imageCarousel.style.transform = `translateX(${-imageCarousels[modalId].slideIndex * 100}%)`;
        console.log(`ImageCarousel ${modalId} moved to image ${imageCarousels[modalId].slideIndex + 1}`);
    }, 3000);
}

function stopImageCarousel(modalId) {
    console.log(`Stopping carousel for modal: ${modalId}`);
    if (imageCarousels[modalId] && imageCarousels[modalId].interval) {
        clearInterval(imageCarousels[modalId].interval);
        imageCarousels[modalId].interval = null;
        imageCarousels[modalId].slideIndex = 0;
        const imageCarousel = document.querySelector(`#${modalId} .imageCarousel`);
        if (imageCarousel) {
            imageCarousel.style.transform = 'translateX(0)';
            console.log(`ImageCarousel ${modalId} reset to first image`);
        } else {
            console.error(`ImageCarousel not found in modal: ${modalId}`);
        }
    }
}

// Scroll functionality for experience sections
function updateScrollButtons(scrollId) {
    const scrollContainer = document.getElementById(scrollId);
    const leftBtn = document.getElementById(`${scrollId}LeftBtn`);
    const rightBtn = document.getElementById(`${scrollId}RightBtn`);
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    leftBtn.disabled = scrollContainer.scrollLeft <= 0;
    rightBtn.disabled = scrollContainer.scrollLeft >= maxScroll - 1;
    console.log(`${scrollId} - scrollLeft: ${scrollContainer.scrollLeft}, maxScroll: ${maxScroll}, leftBtn: ${leftBtn.disabled}, rightBtn: ${rightBtn.disabled}`);
}

function scrollToLeft(scrollId) {
    console.log(`Scrolling left for: ${scrollId}`);
    const scrollContainer = document.getElementById(scrollId);
    const currentScroll = scrollContainer.scrollLeft;
    const boxWidth = 360 + 20; // Box width (360px) + gap (20px)
    const currentIndex = Math.round(currentScroll / boxWidth);
    const newIndex = Math.max(0, currentIndex - 1);
    const newScroll = newIndex * boxWidth;
    scrollContainer.scrollTo({ left: newScroll, behavior: 'smooth' });
    setTimeout(() => updateScrollButtons(scrollId), 500);
}

function scrollToRight(scrollId) {
    console.log(`Scrolling right for: ${scrollId}`);
    const scrollContainer = document.getElementById(scrollId);
    const currentScroll = scrollContainer.scrollLeft;
    const boxWidth = 360 + 20; // Box width (360px) + gap (20px)
    const currentIndex = Math.round(currentScroll / boxWidth);
    const newIndex = currentIndex + 1;
    const newScroll = newIndex * boxWidth;
    scrollContainer.scrollTo({ left: newScroll, behavior: 'smooth' });
    setTimeout(() => updateScrollButtons(scrollId), 500);
}

// Initialize scroll buttons and add scroll event listeners
window.onload = function () {
    console.log('Page loaded, initializing scroll buttons');
    updateScrollButtons('onsiteScroll');
    updateScrollButtons('virtualScroll');
    document.getElementById('onsiteScroll').addEventListener('scroll', () => updateScrollButtons('onsiteScroll'));
    document.getElementById('virtualScroll').addEventListener('scroll', () => updateScrollButtons('virtualScroll'));
};

// Close modals whenទ

// Close modals when clicking outside
window.onclick = function (event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    }
};
