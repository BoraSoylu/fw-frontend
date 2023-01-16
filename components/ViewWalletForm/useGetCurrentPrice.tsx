import { useState } from 'react';
import useSWR from 'swr';

export const useGetCurrentPrice = (walletData: any, vs_currencies: any, setCurrentPrice: any) => {
  // Create id list for coingecko current prices
  let SimplePriceString: string = 'https://api.coingecko.com/api/v3/simple/price?ids=';
  Object.keys(walletData.contents).forEach((coin) => {
    SimplePriceString += walletData.contents[coin].id + '%2C';
  });
  SimplePriceString = `${SimplePriceString.slice(0, -3)}&vs_currencies=${vs_currencies}`;
  const fetcher = (url: any) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(SimplePriceString, fetcher);
  console.log(data);
  if (data) {
    setCurrentPrice(data);
    return data;
  }
  return error;
};

export default useGetCurrentPrice;
