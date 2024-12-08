import React, { useState, useEffect } from "react";

type ComponentProps = {
    themeProvided: string;
};

const Reports: React.FC<ComponentProps> = ({ themeProvided }) => {
    const [theme, setTheme] = useState<string>(themeProvided);
    
    useEffect(() => {
        setTheme(themeProvided);
    }, [themeProvided]);

    return (
        <div>
            <h1>Reports and Feedback</h1>
            <p>Manage user-reported content and feedback.</p>
            <ul>
            <li>Report 1: *Spam in comments*</li>
            <li>Report 2: *Plagiarism detected*</li>
            </ul>
        </div>
    );
};

export default Reports;
