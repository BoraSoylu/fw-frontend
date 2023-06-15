import React from 'react';

export const Note = () => {
  return (
    <div>
      <label className="text-gray-700" htmlFor="name">
        <textarea
          className="w-full flex-1 resize-none appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-green-700 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
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
