// الحصول على زر التبديل بين الوضع الليلي والوضع العادي
const darkModeToggle = document.getElementById('dark-mode-toggle');

// التحقق من الوضع الحالي المخزن في التخزين المحلي
const currentMode = localStorage.getItem('darkMode');

// إضافة تأثير الانتقال عند تغيير الألوان
document.body.style.transition = "background-color 0.5s ease, color 0.5s ease";

// إذا كان الوضع الليلي مفعلاً، يتم تفعيله عند تحميل الصفحة
if (currentMode === 'enabled') {
    enableDarkMode();
}

// إضافة مستمع حدث للنقر على زر التبديل بين الوضعين
// يقوم بتفعيل أو تعطيل الوضع الليلي بناءً على الوضع الحالي
darkModeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    if (isDarkMode) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

// دالة لتفعيل الوضع الليلي
function enableDarkMode() {
    // إضافة الفئة الخاصة بالوضع الليلي إلى عناصر الصفحة
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('darkMode', 'enabled');

    document.querySelectorAll('*').forEach(element => {
        element.classList.add('dark-mode');
    });
}

// دالة لتعطيل الوضع الليلي
function disableDarkMode() {
    // إزالة الفئة الخاصة بالوضع الليلي من عناصر الصفحة
    document.body.classList.remove('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', 'disabled');

    document.querySelectorAll('*').forEach(element => {
        element.classList.remove('dark-mode');
    });
}