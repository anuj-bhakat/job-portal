import React from 'react';

const Footer = () => {
  return (
    <footer className="h-[10vh] bg-gray-700 text-center text-gray-100 py-4">
      <p>&copy; {new Date().getFullYear()} JobConnect. All rights reserved.</p>
      <p>Designed & Developed by Anuj Bhakat</p>
    </footer>
  );
};

export default Footer;
