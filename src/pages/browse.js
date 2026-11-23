import recipes from '../data/recipes.json';

const recipeImages = import.meta.glob(
    '../assets/images/*',
    {
        eager: true,
        query: '?url',
        import: 'default'
    }
);

const timeIcon = new URL('../assets/images/time.svg', import.meta.url).href;
const servingsIcon = new URL('../assets/images/servings.svg', import.meta.url).href;

export default function browse() {
    const recipeCards = recipes.map((recipe) => {
        const imagePath = `../assets/images/${recipe.image}`;
        const imageURL = recipeImages[imagePath];

        return `
            <article class="recipe-card">
                <img
                    class="recipe-card-image"
                    src="${imageURL}"
                    alt="${recipe.name}"
                >

                <div class="recipe-card-info">
                    <h2>${recipe.name}</h2>

                    <p class="recipe-card-description">
                        ${recipe.description}
                    </p>

                    <div class="recipe-card-meta">
                        <div>
                            <img src="${timeIcon}" alt="">
                            <span>${recipe.totalTime}</span>
                        </div>

                        <div>
                            <img src="${servingsIcon}" alt="">
                            <span>${recipe.servings} servings</span>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    return `
        <section class="browse-page">
            <div class="browse-container">

                <h1 class="browse-heading">
                    Recipes: Try some today!
                </h1>

                <div class="recipe-grid">
                    ${recipeCards}
                </div>

            </div>
        </section>
    `;
}
