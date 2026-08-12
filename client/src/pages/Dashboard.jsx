function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
    };

    return (
        <div>
            <h1>Intern-U Dashboard</h1>

            <h2>Welcome, {user?.name}!</h2>

            <p>Email: {user?.email}</p>

            <p>Role: {user?.role}</p>

            <br />

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Dashboard;