import React, { useEffect, useState } from "react";

export default function Alert({ message, type ,visible, setVisible}) {
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`@keyframes 
        slide{
                from { width: 0%; }
                to { width: 100%; }
            }`,
            styleSheet.cssRules.length);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer); 
  }, []);

  const alertClass = `${
    type === "success"
      ? "bg-green-100 text-green-800"
      : type === "error"
      ? "bg-red-100 text-red-800"
      : type === "info"
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-100 text-gray-800"
  }`;
  const alertSlide = `${
    type === "success"
      ? "bg-green-800"
      : type === "error"
      ? "bg-red-800"
      : type === "info"
      ? "bg-blue-800"
      : "bg-gray-800"
  }`;

  return (<>
    {visible && <div className="my-3 left-0 w-[100vw] top-14 absolute">
        <div className={`px-8 py-5 font-semibold ${alertClass}`}>
          {message}
        </div>
        <div>
          <div className={`w-full h-1 rounded overflow-hidden ${alertClass}`}>
            <div className={`h-full rounded ${alertSlide}`} 
                style={{
                    animation: 'slide 3s linear forwards'
                }}></div>
          </div>
        </div>
      </div>}</>
  );
}
