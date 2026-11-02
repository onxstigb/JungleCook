const pages = import.meta.glob('../pages/*.js');

export async function loadPage(pageID) {
    const app = document.querySelector('#app');
    const path = `../pages/${pageID}.js`;

    if (!pages[path]) {
        app.innerHTML = `<h1>404 - Page Not Found</h1>`;
        return;
    }

    const module = await pages[path]();

    app.innerHTML = module.default();

    document.body.classList.toggle(
        'login-active',
        pageID === 'login'
    );
}
