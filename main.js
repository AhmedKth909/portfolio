// ============================================
// THREE.JS SCENE INITIALIZATION
// ============================================

// Scene Setup
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x0a0f1f, 1);
container.appendChild(renderer.domElement);

camera.position.z = 5;

// Particle System
const particleCount = 1500;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    
    colors[i * 3] = 0;
    colors[i * 3 + 1] = 0.98;
    colors[i * 3 + 2] = 1;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Lighting
const ambientLight = new THREE.AmbientLight(0x0a0f1f, 0.5);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0x00f9ff, 1, 100);
pointLight1.position.set(5, 5, 5);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x00f9ff, 0.5, 100);
pointLight2.position.set(-5, -5, 5);
scene.add(pointLight2);

// Mouse Parallax
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    // Smooth parallax
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;
    
    camera.position.x = targetX * 0.5;
    camera.position.y = targetY * 0.5;
    
    // Rotate particles
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;
    
    renderer.render(scene, camera);
}

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================
// UI INTERACTIONS
// ============================================

// Loading Animation
let progress = 0;
const loadingProgress = document.getElementById('loadingProgress');
const loadingScreen = document.getElementById('loadingScreen');

function simulateLoading() {
    if (progress < 100) {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        loadingProgress.style.width = progress + '%';
        
        if (progress < 100) {
            setTimeout(simulateLoading, 150);
        } else {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    // Animate in main content
                    gsap.to('.main-title', {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out'
                    });
                    gsap.to('.subtitle', {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        delay: 0.3,
                        ease: 'power3.out'
                    });
                }, 500);
            }, 300);
        }
    }
}

// Navigation Panels
const navPanels = document.querySelectorAll('.nav-panel');
const page2Content = document.getElementById('page2Content');
const backButton = document.getElementById('backButton');
const indicatorDots = document.querySelectorAll('.indicator-dot');
let currentCategory = 'design';

