// Simple interactivity for Floréa mock website

document.addEventListener('DOMContentLoaded', () => {
    // 1. Drag to scroll for category pills
    const categoryNav = document.querySelector('.category-list');
    if (categoryNav) {
        let isDown = false;
        let startX;
        let scrollLeft;

        categoryNav.addEventListener('mousedown', (e) => {
            isDown = true;
            categoryNav.style.cursor = 'grabbing';
            startX = e.pageX - categoryNav.offsetLeft;
            scrollLeft = categoryNav.scrollLeft;
        });
        
        categoryNav.addEventListener('mouseleave', () => {
            isDown = false;
            categoryNav.style.cursor = 'grab';
        });
        
        categoryNav.addEventListener('mouseup', () => {
            isDown = false;
            categoryNav.style.cursor = 'grab';
        });
        
        categoryNav.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - categoryNav.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            categoryNav.scrollLeft = scrollLeft - walk;
        });
    }

    // 2. Prevent default on mock links
    const dummyLinks = document.querySelectorAll('a[href="#"]');
    dummyLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });

    // 3. Simple quantity toggle in Cart
    const minuses = document.querySelectorAll('.ph-minus');
    const pluses = document.querySelectorAll('.ph-plus');
    
    minuses.forEach(minus => {
        minus.parentElement.addEventListener('click', (e) => {
            e.preventDefault();
            const span = minus.parentElement.nextElementSibling;
            if(span && span.tagName === 'SPAN') {
                let val = parseInt(span.innerText);
                if(val > 1) span.innerText = val - 1;
            }
        });
    });

    pluses.forEach(plus => {
        plus.parentElement.addEventListener('click', (e) => {
            e.preventDefault();
            const span = plus.parentElement.previousElementSibling;
            if(span && span.tagName === 'SPAN') {
                let val = parseInt(span.innerText);
                span.innerText = val + 1;
            }
        });
    });
});
