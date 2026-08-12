import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            console.log("Backend Response:", data);

            if (!response.ok) {
                alert(data.message);
                return;
            }

            // Save JWT token
            localStorage.setItem("token", data.token);

            // Save user information
            localStorage.setItem("user", JSON.stringify(data.user));

            console.log("Token saved:", data.token);
            console.log("User:", data.user);

            alert("Login successful!");
            navigate("/dashboard");

        } catch (error) {
            console.error("Login Error:", error);
            alert("Cannot connect to backend server");
        }
    };

    return (
        <div>
            <h1>Intern-U Login</h1>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <br />

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>

                <br />

                <div>
                    <label>Password</label>
                    <br />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>

                <br />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;