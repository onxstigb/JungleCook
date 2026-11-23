import './scss/styles.scss';

import { loadPage } from './model/model.js';

import {
    createRecipe as createRecipeRecord,
    updateRecipe,
    deleteRecipe
} from './model/recipeModel.js';

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
        { text: 'Create Recipe', href: '#createRecipe' }
    ];

    if (user) {
        links.push({
            text: 'Your Recipes',
            href: '#your-recipes'
        });
    } else {
        links.push({
            text: 'Login',
            href: '#login',
            className: 'login-button'
        });
    }

    navigation.innerHTML = '';

    links.forEach((link) => {
        const anchor = document.createElement('a');

        anchor.textContent = link.text;
        anchor.href = link.href;

        if (link.className) {
            anchor.classList.add(link.className);
        }

        navigation.appendChild(anchor);
    });

    // Add logout link for signed-in users
    if (user) {
        const logoutLink = document.createElement('a');

        logoutLink.textContent = 'Log Out';
        logoutLink.href = '#logout';
        logoutLink.classList.add('login-button');
        logoutLink.dataset.logout = 'true';

        navigation.appendChild(logoutLink);
    }

    updateActiveNavigation();
}


function updateActiveNavigation() {
    const currentPage = window.location.hash || '#home';

    const navigationLinks = document.querySelectorAll(
        '#navigation a'
    );

    navigationLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === currentPage;

        link.classList.toggle('active', isActive);

        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}


function changeRoute() {
    const currentRoute = window.location.hash.replace('#', '');

    const [routeName] = currentRoute.split('/');

    let pageID = routeName || 'home';

    // View Recipe page
    if (routeName === 'view-recipe') {
        pageID = 'viewRecipe';
    }

    // Edit Recipe page
    if (routeName === 'edit-recipe') {
        pageID = 'editRecipe';
    }

    // Handle logout route
    if (pageID === 'logout') {
        logout();
        window.location.hash = 'home';
        return;
    }

    updateActiveNavigation();

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


function handleAddField(event) {
    const button = event.target.closest('[data-add]');

    if (!button) return;

    const type = button.dataset.add;

    const listId = button.dataset.list || `${type}-list`;

    const list = document.getElementById(listId);

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
}


async function compressImage(file) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        const imageURL = URL.createObjectURL(file);

        image.onload = () => {
            const canvas = document.createElement('canvas');

            const maxSize = 800;

            const scale = Math.min(
                1,
                maxSize / Math.max(image.width, image.height)
            );

            canvas.width = Math.round(image.width * scale);
            canvas.height = Math.round(image.height * scale);

            const context = canvas.getContext('2d');

            context.drawImage(
                image,
                0,
                0,
                canvas.width,
                canvas.height
            );

            URL.revokeObjectURL(imageURL);

            const compressedImage = canvas.toDataURL(
                'image/jpeg',
                0.7
            );

            if (compressedImage.length > 700000) {
                reject(new Error(
                    'Image is too large. Please choose a smaller image.'
                ));

                return;
            }

            resolve(compressedImage);
        };

        image.onerror = () => {
            URL.revokeObjectURL(imageURL);

            reject(new Error(
                'Unable to process this image.'
            ));
        };

        image.src = imageURL;
    });
}


function handleRecipeImageChange(event) {
    const imageInputs = [
        'recipe-image',
        'edit-recipe-image'
    ];

    if (!imageInputs.includes(event.target.id)) return;

    const file = event.target.files[0];

    const nameDisplayId = event.target.id === 'edit-recipe-image'
        ? '#edit-selected-image-name'
        : '#selected-image-name';

    const nameDisplay = document.querySelector(nameDisplayId);

    if (nameDisplay) {
        nameDisplay.textContent = file
            ? file.name
            : '';
    }
}


