import React from 'react';

/**
 * A component that renders a dropdown list of currencies and allows the user to select a currency.
 * @param {Object} props - The props object for the component.
 * @param {string[]} props.all_currencies - An array of all available currencies to be displayed in the dropdown list.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setCurrency - A function that sets the selected currency.
 * @param {string} props.currency - The currently selected currency.
 */
export const VsCurrency = ({
  all_currencies,
  setCurrency,
  currency,
}: {
  all_currencies: string[];
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  currency: string;
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
          className="block w-fit rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
          name="currency"
          onChange={handleOnChange}
          value={currency}
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
