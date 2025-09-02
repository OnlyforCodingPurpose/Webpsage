// Preloader JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const progressText = document.getElementById('progressPercentage');
    const canvas = document.getElementById('threeCanvas');
    const slideshow = document.getElementById('backgroundSlideshow');
    const images = slideshow.querySelectorAll('.background-image');

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
        return;
    }

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
        { name: 'RUBY', url: 'https://img.icons8.com/color/48/000000/ruby-programming-symbol.png' },
        { name: 'PHP', url: 'https://img.icons8.com/color/48/000000/php.png' },
        { name: 'SWIFT', url: 'https://img.icons8.com/color/48/000000/swift.png' },
        { name: 'KOTLIN', url: 'https://img.icons8.com/color/48/000000/kotlin.png' },
        { name: 'R', url: 'https://img.icons8.com/color/48/000000/r-project.png' },
        { name: 'GO', url: 'https://img.icons8.com/color/48/000000/go.png' },
        { name: 'TYPESCRIPT', url: 'https://img.icons8.com/color/48/000000/typescript.png' }
    ];

    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    const radius = 3;
    icons.forEach((icon, index) => {
        const phi = Math.acos(-1 + (2 * index) / icons.length);
        const theta = Math.sqrt(icons.length * Math.PI) * phi;
        const x = radius * Math.cos(theta);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        const loader = new THREE.TextureLoader();
        loader.load(icon.url, (texture) => {
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(material);
            sprite.position.set(x, y, z);
            const scale = window.innerWidth <= 480 ? 0.35 : window.innerWidth <= 768 ? 0.45 : window.innerWidth <= 1024 ? 0.55 : 0.65;
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

    camera.position.z = 5;

    let percentage = 0;
    const totalDuration = 5000;
    const rotationSpeed = (2 * Math.PI) / (totalDuration / 1000);

    function animate() {
        requestAnimationFrame(animate);
        sphereGroup.rotation.y += rotationSpeed / 60;

        if (percentage < 100) {
            percentage += 100 / (totalDuration / 16.67);
            percentage = Math.min(percentage, 100);
            progressText.textContent = Math.round(percentage) + '%';
            progressRing.geometry = new THREE.RingGeometry(0.8, 1, 64, 1, 0, -(percentage / 100) * 2 * Math.PI);
        }

        if (percentage >= 100) {
            preloader.classList.add('hidden');
            document.getElementById('mainContent').classList.add('loaded');
        }

        renderer.render(scene, camera);
    }
    animate();
});