# The Jungle Cook

## Project Description

The Jungle Cook is a responsive recipe website created for N315. This project builds upon the original Homework 6 prototype and adds Firebase Authentication and dynamic navigation.

The website includes a Home page and a Login page with Login and Sign Up forms. The design is responsive and adapts to desktop, tablet, and mobile screen sizes.

## Features

- Responsive Home page layout
- Responsive Login and Sign Up sections
- User registration using email and password
- User login using Firebase Authentication
- User account creation with first and last name
- Dynamic navigation that updates based on authentication status
- Navigation between pages using JavaScript routing
- Responsive navigation menu for smaller screens
- Reusable header and footer
- SCSS styling organized into separate files

## Technologies Used

- HTML5
- SCSS / CSS
- JavaScript
- Vite
- Firebase Authentication
- Git and GitHub

## Project Structure

```text
JungleCook/
├── public/
│   └── logo.svg
├── src/
│   ├── assets/
│   │   └── images/
│   ├── model/
│   │   └── model.js
│   ├── pages/
│   │   ├── home.js
│   │   └── login.js
│   ├── services/
│   │   ├── auth.js
│   │   └── firebase.js
│   ├── scss/
│   │   ├── structure.scss
│   │   ├── header.scss
│   │   ├── home.scss
│   │   ├── footer.scss
│   │   ├── login.scss
│   │   └── styles.scss
│   └── main.js
├── .env
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## Installation and Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/onxstigb/JungleCook
   ```

2. Navigate into the project folder:

   ```bash
   cd JungleCook
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root project directory and add your Firebase configuration:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. Enable Email/Password authentication in the Firebase Console under Authentication → Sign-in method.

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open the local URL provided by Vite in your browser.

## Pages

- **Home:** Introduces The Jungle Cook website.
- **Login:** Includes Login and Sign Up forms for user authentication.

## Firebase Authentication

Firebase Authentication is used to manage user accounts.

Users can:
- Create an account using their first name, last name, email, and password.
- Log in using their registered email and password.
- See navigation options update based on their authentication status.

Firebase configuration is stored in environment variables in the `.env` file.

## Building for Production

To create a production build, run:

```bash
npm run build
```

Vite generates the production-ready files inside the `dist` directory.

## Deployment

**Web4:** https://in-info-web4.luddy.indianapolis.iu.edu/~obrookin/JungleCook7/#home

## Repository
**GitHub:** https://github.com/onxstigb/JungleCook

