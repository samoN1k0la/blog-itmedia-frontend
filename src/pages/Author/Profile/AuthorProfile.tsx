import React, { useState, useEffect } from "react";
import "./AuthorProfile.css";

type ComponentProps = {
    themeProvided: string;
};

const AuthorProfile: React.FC<ComponentProps> = ({ themeProvided }) => {
    const [theme, setTheme] = useState<string>(themeProvided);
    const [username, setUsername] = useState("John Doe");
    const [email, setEmail] = useState("john.doe@example.com");
    const [password, setPassword] = useState("");

    const handleUpdate = () => {
        alert("Profile updated successfully!");
    };

    useEffect(() => {
        setTheme(themeProvided);
    }, [themeProvided]);

    return (
        <div className="author-profile">
            <h1>My Profile</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                    />
                </label>
                <button type="button" onClick={handleUpdate}>
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default AuthorProfile;
