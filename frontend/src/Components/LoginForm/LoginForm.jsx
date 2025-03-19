import React from "react";
import "./LoginForm.scss";

const LoginForm = () => {
    return (
        <div className="login_form">
            <div className="logo">
                <img src="/src/assets/images/Logo.PNG" alt="" />
            </div>
            <div className="title">
                <h2>Log-In</h2>
            </div>
            <form action="">
                <div className="form-field">
                    <span></span>
                    <input type="text" placeholder="Username" id="userName" name="userName" required />
                </div>
                <div className="form-field">
                    <span></span>
                    <input type="password" placeholder="Password" id="pwd" name="password" required />
                </div>
                <button class="btn mt-3">Login</button>
            </form>
            <div class="forgot">
                <a href="#">Forget password?</a>
            </div>
        </div>
    );
};

export default LoginForm;