// Gallery Data
const galleryData = {
    design: {
        title: 'أعمال التصميم',
        subtitle: 'مجموعة مختارة من أفضل أعمال التصميم الجرافيكي',
        categories: ['الكل', 'العروض التقديمية', 'حملات وسائل التواصل الاجتماعي', 'الكاروسيل', 'الإعلانات + تصاميم', 'غلافات Reels'],
        items: [
            { title: 'عرض تقديمي احترافي', category: 'العروض التقديمية', description: 'تصميم عرض تقديمي حديث لشركة للمعهد العالي لإدارة الاعمال HIBA', type: 'pdf', src: './assets/design/01.pdf',
  thumbnail: './assets/design/cover01.jpg' },
            { title: 'حملة سوشيال ميديا', category: 'حملات وسائل التواصل الاجتماعي', description: 'تصميم منشورات لحملة تسويقية شاملة', type: 'image', src: './assets/design/camp.webp', thumbnail: './assets/design/camp.png' },
            { title: 'كاروسيل للعملاء ', category: 'الكاروسيل', description: 'تصميم كاروسيل لخالد بزماوي', type: 'pdf', src: './assets/design/01c.pdf', thumbnail: './assets/design/01c.png' },
          { title: 'كاروسيل للعملاء ', category: 'الكاروسيل', description: 'تصميم كاروسيل لخالد بزماوي', type: 'pdf', src: './assets/design/02c.pdf', thumbnail: './assets/design/02c.png' },
           { title: 'كاروسيل لتصاميمي ', category: 'الكاروسيل', description: 'تصميم كاروسيل لتصصاميمي ', type: 'pdf', src: './assets/design/03c.pdf', thumbnail: './assets/design/03c.png' },
           { title: 'كاروسيل لتصاميمي ', category: 'الكاروسيل', description: 'تصميم كاروسيل لتصصاميمي ', type: 'pdf', src: './assets/design/04c.pdf', thumbnail: './assets/design/04c.png' },
           { title: 'كاروسيل لتصاميمي ', category: 'الكاروسيل', description: 'تصميم كاروسيل لتصصاميمي ', type: 'pdf', src: './assets/design/05c.pdf', thumbnail: './assets/design/05c.png' },
           { title: 'كاروسيل لتصاميمي ', category: 'الكاروسيل', description: 'تصميم كاروسيل لتصصاميمي ', type: 'pdf', src: './assets/design/06c.pdf', thumbnail: './assets/design/06c.png' },
           { title: 'كاروسيل Ahmedkthprjects ', category: 'الكاروسيل', description: 'تصميم كاروسيل لتصصاميمي ', type: 'pdf', src: './assets/design/07c.pdf', thumbnail: './assets/design/07c.png' },
           { title: 'كاروسيل Ahmedkthprojects ', category: 'الكاروسيل', description: 'تصميم كاروسيل لتصصاميمي ', type: 'pdf', src: './assets/design/08c.pdf', thumbnail: './assets/design/08c.png' },
          { title: 'إعلان منتج سوري', category: 'الإعلانات + تصاميم', description: 'تصميم إعلان لمنتج سوري محلي', type: 'image', src: './assets/design/al.png', thumbnail: './assets/design/al.png' },
            { title: 'إعلان منتج سوري', category: 'الإعلانات + تصاميم', description: 'تصميم إعلان لمنتج سوري محلي', type: 'image', src: './assets/design/be.webp', thumbnail: './assets/design/be.jpg' },
            { title: 'إعلان منتج سوري', category: 'الإعلانات + تصاميم', description: 'تصميم إعلان لمنتج سوري محلي', type: 'image', src: './assets/design/mi.jpg', thumbnail: './assets/design/mi.jpg' },
            { title: ' تهنئة لعيد الفطر', category: 'الإعلانات + تصاميم', description: 'تصميم تهنئة عيد الفطر', type: 'image', src: './assets/design/eid-ahmed.webp', thumbnail: './assets/design/eid-ahmed.png' },
            { title: ' ahmedkthprojects تهنئة لعيد الفطر', category: 'الإعلانات + تصاميم', description: 'تصميم تهنئة عيد الفطر', type: 'image', src: './assets/design/eid.webp', thumbnail: './assets/design/eid.png' },
            { title: ' إعلان لقلم ازرق جاف', category: 'الإعلانات + تصاميم', description: 'تصميم تخيلي لشركة bic', type: 'image', src: './assets/design/bic.webp', thumbnail: './assets/design/bic.png' },
            { title: ' إعلان لـ citycafe', category: 'الإعلانات + تصاميم', description: 'تصميم تخيلي لشركة citycafe', type: 'image', src: './assets/design/citycafesnow.webp', thumbnail: './assets/design/citycafesnow.png' },
            { title: ' إعلان لـ شاورما', category: 'الإعلانات + تصاميم', description: 'تصميم تخيلي ', type: 'image', src: './assets/design/sha.webp', thumbnail: './assets/design/sha.webp' },
            { title: ' إعلان لـ سيارة', category: 'الإعلانات + تصاميم', description: 'تصميم تخيلي ', type: 'image', src: './assets/design/gt.webp', thumbnail: './assets/design/gt.png' },
            { title: '  تصميم تهنئة رأس السنة ', category: 'الإعلانات + تصاميم', description: 'تصميم رسمي لفريق hmk ', type: 'image', src: './assets/design/hap.webp', thumbnail: './assets/design/hap.jpg' },
            { title: ' تصميم سوشيال ميديا ', category: 'الإعلانات + تصاميم', description: 'تصميم رسمي لفريق الإعلامي الجامعي التطوعي ', type: 'image', src: './assets/design/fp.webp', thumbnail: './assets/design/fp.png' },
            { title: ' تصميم سوشيال ميديا لزجاجة عطر', category: 'الإعلانات + تصاميم', description: 'تصميم تخيلي ', type: 'image', src: './assets/design/de.png', thumbnail: './assets/design/de.png' },
            { title: ' تصميم سوشيال ميديا لذكرى التحرير ', category: 'الإعلانات + تصاميم', description: 'تصميم رسمي ahmedkthprojects ', type: 'image', src: './assets/design/th.png', thumbnail: './assets/design/th.png' },
            { title: ' تصميم سوشيال ميديا لوجبة طعام ', category: 'الإعلانات + تصاميم', description: 'تصميم تخيلي ', type: 'image', src: './assets/design/bu.webp', thumbnail: './assets/design/bu.png' },
            { title: ' تصميم سوشيال ميديا كريم  ', category: 'الإعلانات + تصاميم', description: 'تصميم تخيلي ', type: 'image', src: './assets/design/cr.jpg', thumbnail: './assets/design/cr.jpg' },
             { title: ' تصميم سوشيال ميديا 2 in 1 cafe ', category: 'الإعلانات + تصاميم', description: ' تصميم تخيلي لشركة city cafe', type: 'image', src: './assets/design/ca.png', thumbnail: './assets/design/ca.png' },
              { title: ' تصميم سوشيال ميديا لساعة ذكية ', category: 'الإعلانات + تصاميم', description: ' تصميم تخيلي', type: 'image', src: './assets/design/p.png', thumbnail: './assets/design/p.png' },
              { title: ' تصميم سوشيال ميديا لدعوة المستثمرين ', category: 'الإعلانات + تصاميم', description: ' تصميم رسمي لكلية الهمك', type: 'image', src: './assets/design/in.png', thumbnail: './assets/design/in.png' },
              { title: ' تصميم سوشيال ميديا لسماعات  ', category: 'الإعلانات + تصاميم', description: ' تصميم تخيلي', type: 'image', src: './assets/design/s.png', thumbnail: './assets/design/s.png' },
              { title: ' تصميم سوشيال  لتهنئة عيد الفطر  ', category: 'الإعلانات + تصاميم', description: ' تصميم رسمي ahmedkthprojects', type: 'image', src: './assets/design/she.png', thumbnail: './assets/design/she.png' },
               { title: ' تصميم سوشيال  لدراجة هوائية ', category: 'الإعلانات + تصاميم', description: ' تصميم تخيلي ', type: 'image', src: './assets/design/bmx.jpg', thumbnail: './assets/design/bmx.jpg' },
               { title: ' تصميم سوشيال ميديا لمشروب طاقة ', category: 'الإعلانات + تصاميم', description: ' تصميم تخيلي ', type: 'image', src: './assets/design/en.jpg', thumbnail: './assets/design/en.jpg' },
               { title: ' تصميم سوشيال ميديا لذكرى ', category: 'الإعلانات + تصاميم', description: ' تصميم رسمي لـ WAREED ', type: 'image', src: './assets/design/w.jpg', thumbnail: './assets/design/w.jpg' },
               { title: ' تصميم سوشيال ميديا للسياحة في نركيا ', category: 'الإعلانات + تصاميم', description: ' تصميم رسمي لـ Chicago tourism ', type: 'image', src: './assets/design/car.jpg', thumbnail: './assets/design/car.jpg' },
               { title: ' تصميم سوشيال ميديا لوجبة طعام ', category: 'الإعلانات + تصاميم', description: ' تصميم تخيلي ', type: 'image', src: './assets/design/bu1.jpg', thumbnail: './assets/design/bu1.jpg' },
                { title: ' تصميم سوشيال ميديا   ', category: 'الإعلانات + تصاميم', description: ' تصميم رسمي Elite ', type: 'image', src: './assets/design/el.jpg', thumbnail: './assets/design/el.jpg' },
                { title: ' تصميم سوشيال ميديا   ', category: 'الإعلانات + تصاميم', description: ' تصميم تخيلي ', type: 'image', src: './assets/design/09.jpg', thumbnail: './assets/design/09.jpg' },
            { title: 'غلاف Reels ', category: 'غلافات Reels', description: 'تصميم غلاف لفيديو ', type: 'image', src: './assets/design/01r.png', thumbnail: './assets/design/01r.png' },
            { title: 'غلاف Reels ', category: 'غلافات Reels', description: 'تصميم غلاف لفيديو ', type: 'image', src: './assets/design/02r.png', thumbnail: './assets/design/02r.png' },
            { title: 'غلاف Reels ', category: 'غلافات Reels', description: 'تصميم غلاف لفيديو ', type: 'image', src: './assets/design/03r.jpg', thumbnail: './assets/design/03r.jpg' },
            { title: 'غلاف Reels ', category: 'غلافات Reels', description: 'تصميم غلاف لفيديو ', type: 'image', src: './assets/design/04r.png', thumbnail: './assets/design/04r.png' },
            { title: 'عرض تقديمي لمشروع جامعي', category: 'العروض التقديمية', description: 'تصميم عرض تقديمي لعرض مشروع جامعي', type: 'pdf', src: './assets/design/02.pdf', thumbnail: './assets/design/cover02.png' }
        ]
    },
    editing: {
        title: 'أعمال المونتاج',
        subtitle: 'مجموعة مختارة من أفضل أعمال المونتاج والفيديو',
        categories: ['الكل', 'Reels', 'فيديوهات AI', 'المونتاج'],
        items: [
            { title: 'Reel ترويجي', category: 'Reels', description: 'مونتاج Reel ترويجي لحملة إعلانية لوائل زرزر', type: 'video', src: 'https://drive.google.com/file/d/1G3AIaBFvrEi4mRg5Byy5toDEfHiJ3PTs/preview', thumbnail: './assets/editing/18.png' },
            { title: 'Reel ترويجي', category: 'Reels', description: 'مونتاج ريل للمحامي عمر أحمد فيتوري', type: 'video', src: 'https://drive.google.com/file/d/18GT9jbSx9H6i1h5duL0OHOGgPEY2UeeL/preview', thumbnail: './assets/editing/14.png' },
            { title: 'Reel ترويجي', category: 'Reels', description:'مونتاج ريل إبراهيم طانه ', type: 'video', src: 'https://drive.google.com/file/d/1U5qn-1TdV8mzXEdnZXFkpYZa0n1V1sp3/preview', thumbnail: './assets/editing/13.png' },
            { title: 'Reel ترويجي', category: 'Reels', description:'مونتاج ريل  helen malla khalil ', type: 'video', src: 'https://drive.google.com/file/d/1eYsp9TjsHJNfqoAW1woNVWRwUCzH3bDJ/preview', thumbnail: './assets/editing/10.png' },
             { title: 'Reel ترويجي', category: 'Reels', description:'مونتاج ريل  Khaled bzmawe ', type: 'video', src: 'https://drive.google.com/file/d/1PAYX291yoD0fjxrFa9cpdx_4zzFzDJCC/preview', thumbnail: './assets/editing/9.png' },
             { title: 'Reel ترويجي', category: 'Reels', description:'مونتاج ريل  Khaled bzmawe ', type: 'video', src: 'https://drive.google.com/file/d/1wxxZMOU7Mz7bvKe5nMu_siyZX1_U9KbE/preview', thumbnail: './assets/editing/8.png' },
             { title: 'Reel ترويجي', category: 'Reels', description:'مونتاج ريل  Khaled bzmawe ', type: 'video', src: 'https://drive.google.com/file/d/1XxLXqqPkN2TtU__RLw-9X-v2IIbigjPJ/preview', thumbnail: './assets/editing/7.png' },
              { title: 'Reel ترويجي', category: 'Reels', description:'مونتاج ريل  Khaled bzmawe ', type: 'video', src: 'https://drive.google.com/file/d/1rX92y4YAYedkPa0DbL3Cty4Oa_yNqx1j/preview', thumbnail: './assets/editing/6.png' },
            { title: 'فيديو لذكرى التحرير AI', category: 'فيديوهات AI', description: 'فيديو  AI', type: 'video', src: 'https://drive.google.com/file/d/1-K77yl_zQi4cVlidbFT7IfXK2-CcMVY1/preview', thumbnail: './assets/editing/17.png' },
            { title: 'فيديو لشركة الدرة AI', category: 'فيديوهات AI', description: 'فيديو لشركة الدرة منتج مربى الفريز AI', type: 'video', src: 'https://drive.google.com/file/d/1lSi4IH4jjvLf2RSw7MH6WM2RRcUNA56S/preview', thumbnail: './assets/editing/16.png' },
             { title: 'فيديو لشركة الدرة AI', category: 'فيديوهات AI', description: 'فيديو لشركة الدرة منتج الذرة الصفراء  AI', type: 'video', src: 'https://drive.google.com/file/d/1-MnjMpgqInqHHrH38qdbC5G1KRmZ6XAQ/preview', thumbnail: './assets/editing/15.png' },
            { title: 'مونتاج  فيديو', category: 'المونتاج', description: 'مونتاج رسمي لكوانتي  ', type: 'video', src: 'https://drive.google.com/file/d/1L_IZC13AU5wL2zATRyXpOMVx0sfMgJ8X/preview', thumbnail: './assets/editing/q.png' }
        ]
    }
};

