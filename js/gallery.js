document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.querySelector('.modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    let currentImageIndex = 0;
    let filteredItems = [];

    // فلترة الصور
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // إزالة الكلاس النشط من جميع الأزرار
            filterBtns.forEach(b => b.classList.remove('active'));
            // إضافة الكلاس النشط للزر المختار
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            const items = document.querySelectorAll('.gallery-item');

            items.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // تحديث قائمة الصور المفلترة
            filteredItems = Array.from(items).filter(item => 
                filter === 'all' || item.classList.contains(filter)
            );
        });
    });

    // فتح النافذة المنبثقة
    galleryGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (!item) return;

        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        
        if (img && overlay) {
            modalImg.src = img.src;
            modalCaption.innerHTML = `
                <h3>${overlay.querySelector('h3').textContent}</h3>
                <p>${overlay.querySelector('p').textContent}</p>
            `;
            modal.style.display = 'flex';

            // تحديث الصورة الحالية
            currentImageIndex = filteredItems.length ? 
                filteredItems.indexOf(item) : 
                Array.from(document.querySelectorAll('.gallery-item')).indexOf(item);
        }
    });

    // إغلاق النافذة المنبثقة
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // إغلاق النافذة المنبثقة عند النقر خارجها
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // التنقل بين الصور
    function navigateGallery(direction) {
        const items = filteredItems.length ? 
            filteredItems : 
            Array.from(document.querySelectorAll('.gallery-item'));

        if (items.length <= 1) return;

        currentImageIndex = (currentImageIndex + direction + items.length) % items.length;
        const newItem = items[currentImageIndex];
        
        const img = newItem.querySelector('img');
        const overlay = newItem.querySelector('.gallery-overlay');

        modalImg.src = img.src;
        modalCaption.innerHTML = `
            <h3>${overlay.querySelector('h3').textContent}</h3>
            <p>${overlay.querySelector('p').textContent}</p>
        `;
    }

    prevBtn.addEventListener('click', () => navigateGallery(-1));
    nextBtn.addEventListener('click', () => navigateGallery(1));

    // التنقل باستخدام لوحة المفاتيح
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') navigateGallery(1);
            if (e.key === 'ArrowRight') navigateGallery(-1);
            if (e.key === 'Escape') modal.style.display = 'none';
        }
    });

    // تحريك الصور عند التحميل
    const animateGalleryItems = () => {
        const items = document.querySelectorAll('.gallery-item');
        items.forEach((item, index) => {
            item.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        });
    };

    animateGalleryItems();
}); 