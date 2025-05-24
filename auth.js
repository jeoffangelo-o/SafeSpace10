// Simple Auth System
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = '12345';

// Initialize users in localStorage for persistence
if (typeof window !== 'undefined' && !localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify({}));
}

export function registerUser(email, password) {
    if (typeof window === 'undefined') return false;

    if (email === ADMIN_EMAIL) {
        throw new Error('Cannot register with admin email');
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[email]) {
        throw new Error('Email already registered');
    }

    users[email] = password;
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

export function loginUser(email, password) {
    // Check admin credentials first
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', email);
        return true;
    }

    // Check registered users
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[email] === password) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', email);
        return true;
    }

    return false;
}

export function checkAuth() {
    if (typeof window === 'undefined') return false;
    
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const currentPath = window.location.pathname;
    const isAuthPage = currentPath.includes('login.html') || currentPath.includes('register.html');
      if (!isAuthenticated && !isAuthPage) {
        window.location.replace('./login.html');
        return false;
    } else if (isAuthenticated && isAuthPage) {
        window.location.replace('./index.html');
        return true;
    }
    return isAuthenticated;
}

export function logout() {
    if (typeof window === 'undefined') return;
      localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    window.location.replace('./login.html');
}