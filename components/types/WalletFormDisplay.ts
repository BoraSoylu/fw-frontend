import { string, z } from 'zod';

const SingleCoin = z.object({
  name: z.string(),
  id: z.string(),
  price: z.number(),
  amount: z.number(),
  symbol: z.string(),
});

const contents = z.object({
  coin_0: SingleCoin,
  coin_1: SingleCoin.optional(),
  coin_2: SingleCoin.optional(),
  coin_3: SingleCoin.optional(),
  coin_4: SingleCoin.optional(),
  coin_5: SingleCoin.optional(),
  coin_6: SingleCoin.optional(),
  coin_7: SingleCoin.optional(),
  coin_8: SingleCoin.optional(),
  coin_9: SingleCoin.optional(),
});

export const WalletFormData = z.object({
  address: z.string(),
  title: z.string().optional(),
  note: z.string().optional(),
  createdAt: z.coerce.date(),
  contents: contents,
});

export type WalletFormDataType = z.infer<typeof WalletFormData>;
export type CoinDetailsViewType = z.infer<typeof SingleCoin>;
export type WalletContentsType = z.infer<typeof contents>;

// export type SingleCoin = {
//   name: string;
//   id: string;
//   price: number;
//   amount: number;
//   symbol: string;
// };

// export type WalletFormData = {
//   address: string;
//   title: string | null;
//   note: string | null;
//   createdAt: Date;
//   contents: {
//     coin_0: SingleCoin | null | undefined;
//     coin_1: SingleCoin | null | undefined;
//     coin_2: SingleCoin | null | undefined;
//     coin_3: SingleCoin | null | undefined;
//     coin_4: SingleCoin | null | undefined;
//     coin_5: SingleCoin | null | undefined;
//     coin_6: SingleCoin | null | undefined;
//     coin_7: SingleCoin | null | undefined;
//     coin_8: SingleCoin | null | undefined;
//     coin_9: SingleCoin | null | undefined;
//   };
// };
