import React, { useContext, useEffect, useState } from 'react';
import { ApiLimitReachedContext } from '../context/ApiLimitModalContext';

export const ApiLimitModal = () => {
  const apiWaitTime = 60 * 1000;
  const [remainingSeconds, setRemainingSeconds] = useState(apiWaitTime / 1000);
  const { apiLimitReached, setApiLimitReached } = useContext(ApiLimitReachedContext);
  useEffect(() => {
    if (apiLimitReached) {
      const interval = setInterval(() => {
        setRemainingSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [apiLimitReached]);

  useEffect(() => {
    if (remainingSeconds === 0) {
      setApiLimitReached(false);
      setRemainingSeconds(apiWaitTime / 1000);
    }
  }, [remainingSeconds]);

  return (
    <div>
      {!apiLimitReached ? (
        <></>
      ) : (
        <div className="absolute z-50">
          <div className="flex h-screen w-screen items-center justify-center bg-zinc-800 bg-opacity-60">
            <div>
              <div className="rounded-lg bg-white p-8 shadow">
                <div className="bg-white dark:bg-gray-800 ">
                  <div className="sm:px-6 lg:py-16 lg:px-8 z-20 mx-auto w-full py-12 px-4 text-center ">
                    <h2 className="sm:text-4xl text-3xl font-extrabold text-black dark:text-white">
                      <span className="block">Api Limit Reached!</span>
                    </h2>
                    <h2 className="sm:text-4xl text-6xl font-bold text-black dark:text-white">
                      <span className="block">{remainingSeconds}</span>
                    </h2>
                    <div className="lg:mt-0 lg:flex-shrink-0 flex flex-col gap-3">
                      <div>
                        <h2 className="max-w-xl text-start text-xl font-bold text-gray-800">
                          What does this mean?
                        </h2>
                        <h2 className="max-w-xl  text-start text-xl text-gray-800">
                          Farazy Wallet uses the free tier of{' '}
                          <a
                            className="font-bold text-gray-500 underline"
                            href="https://www.coingecko.com/en/api/pricing"
                            target="_blank"
                            rel="noreferrer"
                          >
                            CoinGecko Api
                          </a>
                          * to get the current cryptocurrency prices. The free tier limits the usage
                          amount of this method of getting data. The limit resets every few minutes
                          depending on traffic. This window will be closed automatically when the
                          timer ends. Please wait for the limit to reset. Please do not refresh the
                          page.
                        </h2>
                      </div>
                      <h2 className="max-w-xl  text-start  text-gray-800">
                        <span className="max-w-xl text-start  font-bold text-gray-800">TLDR:</span>
                        &nbsp; Wait {remainingSeconds} seconds. This windows will close. Don&apos;t
                        refresh tab
                      </h2>
                      <h2 className="max-w-xl  text-start text-sm text-gray-800">
                        <span className="max-w-xl text-start  font-extrabold text-gray-800">*</span>
                        &nbsp; Farazy Wallet is <b>not</b> affiliated with CoinGecko. I simply use
                        the public free api. If this windows keeps showing up even after waiting,
                        the{' '}
                        <a
                          className="font-bold text-gray-500 underline"
                          href="https://status.coingecko.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          CoinGecko servers
                        </a>{' '}
                        might be down.
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
