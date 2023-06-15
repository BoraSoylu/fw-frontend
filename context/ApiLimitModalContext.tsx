import { createContext, useState } from 'react';

interface IApiLimitReachedContext {
  apiLimitReached: boolean;
  setApiLimitReached: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ApiLimitReachedContext = createContext<IApiLimitReachedContext>({
  apiLimitReached: false,
  setApiLimitReached: () => {},
});
