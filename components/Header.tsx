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
        <div className=" px-8 mx-auto max-w-7xl">
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
            <div className="flex gap-7">
              <div className="flex justify-end gap-2 items-center">
                <div
                  onClick={() => {
                    console.log(darkTheme);
                  }}
                >
                  lang
                </div>

                <div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      onChange={() => {
                        document.documentElement.classList.toggle('dark');
                        setDarkTheme(!darkTheme);
                        handleDarkThemeChange();
                      }}
                      checked={darkTheme ? true : false}
                      type="checkbox"
                      name="toggle"
                      id="Blue"
                      className="checked:bg-gray-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="Blue"
                      className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer"
                    ></label>
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
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Search Wallet"
                        pattern="[123456789ABCDEFGHJKLMNPRSTUVWXYZ]{10}"
                        title="Address should have 10 characters"
                        onChange={(e) => {
                          setTypedAddress(e.target.value);
                        }}
                      />
                    </div>
                    <button
                      className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
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
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent max-w-fit"
                  placeholder="Search Wallet"
                />
              </div>
              <button
                className=" flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 max-w-fit"
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
