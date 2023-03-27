import React, { useState, useRef } from 'react';

export const Title = () => {
  const [editing, setEditing] = useState(false);
  const [titleText, setTitleText] = useState('Wallet Title');
  const inputRef = useRef(null); // create a reference to the input element

  const handleClick = () => {
    inputRef.current.focus(); // call the focus method on the input element reference
  };

  return (
    <div className="flex items-center gap-2">
      <div>
        <svg
          onClick={handleClick} // call the handleClick function on click
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 hover:border"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </div>
      <div className="relative ">
        <input
          ref={inputRef}
          className="flex-1 text-3xl py-2 px-3 text-gray-700 placeholder:text-gray-700 bg-inherit inline-block !outline-none
          "
          placeholder="Wallet Title"
          value={titleText}
          onChange={(e) => {
            setTitleText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              inputRef.current.blur();
            }
          }}
          size={titleText.length}
        />
      </div>
    </div>
  );
};
