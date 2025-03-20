import React, { useState } from "react";
import { backendURL } from "../../API";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.scss";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(`${backendURL}/api/login/`, {
                email,
                password,
            });

            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            navigate("/dashboard");
        } catch (error) {
            setError("Invalid credentials");
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    return (
        <div className="login_form">
            <div className="logo">
                <img src="/src/assets/images/Logo.PNG" alt="" />
            </div>
            <div className="title">
                <h2>Log-In</h2>
                {error && <p className="error">{error}</p>}
            </div>
            <form onSubmit={handleLogin}>
                <div className="form-field">
                    <span></span>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        placeholder="E-mail"
                        id="email"
                        name="email"
                        required
                    />
                </div>
                <div className="form-field">
                    <span></span>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Password"
                        id="pwd"
                        name="password"
                        required
                    />
                </div>
                <button type="submit" className="btn mt-3">
                    {loading ? <span className="spinner"></span> : "Login"}
                </button>
            </form>
            <div className="forgot">
                <a href="#">Forget password?</a>
            </div>
        </div>
    );
};

export default LoginForm;
