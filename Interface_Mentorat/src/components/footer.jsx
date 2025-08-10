import React from 'react';

const Footer = () => {
    return (
        <footer className="text-center py-4 bg-gray-200">
            <p>&copy; {new Date().getFullYear()} Mentoors. All rights reserved.</p>
            <p>Made with ❤️ by <a href="https://www.linkedin.com/in/faroukyounsi/" target="_blank" rel="noopener noreferrer">Younsi Farouk</a></p>   
        </footer>
    );
};

export default Footer;