// Generate Gallery
function generateGallery(category) {
    const data = galleryData[category];
    const categoryTabs = document.getElementById('categoryTabs');
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryTitle = document.getElementById('galleryTitle');
    const gallerySubtitle = document.getElementById('gallerySubtitle');
    
    galleryTitle.textContent = data.title;
    gallerySubtitle.textContent = data.subtitle;
    
    // Generate tabs
    categoryTabs.innerHTML = '';
    data.categories.forEach((cat, index) => {
        const tab = document.createElement('button');
        tab.className = 'category-tab' + (index === 0 ? ' active' : '');
        tab.textContent = cat;
        tab.addEventListener('click', () => filterGallery(cat));
        categoryTabs.appendChild(tab);
    });
    
    // Generate cards
    galleryGrid.innerHTML = '';
    data.items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.setAttribute('data-category', item.category);
        card.innerHTML = `

          <div class="card-image">
          ${
        item.type === 'image'
        ? `<img src="${item.src}" alt="${item.title}" />`
        : item.type === 'video'
        ? `<img src="${item.thumbnail}" alt="${item.title}" />`
        : item.type === 'pdf'
        ? `<img src="${item.thumbnail}" onerror="this.style.border='3px solid red'" />`
        : ''
    }
    </div>
    <div class="card-content">
        <div class="card-title">${item.title}</div>
        <div class="card-category">${item.category}</div>
        <div class="card-description">${item.description}</div>
    </div>
`;
      
        card.addEventListener('click', () => openCaseStudy(item));
        galleryGrid.appendChild(card);
    });
}

