import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";

interface IRouterProps {
  toggleDark: () => void;
  isDark: boolean;
}

function Router({ toggleDark, isDark }: IRouterProps) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Coins toggleDark={toggleDark} />} />
        <Route path="/:coinId/*" element={<Coin isDark={isDark} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
