import React from 'react';

const Loader = () => {
    return (
        <div className="flex space-x-2 justify-center items-center">
            {[0, 1, 2].map((index) => (
                <div
                    key={index}
                    className={`w-3 h-3 bg-blue-500 rounded-full animate-pulse`}
                    style={{
                        animationDelay: `${index * 0.2}s`
                    }}
                />
            ))}
        </div>
    );
};

export default Loader;