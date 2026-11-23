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

        // Initialize page-specific functionality
        if (typeof module.init === 'function') {
            await module.init();
        }

        // Update page-specific body classes
        document.body.classList.toggle(
            'login-active',
            pageID === 'login'
        );

        document.body.classList.toggle(
            'create-recipe-active',
            pageID === 'createRecipe'
        );

        document.body.classList.toggle(
            'browse-active',
            pageID === 'browse'
        );

        document.body.classList.toggle(
        'your-recipes-active',
        pageID === 'your-recipes'
        );

        document.body.classList.toggle(
        'view-recipe-active',
        pageID === 'viewRecipe'
        );

        document.body.classList.toggle(
        'edit-recipe-active',
        pageID === 'editRecipe'
        );

    } catch (error) {
        console.error('Error loading page:', error);
        app.innerHTML = '<h1>Unable to load page.</h1>';
    }
}
