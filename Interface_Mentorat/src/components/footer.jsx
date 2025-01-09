import React from 'react';

const Footer = () => {
    return (
        <footer className="text-center py-4 bg-gray-200">
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </footer>
    );
};

export default Footer;