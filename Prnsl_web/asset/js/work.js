let workCurrentFilter = 'Web';

function workFilterCards(filter) {
    workCurrentFilter = filter;
    const workCards = document.querySelectorAll('.work-card');
    const workFilterItems = document.querySelectorAll('.work-filter-item');
    const workGridContainer = document.querySelector('.work-grid-container');
    const workScrollNav = document.querySelector('.work-scroll-nav');
    const isSmallScreen = window.innerWidth <= 768;

    workFilterItems.forEach(item => {
        item.classList.remove('work-active-work');
        if (item.getAttribute('data-filter') === filter) {
            item.classList.add('work-active-work');
        }
    });

    let visibleCardCount = 0;
    workCards.forEach(workCard => {
        const isMatch = filter === 'All' ? true : workCard.classList.contains(`work-mix-${filter}`);
        workCard.style.display = isMatch ? 'block' : 'none';
        if (isMatch) visibleCardCount++;
    });

    workGridContainer.classList.remove('work-center-cards');
    if (!isSmallScreen) {
        if (visibleCardCount >= 3) {
            workGridContainer.style.width = '750px';
            workGridContainer.style.overflowX = 'auto';
            workScrollNav.style.display = 'flex';
        } else {
            workGridContainer.classList.add('work-center-cards');
            workScrollNav.style.display = 'none';
        }
    } else {
        if (visibleCardCount > 1) {
            workGridContainer.style.width = '362px';
            workGridContainer.style.overflowX = 'auto';
            workScrollNav.style.display = 'flex';
        } else {
            workGridContainer.classList.add('work-center-cards');
            workScrollNav.style.display = 'flex';
        }
    }

    workGridContainer.scrollLeft = 0;
}

function workScrollCards(direction) {
    const workGridContainer = document.querySelector('.work-grid-container');
    const cardWidth = 332;
    const currentScroll = workGridContainer.scrollLeft;
    const maxScroll = workGridContainer.scrollWidth - workGridContainer.clientWidth;

    if (direction === 'left' && currentScroll > 0) {
        workGridContainer.scrollLeft -= cardWidth;
    } else if (direction === 'right' && currentScroll < maxScroll) {
        workGridContainer.scrollLeft += cardWidth;
    }
}

function workOpenModal(workModalId) {
    workCloseAllModals();
    const workModal = document.getElementById(workModalId);
    if (workModal) {
        console.log(`Opening modal: ${workModalId}`);
        workModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        console.error(`Modal with ID ${workModalId} not found`);
    }
}

function workCloseModal(workModalId) {
    const workModal = document.getElementById(workModalId);
    if (workModal) {
        workModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function workCloseAllModals() {
    document.querySelectorAll('.work-modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        workCloseAllModals();
    }
});

document.querySelectorAll('.work-modal').forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

document.querySelectorAll('.work-filter-item').forEach(item => {
    item.addEventListener('click', () => {
        const filter = item.getAttribute('data-filter');
        workFilterCards(filter);
        document.querySelector('.work-filter-select').value = filter;
    });
});

window.addEventListener('load', () => {
    workFilterCards('Web');
});

window.addEventListener('resize', () => {
    workFilterCards(workCurrentFilter);
});
