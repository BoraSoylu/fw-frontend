import React from 'react';

export const Note = () => {
  return (
    <div>
      <label className="text-gray-700" htmlFor="name">
        <textarea
          className="flex-1 w-full px-4 py-2 text-base text-green-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          id="note"
          placeholder="You can add a note to your wallet!"
          name="note"
          rows={5}
          cols={40}
        ></textarea>
      </label>
    </div>
  );
};
