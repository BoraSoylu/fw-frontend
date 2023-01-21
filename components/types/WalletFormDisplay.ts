export type SingleCoin = {
  name: string;
  id: string;
  price: number;
  amount: number;
  symbol: string;
};

export type WalletFormData = {
  address: string;
  title: string | null;
  note: string | null;
  createdAt: Date;
  contents: {
    coin_1: SingleCoin | null | undefined;
    coin_0: SingleCoin | null | undefined;
    coin_2: SingleCoin | null | undefined;
    coin_3: SingleCoin | null | undefined;
    coin_4: SingleCoin | null | undefined;
    coin_5: SingleCoin | null | undefined;
    coin_6: SingleCoin | null | undefined;
    coin_7: SingleCoin | null | undefined;
    coin_8: SingleCoin | null | undefined;
    coin_9: SingleCoin | null | undefined;
  };
};
