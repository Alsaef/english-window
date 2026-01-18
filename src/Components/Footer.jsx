import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 h-20">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by <a href="https://developer-ratul.netlify.app/" className='font-bold text-black'>Al Saef Ratul</a></p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;