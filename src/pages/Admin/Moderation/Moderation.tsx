import React, { useState, useEffect } from "react";

type ComponentProps = {
    themeProvided: string;
};

const Moderation: React.FC<ComponentProps> = ({ themeProvided }) => {
    const [theme, setTheme] = useState<string>(themeProvided);
    
    useEffect(() => {
        setTheme(themeProvided);
    }, [themeProvided]);

    return (
        <div>
            <h1>Content Moderation</h1>
            <p>Approve, reject, or edit submitted posts.</p>
            <ul>
            <li>Post 1: *Flagged for inappropriate content*</li>
            <li>Post 2: *Awaiting approval*</li>
            <li>Post 3: *Approved*</li>
            </ul>
        </div>
    );
};

export default Moderation;
