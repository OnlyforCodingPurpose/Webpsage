document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const progressText = document.getElementById('progressPercentage');
    const canvas = document.getElementById('threeCanvas');
    const slideshow = document.getElementById('backgroundSlideshow');
    const images = slideshow.querySelectorAll('.background-image');
    const bottomNav = document.querySelector('.bottom-nav');

    // Debugging: Log if elements are missing
    if (!preloader || !progressText || !canvas || !slideshow) {
        console.error('Preloader elements missing:', {
            preloader: !!preloader,
            progressText: !!progressText,
            canvas: !!canvas,
            slideshow: !!slideshow
        });
        return;
    }

    // Check if Three.js is loaded
    if (!window.THREE) {
        console.error('Three.js is not loaded');
        preloader.classList.add('hidden');
        if (bottomNav) bottomNav.style.display = 'flex';
        return;
    }

    // Fallback timeout to hide preloader if stuck
    setTimeout(() => {
        if (percentage < 100) {
            console.warn('Preloader timeout reached, hiding preloader');
            preloader.classList.add('hidden');
            if (bottomNav) bottomNav.style.display = 'flex';
        }
    }, 10000);

    // Background Slideshow Logic
    let currentImageIndex = 0;
    images[currentImageIndex].classList.add('active');

    function changeBackgroundImage() {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
    }

    // Change background image every 1 second
    setInterval(changeBackgroundImage, 1000);

    // Three.js Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

    function updateRendererSize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        // Adjust camera position for zoom based on screen size
        camera.position.z = width <= 480 ? 4.5 : width <= 768 ? 5 : width <= 1024 ? 5.5 : 6;
    }

    updateRendererSize();
    window.addEventListener('resize', updateRendererSize);

    const icons = [
        { name: 'HTML', url: 'https://img.icons8.com/color/48/000000/html-5.png' },
        { name: 'CSS', url: 'https://img.icons8.com/color/48/000000/css3.png' },
        { name: 'JS', url: 'https://img.icons8.com/color/48/000000/javascript.png' },
        { name: 'PYTHON', url: 'https://img.icons8.com/color/48/000000/python.png' },
        { name: 'JAVA', url: 'https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png' },
        { name: 'C++', url: 'https://img.icons8.com/color/48/000000/c-plus-plus-logo.png' },
        { name: 'REACT', url: 'https://img.icons8.com/color/48/000000/react-native.png' },
        { name: 'NODEJS', url: 'https://img.icons8.com/color/48/000000/nodejs.png' },
        { name: 'MATLAB', url: 'https://img.icons8.com/ios-filled/50/000000/matlab.png' },
        { name: 'ASPIN', url: 'https://img.icons8.com/color/48/000000/asp.png' },
        { name: 'ANSYS', url: 'https://img.icons8.com/ios-filled/50/000000/ansys.png' },
        { name: 'SQL', url: 'https://img.icons8.com/color/48/000000/sql.png' },
        { name: 'RUBY', url: 'https://img.icons8.com/color/48/000000/ruby-programming-language.png' },
        { name: 'PHP', url: 'https://img.icons8.com/color/48/000000/php.png' },
        { name: 'SWIFT', url: 'https://img.icons8.com/color/48/000000/swift.png' },
        { name: 'KOTLIN', url: 'https://img.icons8.com/color/48/000000/kotlin.png' },
        { name: 'R', url: 'https://img.icons8.com/color/48/000000/r-project.png' },
        { name: 'GO', url: 'https://img.icons8.com/color/48/000000/go.png' },
        { name: 'TYPESCRIPT', url: 'https://img.icons8.com/color/48/000000/typescript.png' }
    ];

    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    const radius = window.innerWidth <= 1024 ? Math.max(2, Math.min(window.innerWidth / 4, 6)) : 4;
    icons.forEach((icon, index) => {
        const phi = Math.acos(-1 + (2 * index) / icons.length);
        const theta = Math.sqrt(icons.length * Math.PI) * phi;
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        const loader = new THREE.TextureLoader();
        loader.load(icon.url, (texture) => {
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(material);
            sprite.position.set(x, y, z);
            const scale = window.innerWidth <= 480 ? 33.5 : window.innerWidth <= 768 ? 32.6 : window.innerWidth <= 1024 ? 100 : 0.65;
            sprite.scale.set(scale, scale, scale);
            sphereGroup.add(sprite);
        }, undefined, (error) => {
            console.error('Error loading icon:', icon.url, error);
        });
    });

    const ringGeometry = new THREE.RingGeometry(0.8, 1, 64, 1, 0, 0);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    const progressRing = new THREE.Mesh(ringGeometry, ringMaterial);
    scene.add(progressRing);

    let percentage = 0;
    const totalDuration = 100; // Reduced for faster loading
    const rotationSpeed = (2 * 2 * Math.PI) / (totalDuration / 100000);

    function animate() {
        requestAnimationFrame(animate);
        sphereGroup.rotation.y += rotationSpeed / 20000;

        if (percentage < 100) {
            percentage += 100 / (totalDuration / 115.67);
            percentage = Math.min(percentage, 2);
            progressText.textContent = Math.round(percentage) + '%';
            progressRing.geometry = new THREE.RingGeometry(0.8, 1, 64, 1, 0, -(percentage / 100) * 2 * Math.PI);
        }

        if (percentage >= 100) {
            preloader.classList.add('hidden');
            if (bottomNav) bottomNav.style.display = 'flex';
        }

        renderer.render(scene, camera);
    }
    animate();
});

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const bottomNav = document.querySelector('.bottom-nav');

    // Debugging: Log if elements are missing
    if (!bottomNav) {
        console.warn('Bottom navigation (.bottom-nav) not found');
        return;
    }
    if (!preloader) {
        console.warn('Preloader (#preloader) not found, assuming loading complete');
    }

    // Function to update bottom navigation visibility
    function updateBottomNavVisibility() {
        const isLoading = preloader && !preloader.classList.contains('hidden');
        const isSmallScreen = window.innerWidth <= 1024;

        // Hide during loading or on large screens (> 1024px)
        // Show only on small screens (<= 1024px) after loading completes
        bottomNav.style.display = (isSmallScreen && !isLoading) ? 'flex' : 'none';
    }

    // Initial visibility check
    updateBottomNavVisibility();

    // Update visibility on resize
    window.addEventListener('resize', updateBottomNavVisibility);

    // Observe preloader class changes to update visibility
    if (preloader) {
        const observer = new MutationObserver(updateBottomNavVisibility);
        observer.observe(preloader, { attributes: true, attributeFilter: ['class'] });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    /*=============== CV MODAL FUNCTIONALITY ===============*/
    const viewCvBtn = document.getElementById("viewCvBtn");
    const cvModal = document.getElementById("cvModal");
    const closeCv = document.querySelector(".close-cv");

    if (viewCvBtn && cvModal && closeCv) {
        viewCvBtn.addEventListener("click", () => cvModal.style.display = "block");
        closeCv.addEventListener("click", () => cvModal.style.display = "none");
        window.addEventListener("click", e => {
            if (e.target === cvModal) cvModal.style.display = "none";
        });
    }

    /*=============== TYPED.JS ANIMATION ===============*/
    if (document.querySelector(".typing")) {
        new Typed(".typing", {
            strings: ["", "Chemical Engineer", "Web Designer", "Python Developer", "Quant Analyst", "Data Analyst"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
        });
    }

    /*=============== NAVIGATION SECTIONS ===============*/
    const nav = document.querySelector(".nav");
    const navList = nav ? nav.querySelectorAll("li") : [];
    const allSections = document.querySelectorAll(".section");

    function removeBackSection() {
        allSections.forEach(section => section.classList.remove("back-section"));
    }

    function addBackSection(index) {
        if (allSections[index]) allSections[index].classList.add("back-section");
    }

    function showSection(element) {
        allSections.forEach(section => section.classList.remove("active"));
        const targetId = element.getAttribute("href").split("#")[1];
        const targetSection = document.getElementById(targetId);
        if (targetSection) targetSection.classList.add("active");
    }

    function updateNav(element) {
        navList.forEach(item => {
            const navLink = item.querySelector("a");
            if (navLink) {
                navLink.classList.remove("active");
                const target = element.getAttribute("href").split("#")[1];
                if (target === navLink.getAttribute("href").split("#")[1]) {
                    navLink.classList.add("active");
                }
            }
        });
    }

    navList.forEach((item, i) => {
        const a = item.querySelector("a");
        if (a) {
            a.addEventListener("click", function (e) {
                e.preventDefault();
                removeBackSection();
                navList.forEach((itemInner, j) => {
                    const activeLink = itemInner.querySelector("a");
                    if (activeLink && activeLink.classList.contains("active")) {
                        addBackSection(j);
                        activeLink.classList.remove("active");
                    }
                });
                this.classList.add("active");
                showSection(this);
                if (window.innerWidth < 1200) {
                    asideSectionTogglerBtn();
                }
            });
        }
    });

    const navTogglerBtn = document.querySelector(".nav-toggler");
    const aside = document.querySelector(".aside");

    function asideSectionTogglerBtn() {
        aside?.classList.toggle("open");
        navTogglerBtn?.classList.toggle("open");
        allSections.forEach(section => section.classList.toggle("open"));
    }

    navTogglerBtn?.addEventListener("click", asideSectionTogglerBtn);

    /*=============== BOTTOM NAVIGATION (Mobile/Tablet) ===============*/
    const bottomNav = document.querySelector(".bottom-nav");
    const bottomNavLinks = bottomNav ? bottomNav.querySelectorAll("a") : [];

    bottomNavLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            removeBackSection();
            bottomNavLinks.forEach(navLink => navLink.classList.remove("active"));
            this.classList.add("active");
            showSection(this);
        });
    });

    const hireMeBtn = document.querySelector(".hire-me");
    if (hireMeBtn) {
        hireMeBtn.addEventListener("click", function () {
            const sectionIndex = this.getAttribute("data-section-index");
            showSection(this);
            updateNav(this);
            removeBackSection();
            addBackSection(sectionIndex);
        });
    }
});
