// public/main.js

// 1. معلومات تهيئة مشروع Firebase الخاص بك
// تم تحديث هذه القيم ببيانات مشروعك amoali2
const firebaseConfig = {
    apiKey: "AIzaSyBa100lc6QEu0GtII4ABZAvIVrnfmcvJgY",
    authDomain: "amoali2.firebaseapp.com",
    projectId: "amoali2",
    storageBucket: "amoali2.firebasestorage.app",
    messagingSenderId: "438355821517",
    appId: "1:438355821517:web:2498ac45e0cc839ff37a84",
    measurementId: "G-6MSLB0DD1B"
};

// 2. تهيئة Firebase
firebase.initializeApp(firebaseConfig);

// الحصول على مثيل Auth
const auth = firebase.auth();

// 3. الحصول على عناصر الواجهة (UI Elements) من HTML
const authStatus = document.getElementById('authStatus');
const loggedInSection = document.getElementById('loggedInSection');
const userEmailSpan = document.getElementById('userEmail');
const signOutBtn = document.getElementById('signOutBtn');

const loginSection = document.getElementById('loginSection');
const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const showRegisterLink = document.getElementById('showRegister');
const showResetPasswordLink = document.getElementById('showResetPassword');

const registerSection = document.getElementById('registerSection');
const registerForm = document.getElementById('registerForm');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const showLoginFromRegisterLink = document.getElementById('showLoginFromRegister');

const resetPasswordSection = document.getElementById('resetPasswordSection');
const resetPasswordForm = document.getElementById('resetPasswordForm');
const resetEmail = document.getElementById('resetEmail');
const showLoginFromResetLink = document.getElementById('showLoginFromReset');

// 4. وظيفة لعرض الرسائل
function displayMessage(message, type) {
    authStatus.textContent = message;
    authStatus.className = `message ${type}`; // يضيف كلاس success أو error
    authStatus.style.display = 'block'; // للتأكد من ظهورها
}

// 5. وظيفة لتبديل عرض الأقسام
function showSection(sectionId) {
    const sections = [loggedInSection, loginSection, registerSection, resetPasswordSection];
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    authStatus.style.display = 'none'; // إخفاء الرسائل عند التبديل بين الأقسام
}

// 6. الاستماع لتغييرات حالة المصادقة (مهم جداً لتحديث الواجهة)
auth.onAuthStateChanged(function(user) {
    if (user) {
        // المستخدم مسجل الدخول
        userEmailSpan.textContent = user.email;
        showSection('loggedInSection');
        displayMessage(`أهلاً بك، ${user.email}!`, 'success');
    } else {
        // لا يوجد مستخدم مسجل الدخول
        showSection('loginSection');
        displayMessage('الرجاء تسجيل الدخول أو إنشاء حساب.', 'info');
    }
});

// 7. التعامل مع تسجيل الدخول
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    const email = loginEmail.value;
    const password = loginPassword.value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        // onAuthStateChanged سيتكفل بتحديث الواجهة
        displayMessage('تم تسجيل الدخول بنجاح!', 'success');
        loginEmail.value = ''; // مسح الحقول بعد التسجيل
        loginPassword.value = '';
    } catch (error) {
        console.error("خطأ في تسجيل الدخول:", error);
        displayMessage(`خطأ في تسجيل الدخول: ${error.message}`, 'error');
    }
});

// 8. التعامل مع تسجيل حساب جديد
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = registerEmail.value;
    const password = registerPassword.value;

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        // onAuthStateChanged سيتكفل بتحديث الواجهة
        displayMessage('تم إنشاء الحساب بنجاح وتسجيل الدخول!', 'success');
        registerEmail.value = ''; // مسح الحقول بعد التسجيل
        registerPassword.value = '';
    } catch (error) {
        console.error("خطأ في إنشاء الحساب:", error);
        displayMessage(`خطأ في إنشاء الحساب: ${error.message}`, 'error');
    }
});

// 9. التعامل مع تسجيل الخروج
signOutBtn.addEventListener('click', async () => {
    try {
        await auth.signOut();
        // onAuthStateChanged سيتكفل بتحديث الواجهة
        displayMessage('تم تسجيل الخروج بنجاح.', 'success');
    } catch (error) {
        console.error("خطأ في تسجيل الخروج:", error);
        displayMessage(`خطأ في تسجيل الخروج: ${error.message}`, 'error');
    }
});

// 10. التعامل مع استعادة كلمة المرور
resetPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = resetEmail.value;

    try {
        await auth.sendPasswordResetEmail(email);
        displayMessage('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني.', 'success');
        resetEmail.value = ''; // مسح الحقل
        showSection('loginSection'); // العودة لصفحة تسجيل الدخول
    } catch (error) {
        console.error("خطأ في إرسال رابط الاستعادة:", error);
        displayMessage(`خطأ: ${error.message}`, 'error');
    }
});

// 11. إضافة مستمعي الأحداث لتبديل الأقسام
showRegisterLink.addEventListener('click', () => showSection('registerSection'));
showLoginFromRegisterLink.addEventListener('click', () => showSection('loginSection'));
showResetPasswordLink.addEventListener('click', () => showSection('resetPasswordSection'));
showLoginFromResetLink.addEventListener('click', () => showSection('loginSection'));
