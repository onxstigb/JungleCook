export default function login() {
    return `
        <section class="login-page">

            <div class="login-container">

                <!-- LOGIN SECTION -->
                <div class="login-section">

                    <h1>Login Here!</h1>

                    <form class="login-form">

                        <div class="form-group">
                            <label for="login-email">Email Address</label>
                            <input
                                type="email"
                                id="login-email"
                                name="email"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label for="login-password">Password</label>
                            <input
                                type="password"
                                id="login-password"
                                name="password"
                                required
                            >
                        </div>

                        <button type="submit" class="form-button">
                            Login
                        </button>

                    </form>

                </div>


                <!-- SIGN UP SECTION -->
                <div class="signup-section">

                    <div class="signup-heading">
                        <p>don't have an account?</p>
                        <h2>Sign Up!</h2>
                    </div>

                    <form class="signup-form">

                        <div class="form-group">
                            <label for="signup-firstname">First Name</label>
                            <input
                                type="text"
                                id="signup-firstname"
                                name="firstName"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label for="signup-lastname">Last Name</label>
                            <input
                                type="text"
                                id="signup-lastname"
                                name="lastName"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label for="signup-email">Email Address</label>
                            <input
                                type="email"
                                id="signup-email"
                                name="email"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label for="signup-password">Password</label>
                            <input
                                type="password"
                                id="signup-password"
                                name="password"
                                required
                            >
                        </div>

                        <button type="submit" class="form-button">
                            Sign Up
                        </button>

                    </form>

                </div>

            </div>

        </section>
    `;
}
