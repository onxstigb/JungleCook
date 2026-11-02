import './scss/styles.scss';
import { loadPage } from './model/model.js';

function changeRoute() {
    let hashtag = window.location.hash;
    let pageID = hashtag.replace('#', '');

    if (!pageID) {
        pageID = 'home';
    }

    loadPage(pageID);

    const navigation = document.querySelector('#navigation');
    const menuToggle = document.querySelector('#menuToggle');

    navigation?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
}

function initApp() {

    if (!window.location.hash) {
        window.location.hash = 'home';
    }

    window.addEventListener('hashchange', changeRoute);

    const menuToggle = document.querySelector('#menuToggle');
    const navigation = document.querySelector('#navigation');

    menuToggle?.addEventListener('click', () => {
        const isOpen = navigation.classList.toggle('open');

        menuToggle.setAttribute('aria-expanded', isOpen);
    });

    changeRoute();
}

initApp();

