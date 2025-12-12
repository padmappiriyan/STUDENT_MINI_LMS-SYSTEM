import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url(/BackGround_Image/Learning.png)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="bg-white/10 rounded-lg shadow-2xl p-8 w-full max-w-md backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
