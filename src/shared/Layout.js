import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const Layout = ({ children }) => {
  return (
    <div className="global-layout">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
