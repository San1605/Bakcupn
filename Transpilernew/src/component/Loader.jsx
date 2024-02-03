import React from 'react'

function Loader({className,text}) {
  return (
    <div className={`${className} w-full flex flex-col gap-2 items-center justify-center`}>
      <span className="loader"></span>
      {
        text && <span>{text}</span>
      }
    </div>
  );
}

export default Loader
