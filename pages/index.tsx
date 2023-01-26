import Head from 'next/head';
import Link from 'next/link';
export default function Home() {
  return (
    <div>
      <Head>
        <title>Farazy Wallet</title>
        <meta name="keywords" content="TODO" />
      </Head>

      <div className="relative h-screen overflow-hidden bg-white">
        <div className="h-full mx-auto max-w-7xl">
          <div className="relative z-10 h-full pb-8 bg-white sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="h-full px-4 mx-auto mt-10 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="flex flex-col items-start justify-between w-full h-full md:flex-row md:justify-start md:h-1/2">
                <div className="z-20 flex flex-col items-center justify-start w-full h-full text-left md:z-30 md:w-1/2 md:items-start md:justify-center">
                  <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 titleHome ">
                    <span className="flex w-full m-auto text-green-600">Farazy Wallet</span>
                    <span className="block font-bold xl:inline">
                      <span className="absolute">Fast and Easy</span>
                      <br />
                      Mock Cryptowallet
                    </span>
                  </h1>
                  <h2 className="mt-3 text-lg text-gray-500 sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Create an imaginary wallet without logging in or providing any personal
                    information! Access it anytime any where by writing down a simple address like
                    this:{' '}
                    <Link className="" href={'/VL1JVE4EMS'}>
                      <span className="font-semibold hover:cursor-pointer underline text-green-500">
                        VL1JVE4EMS
                      </span>
                    </Link>
                  </h2>
                  <div className="w-full mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <a
                        className="flex items-center justify-center w-full px-4 px-8 py-2 py-3 text-base font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                        href="/started"
                      >
                        Create Wallet
                      </a>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/Charlie85270/tail-kit"
                        className="flex items-center justify-center w-full px-4 px-8 py-2 py-3 text-base font-medium text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200"
                      >
                        <span className="mr-2">Learn More</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="mt-4">
                    Contact me for more information
                    <span className="underline cursor-pointer ml-2 font-semibold">
                      borasoylu.com
                    </span>
                  </div>
                </div>
                <div className="absolute z-10 w-full transform opacity-10 md:z-50 md:opacity-70 sm:text-center lg:text-left -right-10 -top-72 md:w-1/2"></div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