// Filter Gallery
function filterGallery(category) {
    const tabs = document.querySelectorAll('.category-tab');
    const cards = document.querySelectorAll('.gallery-card');
    
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.textContent === category) {
            tab.classList.add('active');
        }
    });
    
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'الكل' || cardCategory === category) {
            gsap.to(card, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
            card.style.display = 'block';
        } else {
            gsap.to(card, {
                opacity: 0,
                scale: 0.9,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {
                    card.style.display = 'none';
                }
            });
        }
    });
}

// Open Case Study
function openCaseStudy(item) {
    if (item.type === 'pdf') {
        window.open(item.src, '_blank');
    } 
    else if (item.type === 'image') {
        window.open(item.src, '_blank');
    }
    else if (item.type === 'video') {
        window.open(item.src, '_blank');
    }
}

// Navigate to Page 2
function navigateToPage2(category) {
    currentCategory = category;
    generateGallery(category);

    page2Content.style.zIndex = '10'; // يطلع فوق

    gsap.to(camera.position, {
        z: 3,
        duration: 1.5,
        ease: 'power3.inOut'
    });

    gsap.to('.page1-content', {
        opacity: 0,
        duration: 0.8
    });

    gsap.to('.nav-panels', {
        opacity: 0,
        y: 50,
        duration: 0.8
    });

    setTimeout(() => {
        page2Content.style.opacity = '1';
        page2Content.style.pointerEvents = 'auto';
    }, 800);
}
// Navigate back to Page 1
function navigateToPage1() {
    // إرجاع الكاميرا
    gsap.to(camera.position, {
        z: 5,
        duration: 1.5,
        ease: 'power3.inOut'
    });

    // إخفاء page2 بالكامل
    page2Content.style.opacity = '0';
    page2Content.style.pointerEvents = 'none';
    page2Content.style.zIndex = '0'; // مهم

    setTimeout(() => {
        // إظهار الصفحة الأولى
        gsap.to('.page1-content', {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        });

        gsap.to('.nav-panels', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    }, 300);

    indicatorDots[1].classList.remove('active');
    indicatorDots[0].classList.add('active');
}

// Event Listeners
navPanels.forEach(panel => {
    panel.addEventListener('click', () => {
        const category = panel.getAttribute('data-category');
        navigateToPage2(category);
    });
});

backButton.addEventListener('click', navigateToPage1);

indicatorDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (index === 0 && !indicatorDots[0].classList.contains('active')) {
            navigateToPage1();
        } else if (index === 1 && !indicatorDots[1].classList.contains('active')) {
            navigateToPage2(currentCategory);
        }
    });
});

// Contact Section
const contactButton = document.getElementById('contactButton');
const contactSection = document.getElementById('contactSection');
const contactClose = document.getElementById('contactClose');

contactButton.addEventListener('click', () => {
    contactSection.classList.add('active');
});

contactClose.addEventListener('click', () => {
    contactSection.classList.remove('active');
});

// Close contact on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        contactSection.classList.remove('active');
    }
});

// Panel Hover Effects
navPanels.forEach(panel => {
    panel.addEventListener('mouseenter', () => {
        navPanels.forEach(p => {
            if (p !== panel) {
                gsap.to(p, {
                    opacity: 0.5,
                    scale: 0.95,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    panel.addEventListener('mouseleave', () => {
        navPanels.forEach(p => {
            gsap.to(p, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
});

// Initialize
window.addEventListener('load', () => {
    animate();
    simulateLoading();
});