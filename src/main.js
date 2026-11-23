
import './scss/styles.scss';

import { loadPage } from './model/model.js';
import {
    login,
    signUp,
    logout,
    checkAuthState
} from './services/auth.js';

function updateNavigation(user) {
    const navigation = document.querySelector('#navigation');

    if (!navigation) return;

    const links = [
        { text: 'Home', href: '#home' },
        { text: 'Browse', href: '#browse' },
        { text: 'Create Recipe', href: '#recipes' }
    ];

    if (user) {
        links.push({ text: 'Your Recipes', href: '#your-recipes' });
    } else {
        links.push({ text: 'Login', href: '#login', className: 'login-button' });
    }

    navigation.innerHTML = '';

    links.forEach(link => {
        const anchor = document.createElement('a');

        anchor.textContent = link.text;
        anchor.href = link.href;

        if (link.className) {
            anchor.classList.add(link.className);
        }

        if (window.location.hash === link.href) {
            anchor.classList.add('active');
        }

        navigation.appendChild(anchor);
    });

    if (user) {
        const logoutLink = document.createElement('a');

        logoutLink.textContent = 'Log Out';
        logoutLink.href = '#logout';
        logoutLink.classList.add('login-button');
        logoutLink.dataset.logout = 'true';

        navigation.appendChild(logoutLink);
    }
}

function changeRoute() {
    let pageID = window.location.hash.replace('#', '');

    if (!pageID) {
        pageID = 'home';
    }

    loadPage(pageID);

    const navigation = document.querySelector('#navigation');
    const menuToggle = document.querySelector('#menuToggle');

    navigation?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
}

async function handleAuthSubmit(event) {
    const form = event.target;

    if (!form.matches('.login-form, .signup-form')) {
        return;
    }

    event.preventDefault();

    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    let message = form.querySelector('.auth-message');

    if (!message) {
        message = document.createElement('p');
        message.classList.add('auth-message');
        message.setAttribute('role', 'alert');
        form.appendChild(message);
    }

    message.textContent = 'Please wait...';

    try {
        if (form.classList.contains('signup-form')) {
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');

            await signUp(firstName, lastName, email, password);
        } else {
            await login(email, password);
        }

        window.location.hash = 'home';

    } catch (error) {
        console.error('Authentication error:', error);

        const errorMessages = {
            'auth/email-already-in-use':
                'An account with this email already exists.',
            'auth/invalid-email':
                'Please enter a valid email address.',
            'auth/invalid-credential':
                'Incorrect email or password.',
            'auth/weak-password':
                'Your password must be at least 6 characters.',
            'auth/network-request-failed':
                'Network error. Please try again.'
        };

        message.textContent =
            errorMessages[error.code] ||
            'Something went wrong. Please try again.';
    }
}

async function handleLogout(event) {
    const logoutLink = event.target.closest('[data-logout]');

    if (!logoutLink) return;

    event.preventDefault();

    try {
        await logout();
        window.location.hash = 'home';
    } catch (error) {
        console.error('Logout error:', error);
    }
}

function initApp() {
document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-add]');

    if (!button) return;

    const type = button.dataset.add;
    const list = document.querySelector(`#${type}-list`);

    if (!list) return;

    const count = list.querySelectorAll('input').length + 1;

    const field = document.createElement('div');
    field.classList.add('dynamic-recipe-field');

    const input = document.createElement('input');
    input.type = 'text';
    input.name = type === 'ingredient'
        ? 'ingredients[]'
        : 'instructions[]';

    input.placeholder = type === 'ingredient'
        ? `Ingredient #${count}`
        : `Instruction #${count}`;

    input.required = true;

    field.appendChild(input);
    list.appendChild(field);
    input.focus();
});

    if (!window.location.hash) {
        window.location.hash = 'home';
    }

    window.addEventListener('hashchange', changeRoute);

    document.addEventListener('submit', handleAuthSubmit);

    document.querySelector('#navigation')?.addEventListener('click', handleLogout);

    const menuToggle = document.querySelector('#menuToggle');
    const navigation = document.querySelector('#navigation');

    menuToggle?.addEventListener('click', () => {
        if (!navigation) return;

        const isOpen = navigation.classList.toggle('open');

        menuToggle.setAttribute('aria-expanded', isOpen);
    });

    checkAuthState(user => {
        updateNavigation(user);
    });

    changeRoute();
}

initApp();
