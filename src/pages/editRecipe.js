import { getRecipeById } from '../model/recipeModel.js';

export default function editRecipe() {
    return `
        <section class="edit-recipe-page">
            <div class="edit-recipe-container" id="edit-recipe-content">
                <p>Loading recipe...</p>
            </div>
        </section>
    `;
}

export async function init() {
    const recipeContainer = document.querySelector('#edit-recipe-content');

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
            <h1>Hey ${escapeHTML(
                recipe.userName?.split(' ')[0] || 'there'
            )}, edit your recipe!</h1>

            <form id="edit-recipe-form" data-recipe-id="${escapeHTML(recipe.id)}" data-current-image="${escapeHTML(recipe.image)}">

                <div class="edit-recipe-image-field">
                    <label for="edit-recipe-image">
                        Edit Recipe Image
                    </label>

                    <label for="edit-recipe-image" class="edit-recipe-attach">
                        Attach File
                    </label>

                    <input
                        type="file"
                        id="edit-recipe-image"
                        name="recipeImage"
                        accept="image/*"
                    >

                    <span id="edit-selected-image-name"></span>
                </div>

                <div class="edit-recipe-field">
                    <label for="edit-recipe-name">Recipe Name</label>
                    <input
                        type="text"
                        id="edit-recipe-name"
                        name="recipeName"
                        value="${escapeHTML(recipe.name)}"
                        required
                    >
                </div>

                <div class="edit-recipe-field">
                    <label for="edit-recipe-description">Description</label>
                    <textarea
                        id="edit-recipe-description"
                        name="recipeDescription"
                        required
                    >${escapeHTML(recipe.description)}</textarea>
                </div>

                <div class="edit-recipe-field">
                    <label for="edit-recipe-time">Total Time</label>
                    <input
                        type="text"
                        id="edit-recipe-time"
                        name="recipeTime"
                        value="${escapeHTML(recipe.totalTime)}"
                        required
                    >
                </div>

                <div class="edit-recipe-field">
                    <label for="edit-recipe-serving">Servings</label>
                    <input
                        type="number"
                        id="edit-recipe-serving"
                        name="recipeServing"
                        min="1"
                        value="${recipe.servings}"
                        required
                    >
                </div>

                <div class="edit-recipe-dynamic-section">
                    <h2>Edit Ingredients:</h2>

                    <div id="edit-ingredient-list">
                        ${ingredients.map((ingredient, index) => `
                            <input
                                type="text"
                                class="dynamic-recipe-field"
                                name="ingredients[]"
                                placeholder="Ingredient #${index + 1}"
                                value="${escapeHTML(ingredient)}"
                                required
                            >
                        `).join('')}
                    </div>

                    <button
                        type="button"
                        class="add-recipe-field"
                        data-add="ingredient"
                        data-list="edit-ingredient-list"
                    >
                        +
                    </button>
                </div>

                <div class="edit-recipe-dynamic-section">
                    <h2>Edit Instructions:</h2>

                    <div id="edit-instruction-list">
                        ${instructions.map((instruction, index) => `
                            <input
                                type="text"
                                class="dynamic-recipe-field"
                                name="instructions[]"
                                placeholder="Instruction #${index + 1}"
                                value="${escapeHTML(instruction)}"
                                required
                            >
                        `).join('')}
                    </div>

                    <button
                        type="button"
                        class="add-recipe-field"
                        data-add="instruction"
                        data-list="edit-instruction-list"
                    >
                        +
                    </button>
                </div>

                <button
                    type="submit"
                    class="edit-recipe-submit"
                >
                    Submit Changes
                </button>

            </form>
        `;

    } catch (error) {
        console.error('Error loading recipe for editing:', error);

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