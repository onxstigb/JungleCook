const pages = import.meta.glob('../pages/*.js');

export async function loadPage(pageID) {
    const app = document.querySelector('#app');

    if (!app) {
        console.error('App container not found.');
        return;
    }

    const path = `../pages/${pageID}.js`;

    if (!pages[path]) {
        app.innerHTML = '<h1>404 - Page Not Found</h1>';
        return;
    }

    try {
        const module = await pages[path]();

        app.innerHTML = module.default();

        document.body.classList.toggle(
            'login-active',
            pageID === 'login'
        );
    } catch (error) {
        console.error('Error loading page:', error);
        app.innerHTML = '<h1>Unable to load page.</h1>';
    }
}
