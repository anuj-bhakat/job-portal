import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-center text-gray-600 py-4">
      <p>&copy; {new Date().getFullYear()} JobConnect. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
