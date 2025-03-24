// نمایش سال جاری در فوتر
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// فرم تماس
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // هنگام ارسال فرم
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'در حال ارسال...';
            submitButton.disabled = true;
            
            // جمع‌آوری داده‌های فرم
            const formData = new FormData(contactForm);
            
            try {
                // ارسال فرم به Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    // نمایش پیام موفقیت
                    formMessage.classList.add('success');
                    formMessage.classList.remove('error');
                    formMessage.textContent = 'پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.';
                    formMessage.style.display = 'block';
                    
                    // پاک کردن فرم
                    contactForm.reset();
                } else {
                    // نمایش پیام خطا
                    formMessage.classList.add('error');
                    formMessage.classList.remove('success');
                    formMessage.textContent = 'متأسفانه در ارسال پیام مشکلی پیش آمد. لطفاً دوباره تلاش کنید.';
                    formMessage.style.display = 'block';
                }
            } catch (error) {
                // نمایش پیام خطا در صورت بروز مشکل
                formMessage.classList.add('error');
                formMessage.classList.remove('success');
                formMessage.textContent = 'خطای ارتباطی رخ داد. لطفاً اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.';
                formMessage.style.display = 'block';
            } finally {
                // بازگرداندن دکمه به حالت اولیه
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
});

// تاریخ پست در صفحه پست وبلاگ
document.addEventListener('DOMContentLoaded', () => {
    const dateElement = document.querySelector('.post-date .date');
    if (dateElement && dateElement.textContent === 'تاریخ پست') {
        // اگر تاریخ پست تغییر نکرده، تاریخ امروز را نمایش بده
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = today.toLocaleDateString('fa-IR', options);
    }
}); 