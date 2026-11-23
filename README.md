# The Jungle Cook

## Project Description

The Jungle Cook is a responsive recipe website created for N315. This project builds upon the original Homework 6 prototype and expands it into a fully functional recipe application using Firebase Authentication and Cloud Firestore.

Users can create an account, log in, browse sample recipes provided in a local JSON file, and manage their own recipes. Signed-in users can create, view, edit, and delete personal recipes. The website includes responsive layouts for desktop and tablet screen sizes, including the required 1024 × 768 viewport.

## Project Links

- **GitHub Repository:** https://github.com/onxstigb/JungleCook
- **Live Web4 Website:** 

## Features

### Website and Navigation
- Responsive Home page.
- Responsive Login and Sign Up pages.
- Browse page displaying sample recipes from a local JSON file.
- Your Recipes page displaying recipes created by the signed-in user.
- Individual View Recipe page.
- Edit Recipe page.
- Reusable header and footer.
- Dynamic navigation that updates based on authentication status.
- JavaScript hash-based navigation between pages.
- Responsive navigation menu for smaller screens.
- SCSS styling organized into separate files.

### Firebase Authentication
- User registration using first name, last name, email, and password.
- User login using email and password.
- User logout.
- Navigation options update based on whether a user is signed in.

### Recipe Management

Signed-in users can:
- Create a recipe with a name, description, image, total time, servings, ingredients, and instructions.
- View their saved recipes.
- Open an individual recipe to see its details.
- Edit existing recipe information.
- Replace recipe images.
- Add additional ingredient and instruction fields.
- Delete a recipe after confirming the action.

Personal recipes are stored in the Cloud Firestore `recipes` collection and associated with the Firebase user ID of the person who created them. The application retrieves the signed-in user's recipes and checks recipe ownership before allowing updates or deletion.

### Recipe Data and Images
- Sample recipes are stored in a local JSON file and displayed on the Browse page.
- User-created recipes are stored in Cloud Firestore.
- Recipe images are selected using a file input.
- Images are resized and compressed in the browser using the Canvas API before being saved.
- Compressed image data is stored in the Firestore recipe document. Firebase Storage is not used.

### User Feedback
- The application displays feedback when recipe data is loading or being saved.
- Success messages confirm completed actions.
- Error messages inform users when an operation cannot be completed.
- A confirmation prompt appears before a recipe is deleted.

### Responsive Design
- Responsive layouts for desktop and tablet screen sizes.
- Navigation adapts to smaller screens.
- Recipe cards and forms adjust to different viewport sizes.
- Designed to support the required 1024 × 768 tablet viewport.

## Technologies Used

- HTML5
- SCSS / CSS
- JavaScript (ES modules)
- Vite
- Firebase Authentication
- Cloud Firestore
- JSON
- Git and GitHub

## Project Structure

```text
JungleCook/
├── public/
│   └── logo.svg
├── src/
│   ├── assets/
│   │   └── images/
│   ├── data/
│   │   └── recipes.json
│   ├── model/
│   │   ├── model.js
│   │   └── recipeModel.js
│   ├── pages/
│   │   ├── home.js
│   │   ├── login.js
│   │   ├── browse.js
│   │   ├── createRecipe.js
│   │   ├── your-recipes.js
│   │   ├── viewRecipe.js
│   │   └── editRecipe.js
│   ├── services/
│   │   ├── auth.js
│   │   └── firebase.js
│   ├── scss/
│   │   ├── structure.scss
│   │   ├── header.scss
│   │   ├── home.scss
│   │   ├── footer.scss
│   │   ├── login.scss
│   │   ├── browse.scss
│   │   ├── createRecipe.scss
│   │   ├── yourRecipes.scss
│   │   ├── viewRecipe.scss
│   │   ├── editRecipe.scss
│   │   └── styles.scss
│   └── main.js
├── .env
├── .gitignore
├── index.html
├── package.json
└── README.md

