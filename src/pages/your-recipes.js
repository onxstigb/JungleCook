import { getUserRecipes } from '../model/recipeModel.js';
import { auth } from '../services/firebase.js';

const timeIcon = new URL(
    '../assets/images/time.svg',
    import.meta.url
).href;

const servingsIcon = new URL(
    '../assets/images/servings.svg',
    import.meta.url
).href;

export default function yourRecipes() {
    const user = auth.currentUser;
    const firstName = user?.displayName?.split(' ')[0] || 'there';

    return `
        <section class="your-recipes-page">
            <div class="your-recipes-container">

                <h1 class="your-recipes-greeting">
                    Hey ${escapeHTML(firstName)}, here are your recipes!
                </h1>

                <div id="your-recipes-list">
                    <p>Loading your recipes...</p>
                </div>

            </div>
        </section>
    `;
}


export async function init() {
    const recipeList = document.querySelector(
        '#your-recipes-list'
    );

    if (!recipeList) return;

    try {
        const recipes = await getUserRecipes();

        if (recipes.length === 0) {
            recipeList.innerHTML = `
                <p>You haven't created any recipes yet.</p>
                <a href="#createRecipe">Create your first recipe</a>
            `;

            return;
        }

        recipeList.innerHTML = recipes.map((recipe) => `
            <div class="your-recipe-item">

                <article class="your-recipe-card">

                    <div class="your-recipe-image-container">

                        <img
                            class="your-recipe-image"
                            src="${recipe.image}"
                            alt="Photo of ${escapeHTML(recipe.name)}"
                        >

                        <a
                            href="#view-recipe/${encodeURIComponent(recipe.id)}"
                            class="view-recipe-button"
                        >
                            View
                        </a>

                    </div>

                    <div class="your-recipe-info">

                        <h2>${escapeHTML(recipe.name)}</h2>

                        <p class="your-recipe-description">
                            ${escapeHTML(recipe.description)}
                        </p>

                        <div class="your-recipe-meta">

                            <div>
                                <img src="${timeIcon}" alt="">
                                <span>${escapeHTML(recipe.totalTime)}</span>
                            </div>

                            <div>
                                <img src="${servingsIcon}" alt="">
                                <span>${recipe.servings} servings</span>
                            </div>

                        </div>

                    </div>

                </article>

                <div class="your-recipe-actions">
                    <a
                        href="#edit-recipe/${encodeURIComponent(recipe.id)}"
                        class="edit-recipe-button"
                    >
                        Edit Recipe
                    </a>

                    <button
                        type="button"
                        class="delete-recipe-button"
                        data-delete-recipe="${escapeHTML(recipe.id)}"
                    >
                        Delete
                    </button>

                </div>

            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading recipes:', error);

        recipeList.innerHTML = `
            <p>Unable to load your recipes. Please try again.</p>
        `;
    }
}


function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => {
        const characters = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };

        return characters[character];
    });
}

