// components/layout.js
import Navbar from './Header';
import Footer from './Footer';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default layout;
