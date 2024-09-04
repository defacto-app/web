import React from 'react';

const Loader = () => {
  return (
    <div>
      <div className="spinner"></div>
      <style>{`
        .spinner {
          position: relative;
          width: 22.4px;
          height: 22.4px;
        }

        .spinner::before,
        .spinner::after {
          --radius: 250;
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          animation: spinner-w7nm60 2s infinite linear;
          background: #474bff;
          border-radius: 50%;
        }

        .spinner::before {
          --radius: -250;
          background: #dbdcef;
        }

        @keyframes spinner-w7nm60 {
          0% {
            transform: scale(1) rotate(0deg) translateY(calc(var(--radius) * 1%));
          }

          50% {
            transform: scale(0.5) rotate(1440deg) translateY(0);
          }

          100% {
            transform: scale(1) rotate(2920deg) translateY(calc(var(--radius) * 1%));
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
