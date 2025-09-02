// main.js

// 1. كائن تهيئة Firebase الخاص بمشروعك (amoali2)
// هذا الكود هو الذي قدمته لي سابقاً، وهو ضروري لربط تطبيقك بـ Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBa100lc6QEu0GtII4ABZAvIVrnfmcvJgY",
  authDomain: "amoali2.firebaseapp.com",
  projectId: "amoali2",
  storageBucket: "amoali2.firebasestorage.app",
  messagingSenderId: "438355821517",
  appId: "1:438355821517:web:2498ac45e0cc839ff37a84",
  measurementId: "G-6MSLB0DD1B" // اختياري إذا لم تستخدم Google Analytics
};

// 2. تهيئة تطبيق Firebase
// بما أننا نستخدم -compat.js، فإن الكائن 'firebase' سيكون متاحاً عالمياً.
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); // الحصول على خدمة المصادقة

// 3. الحصول على عناصر DOM (واجهة المستخدم)
const authStatusElement = document.getElementById('authStatus');
const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');
const resetPasswordSection = document.getElementById('resetPasswordSection');
const loggedInSection = document.getElementById('loggedInSection');
const userEmailElement = document.getElementById('userEmail');

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const resetPasswordForm = document.getElementById('resetPasswordForm');

const showRegisterLink = document.getElementById('showRegister');
const showResetPasswordLink = document.getElementById('showResetPassword');
const showLoginFromRegisterLink = document.getElementById('showLoginFromRegister');
const showLoginFromResetLink = document.getElementById('showLoginFromReset');
const signOutBtn = document.getElementById('signOutBtn');

// 4. وظيفة لعرض الرسائل (نجاح أو خطأ)
function displayMessage(message, type) {
    authStatusElement.textContent = message;
    authStatusElement.className = `message ${type}`;
}

// 5. وظيفة لتبديل عرض الأقسام المختلفة
function showSection(sectionId) {
    const sections = [loginSection, registerSection, resetPasswordSection, loggedInSection];
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    // مسح الرسائل عند التبديل بين الأقسام
    displayMessage('', ''); 
}

// 6. الاستماع إلى تغيير حالة المصادقة (هل المستخدم مسجل دخول أم لا)
// استخدام firebase.auth().onAuthStateChanged بدلاً من onAuthStateChanged المستورد
auth.onAuthStateChanged((user) => {
    if (user) {
        // المستخدم مسجل دخول
        userEmailElement.textContent = user.email;
        showSection('loggedInSection');
        displayMessage('تم تسجيل الدخول بنجاح.', 'success');
    } else {
        // المستخدم غير مسجل دخول
        showSection('loginSection');
        displayMessage('الرجاء تسجيل الدخول أو إنشاء حساب جديد.', '');
    }
});

// 7. معالجة نموذج تسجيل الدخول
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    const email = loginForm.loginEmail.value;
    const password = loginForm.loginPassword.value;

    try {
        // استخدام firebase.auth().signInWithEmailAndPassword
        await auth.signInWithEmailAndPassword(email, password);
        // الحالة ستتم معالجتها بواسطة onAuthStateChanged
    } catch (error) {
        displayMessage(`خطأ في تسجيل الدخول: ${error.message}`, 'error');
    }
});

// 8. معالجة نموذج تسجيل حساب جديد
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = registerForm.registerEmail.value;
    const password = registerForm.registerPassword.value;

    try {
        // استخدام firebase.auth().createUserWithEmailAndPassword
        await auth.createUserWithEmailAndPassword(email, password);
        // الحالة ستتم معالجتها بواسطة onAuthStateChanged
    } catch (error) {
        displayMessage(`خطأ في تسجيل الحساب: ${error.message}`, 'error');
    }
});

// 9. معالجة نموذج استعادة كلمة المرور
resetPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = resetPasswordForm.resetEmail.value;

    try {
        // استخدام firebase.auth().sendPasswordResetEmail
        await auth.sendPasswordResetEmail(email);
        displayMessage('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد.', 'success');
        resetPasswordForm.reset(); // مسح حقل البريد الإلكتروني
    } catch (error) {
        displayMessage(`خطأ في إرسال رابط الاستعادة: ${error.message}`, 'error');
    }
});

// 10. معالجة زر تسجيل الخروج
signOutBtn.addEventListener('click', async () => {
    try {
        // استخدام firebase.auth().signOut
        await auth.signOut();
        displayMessage('تم تسجيل الخروج بنجاح.', 'success');
        // onAuthStateChanged سيتكفل بالعودة لواجهة تسجيل الدخول
    } catch (error) {
        displayMessage(`خطأ في تسجيل الخروج: ${error.message}`, 'error');
    }
});

// 11. أزرار التبديل بين الأقسام
showRegisterLink.addEventListener('click', () => showSection('registerSection'));
showResetPasswordLink.addEventListener('click', () => showSection('resetPasswordSection'));
showLoginFromRegisterLink.addEventListener('click', () => showSection('loginSection'));
showLoginFromResetLink.addEventListener('click', () => showSection('loginSection'));
