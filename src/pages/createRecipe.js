export default function createRecipe() {
    return `
        <section class="create-recipe-page">
            <div class="create-recipe-container">

                <h1 class="create-recipe-greeting">
                    Hey there, create your recipe!
                </h1>

                <form class="create-recipe-form">

                    <div class="recipe-image-upload">
                        <label for="recipe-image">Add Recipe Image</label>

                        <label for="recipe-image" class="upload-button">
                            Attach File
                        </label>

                        <input
                            type="file"
                            id="recipe-image"
                            name="recipeImage"
                            accept="image/*"
                        >
                    </div>

                    <div class="recipe-basic-info">
                        <div class="recipe-form-group">
                            <label for="recipe-name">Recipe Name</label>
                            <input
                                type="text"
                                id="recipe-name"
                                name="recipeName"
                                required
                            >
                        </div>

                        <div class="recipe-form-group">
                            <label for="recipe-description">Recipe Description</label>
                            <textarea
                                id="recipe-description"
                                name="recipeDescription"
                                required
                            ></textarea>
                        </div>

                        <div class="recipe-form-group">
                            <label for="recipe-time">Recipe Total Time</label>
                            <input
                                type="text"
                                id="recipe-time"
                                name="recipeTime"
                                required
                            >
                        </div>

                        <div class="recipe-form-group">
                            <label for="recipe-serving">Recipe Serving Size</label>
                            <input
                                type="number"
                                id="recipe-serving"
                                name="recipeServing"
                                min="1"
                                required
                            >
                        </div>
                    </div>

                    <div class="recipe-list-section">
                        <label>Enter Ingredients:</label>

                        <div id="ingredient-list">
                            <div class="dynamic-recipe-field">
                                <input
                                    type="text"
                                    name="ingredients[]"
                                    placeholder="Ingredient #1"
                                    required
                                >
                            </div>

                            <div class="dynamic-recipe-field">
                                <input
                                    type="text"
                                    name="ingredients[]"
                                    placeholder="Ingredient #2"
                                    required
                                >
                            </div>

                            <div class="dynamic-recipe-field">
                                <input
                                    type="text"
                                    name="ingredients[]"
                                    placeholder="Ingredient #3"
                                    required
                                >
                            </div>
                        </div>

                        <button
                            type="button"
                            class="add-recipe-field"
                            data-add="ingredient"
                            aria-label="Add another ingredient"
                        >+</button>
                    </div>

                    <div class="recipe-list-section instructions-section">
                        <label>Enter Instructions:</label>

                        <div id="instruction-list">
                            <div class="dynamic-recipe-field">
                                <input
                                    type="text"
                                    name="instructions[]"
                                    placeholder="Instruction #1"
                                    required
                                >
                            </div>

                            <div class="dynamic-recipe-field">
                                <input
                                    type="text"
                                    name="instructions[]"
                                    placeholder="Instruction #2"
                                    required
                                >
                            </div>

                            <div class="dynamic-recipe-field">
                                <input
                                    type="text"
                                    name="instructions[]"
                                    placeholder="Instruction #3"
                                    required
                                >
                            </div>
                        </div>

                        <button
                            type="button"
                            class="add-recipe-field"
                            data-add="instruction"
                            aria-label="Add another instruction"
                        >+</button>
                    </div>

                    <button type="submit" class="create-recipe-submit">
                        Create Recipe
                    </button>

                </form>
            </div>
        </section>
    `;
}