async function handleCreateRecipeSubmit(event) {
    const form = event.target;

    if (!form.matches('#create-recipe-form')) return;

    event.preventDefault();

    const message = form.querySelector('#recipe-form-message');

    const formData = new FormData(form);
    const imageFile = formData.get('recipeImage');

    message.textContent = 'Saving your recipe...';

    try {
        if (!imageFile || !imageFile.size) {
            throw new Error('Please attach a recipe image.');
        }

        if (!imageFile.type.startsWith('image/')) {
            throw new Error('Please select a valid image file.');
        }

        const image = await compressImage(imageFile);

        const recipeData = {
            name: formData.get('recipeName').trim(),
            description: formData.get('recipeDescription').trim(),
            image,
            totalTime: formData.get('recipeTime').trim(),
            servings: Number(formData.get('recipeServing')),
            ingredients: formData.getAll('ingredients[]'),
            instructions: formData.getAll('instructions[]')
        };

        await createRecipeRecord(recipeData);

        message.textContent =
            'Your recipe was created successfully!';

        form.reset();

        const nameDisplay = document.querySelector(
            '#selected-image-name'
        );

        if (nameDisplay) {
            nameDisplay.textContent = '';
        }

    } catch (error) {
        console.error('Recipe creation error:', error);

        message.textContent =
            error.message ||
            'Unable to save your recipe. Please try again.';
    }
}


async function handleEditRecipeSubmit(event) {
    const form = event.target;

    if (!form.matches('#edit-recipe-form')) return;

    event.preventDefault();

    const recipeId = form.dataset.recipeId;
    const formData = new FormData(form);
    const imageFile = formData.get('recipeImage');

    try {
        let image = form.dataset.currentImage;

        if (imageFile && imageFile.size > 0) {
            if (!imageFile.type.startsWith('image/')) {
                alert('Please select a valid image file.');
                return;
            }

            image = await compressImage(imageFile);
        }

        const recipeData = {
            name: formData.get('recipeName').trim(),
            description: formData.get('recipeDescription').trim(),
            image,
            totalTime: formData.get('recipeTime').trim(),
            servings: Number(formData.get('recipeServing')),
            ingredients: formData.getAll('ingredients[]'),
            instructions: formData.getAll('instructions[]')
        };

        await updateRecipe(recipeId, recipeData);

        alert('Recipe updated successfully!');

        window.location.hash = 'your-recipes';

    } catch (error) {
        console.error('Error updating recipe:', error);

        alert(
            error.message ||
            'Unable to update recipe. Please try again.'
        );
    }
}

async function handleDeleteRecipe(event) {
    const button = event.target.closest('[data-delete-recipe]');

    if (!button) return;

    const recipeId = button.dataset.deleteRecipe;

    const confirmed = confirm(
        'Are you sure you want to delete this recipe? This action cannot be undone.'
    );

    if (!confirmed) return;

    try {
        button.disabled = true;
        button.textContent = 'Deleting...';

        await deleteRecipe(recipeId);

        alert('Recipe deleted successfully!');

        window.location.hash = 'your-recipes';

        changeRoute();

    } catch (error) {
        console.error('Error deleting recipe:', error);

        alert(
            error.message ||
            'Unable to delete recipe. Please try again.'
        );

        button.disabled = false;
        button.textContent = 'Delete';
    }
}


function initApp() {
    if (!window.location.hash) {
        window.location.hash = 'home';
    }

    window.addEventListener('hashchange', changeRoute);

    document.addEventListener('submit', handleAuthSubmit);
    document.addEventListener('submit', handleCreateRecipeSubmit);
    document.addEventListener('submit', handleEditRecipeSubmit);

    document.addEventListener('change', handleRecipeImageChange);

    document.querySelector('#navigation')?.addEventListener(
        'click',
        handleLogout
    );

    document.addEventListener('click', handleAddField);
    document.addEventListener('click', handleDeleteRecipe);

    const menuToggle = document.querySelector('#menuToggle');
    const navigation = document.querySelector('#navigation');

    menuToggle?.addEventListener('click', () => {
        if (!navigation) return;

        const isOpen = navigation.classList.toggle('open');

        menuToggle.setAttribute('aria-expanded', isOpen);
    });

    checkAuthState((user) => {
        updateNavigation(user);
    });

    changeRoute();
}

initApp();
