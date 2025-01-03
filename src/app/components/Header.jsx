"use client";
import { useState } from "react";
import useLoginStore from "../state/login";
import LoginModal from "./LoginModal";

const Header = () => {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const setLogIn = useLoginStore((state) => state.setLogIn);
  const setLogOut = useLoginStore((state) => state.setLogOut);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginSuccess = () => {
    setLogIn();
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setLogOut();
  };

  const handleFavoriteClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      <div className="bayon fixed top-0 left-0 w-full bg-prime shadow-md z-50 flex justify-between items-center px-4 h-28">
        <a href="/">
          <img src="/img2.png" alt="logo" className="col-start-1 row-start-1 w-28 h-28 z-20" />
        </a>

        <div className="flex space-x-12">
          <a href="/favourites" className="flex items-center text-black font-normal text-lg hover:text-gray-300" onClick={handleFavoriteClick}>
            Favoritter
          </a>

          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <button className="px-4 py-2 border-2 border-black rounded-lg" onClick={() => setIsModalOpen(true)}>
                Log ind
              </button>
            ) : (
              <button className="border-2 border-red-700 px-4 py-2 rounded-lg" onClick={handleLogout}>
                Sign out
              </button>
            )}
          </div>

          {isModalOpen && !isLoggedIn && <LoginModal onClose={() => setIsModalOpen(false)} onLoginSuccess={handleLoginSuccess} />}
        </div>
      </div>
    </div>
  );
};

export default Header;
