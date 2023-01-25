import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
export const Header = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  // Couldn't do this with @apply
  const activeTab =
    'text-gray-800 dark:text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium min-w-fit';
  const inactiveTab =
    'text-gray-400 dark:text-gray-400  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium min-w-fit';
  const activeBurgerTab =
    'text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium';
  const inactiveBurgerTab =
    'text-gray-400 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium';

  const [darkTheme, setDarkTheme] = useState(false);
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setDarkTheme(true);
    } else {
      setDarkTheme(false);
    }
  }, []);

  const handleDarkThemeChange = () => {
    if (darkTheme) {
      localStorage.removeItem('theme');
    } else {
      localStorage.theme = 'dark';
    }
  };

  const [typedAddress, setTypedAddress] = useState('');
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(typedAddress);
    console.log('click');
    router.push(typedAddress);
  };

  return (
    <div>
      <nav className="bg-white dark:bg-gray-800  shadow py-4 ">
        <div className="px-8 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="test flex items-center justify-between gap-3">
                <div className="flex -mr-2 md:hidden">
                  <button
                    onClick={() => {
                      setShowMenu(!showMenu);
                    }}
                    className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="w-8 h-8"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                    </svg>
                  </button>
                </div>
                <Link className="flex-shrink-0" href="/">
                  <p className="text-green-800">LOGO</p>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="flex items-baseline ml-10 space-x-4">
                  <Link className={router.pathname == '/' ? activeTab : inactiveTab} href="/">
                    Home
                  </Link>
                  <Link
                    className={router.pathname == '/about' ? activeTab : inactiveTab}
                    href="/about"
                  >
                    About
                  </Link>
                  <Link className={router.pathname == '/faq' ? activeTab : inactiveTab} href="/faq">
                    FAQ
                  </Link>
                  <Link
                    className={router.pathname == '/contact' ? activeTab : inactiveTab}
                    href="/contact"
                  >
                    Contact Me
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex justify-end gap-2 items-center">
                <div
                  onClick={() => {
                    console.log(darkTheme);
                  }}
                >
                  lang
                </div>

                <div>
                  <div
                    onClick={() => {
                      document.documentElement.classList.toggle('dark');
                      setDarkTheme(!darkTheme);
                      handleDarkThemeChange();
                    }}
                    className={`relative hover:cursor-pointer inline-block align-middle select-none h-fit w-fit ${
                      !darkTheme ? 'text-gray-800' : 'text-gray-300'
                    }`}
                  >
                    {darkTheme ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-7 h-7"
                      >
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex -mr-2 md:block">
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
                  >
                    <div className=" relative ">
                      <input
                        type="text"
                        id='"form-wallet-search'
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                        placeholder="Search Wallet"
                        pattern="[123456789ABCDEFGHJKLMNPRSTUVWXYZ]{10}"
                        title="Address should have 10 characters"
                        onChange={(e) => {
                          setTypedAddress(e.target.value);
                        }}
                      />
                    </div>
                    <button
                      className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200"
                      type="submit"
                    >
                      Search
                    </button>
                  </form>
                </div>
                <div className="flex items-center ml-4 md:ml-6"></div>
              </div>
            </div>
          </div>
        </div>
        <div className={`md:hidden ${showMenu ? '' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              className={router.pathname == '/' ? activeBurgerTab : inactiveBurgerTab}
              href="/#"
            >
              Home
            </Link>
            <Link
              className={router.pathname == '/about' ? activeBurgerTab : inactiveBurgerTab}
              href="/about"
            >
              About
            </Link>
            <Link
              className={router.pathname == '/faq' ? activeBurgerTab : inactiveBurgerTab}
              href="/faq"
            >
              FAQ
            </Link>
            <Link
              className={router.pathname == '/contact' ? activeBurgerTab : inactiveBurgerTab}
              href="/contact"
            >
              Contact Me
            </Link>
          </div>
          <div className="flex p-2">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
            >
              <div className=" relative ">
                <input
                  type="text"
                  id='"form-subscribe-Search'
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent max-w-fit"
                  placeholder="Search Wallet"
                />
              </div>
              <button
                className=" flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200 max-w-fit"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
