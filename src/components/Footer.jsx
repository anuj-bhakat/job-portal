import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center text-gray-600 py-4 mt-10">
      <p>&copy; {new Date().getFullYear()} JobConnect. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
