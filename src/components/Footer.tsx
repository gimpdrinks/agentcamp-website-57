
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full p-4 text-center bg-background relative z-40 mb-24">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} AgentCamp. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
