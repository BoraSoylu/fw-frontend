import React from 'react';

export const VsCurrency = ({
  all_currencies,
  setCurrency,
}: {
  all_currencies: string[];
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleOnChange = (event: any) => {
    setCurrency(event.target.value);
  };
  return (
    <div>
      <label className="text-gray-700" htmlFor="currency">
        Currency
        <select
          id="currency"
          className="block px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm w-fit focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          name="currency"
          onChange={handleOnChange}
          value={'usd'}
        >
          {all_currencies.map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
