document.addEventListener('DOMContentLoaded', () => {
    const wishForm = document.getElementById('wishForm');
    const wishesContainer = document.querySelector('.wishes-container');

    // تحميل الرسائل المحفوظة من localStorage
    let wishes = JSON.parse(localStorage.getItem('wishes')) || [];

    // عرض الرسائل المحفوظة
    function displayWishes() {
        wishesContainer.innerHTML = '';
        wishes.forEach(wish => {
            const wishCard = createWishCard(wish);
            wishesContainer.prepend(wishCard);
        });
    }

    // إنشاء بطاقة رسالة جديدة
    function createWishCard(wish) {
        const card = document.createElement('div');
        card.className = 'wish-card';
        card.innerHTML = `
            <div class="wish-header">
                <img src="../images/avatar-default.jpg" alt="صورة المرسل" class="wish-avatar">
                <div class="wish-info">
                    <h3>${wish.name}</h3>
                    <span class="wish-date">${formatDate(wish.date)}</span>
                </div>
            </div>
            <p class="wish-message">${wish.message}</p>
        `;
        return card;
    }

    // تنسيق التاريخ
    function formatDate(date) {
        const now = new Date();
        const wishDate = new Date(date);
        const diff = now - wishDate;
        
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (minutes < 60) {
            return `منذ ${minutes} دقيقة`;
        } else if (hours < 24) {
            return `منذ ${hours} ساعة`;
        } else if (days < 7) {
            return `منذ ${days} يوم`;
        } else {
            return wishDate.toLocaleDateString('ar-SA');
        }
    }

    // معالجة إرسال النموذج
    wishForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        
        const newWish = {
            name,
            message,
            date: new Date().toISOString()
        };

        wishes.unshift(newWish);
        localStorage.setItem('wishes', JSON.stringify(wishes));
        
        displayWishes();
        wishForm.reset();
        
        // إظهار رسالة نجاح
        showSuccessMessage('تم إرسال تهنئتك بنجاح!');
    });

    // إظهار رسالة نجاح
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    // عرض الرسائل عند تحميل الصفحة
    displayWishes();
}); 