import { getRecipeById } from '../model/recipeModel.js';

export default function viewRecipe() {
    return `
        <section class="view-recipe-page">
            <div class="view-recipe-container" id="view-recipe-content">
                <p>Loading recipe...</p>
            </div>
        </section>
    `;
}

export async function init() {
    const recipeContainer = document.querySelector('#view-recipe-content');

    if (!recipeContainer) return;

    const recipeId = decodeURIComponent(
        window.location.hash.split('/')[1] || ''
    );

    if (!recipeId) {
        recipeContainer.innerHTML = '<p>Recipe not found.</p>';
        return;
    }

    try {
        const recipe = await getRecipeById(recipeId);

        if (!recipe) {
            recipeContainer.innerHTML = '<p>Recipe not found.</p>';
            return;
        }

        const ingredients = Array.isArray(recipe.ingredients)
            ? recipe.ingredients
            : [];

        const instructions = Array.isArray(recipe.instructions)
            ? recipe.instructions
            : [];

        recipeContainer.innerHTML = `
            <div class="view-recipe-overview">
                <div class="view-recipe-image-container">
                    <h1>${escapeHTML(recipe.name)}</h1>

                    <img
                        class="view-recipe-image"
                        src="${recipe.image}"
                        alt="Photo of ${escapeHTML(recipe.name)}"
                    >
                </div>

                <div class="view-recipe-details">
                    <div>
                        <h2>Description:</h2>
                        <p>${escapeHTML(recipe.description)}</p>
                    </div>

                    <div>
                        <h2>Total Time:</h2>
                        <p>${escapeHTML(recipe.totalTime)}</p>
                    </div>

                    <div>
                        <h2>Servings:</h2>
                        <p>${recipe.servings} servings</p>
                    </div>
                </div>
            </div>

            <section class="view-recipe-section">
                <h2>Ingredients:</h2>
                <ul>
                    ${ingredients.map((ingredient) => `
                        <li>${escapeHTML(ingredient)}</li>
                    `).join('')}
                </ul>
            </section>

            <section class="view-recipe-section">
                <h2>Instructions:</h2>
                <ol>
                    ${instructions.map((instruction) => `
                        <li>${escapeHTML(instruction)}</li>
                    `).join('')}
                </ol>
            </section>

            <button
                type="button"
                class="edit-recipe-button"
                data-edit-recipe="${escapeHTML(recipe.id)}"
            >
                Edit Recipe
            </button>
        `;

    } catch (error) {
        console.error('Error loading recipe:', error);

        recipeContainer.innerHTML = `
            <p>Unable to load this recipe.</p>
            <a href="#your-recipes">Back to Your Recipes</a>
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