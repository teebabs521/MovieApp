import React, { useState } from "react";
import { FaSearch, FaTv } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import { navItems } from "datas";
import { useSearchProvider } from "contexts/searchContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [providedInput, setProvidedInput] = useState("");
  const { searchedKey, updateSearchedKey } = useSearchProvider();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-black text-white p-5 flex items-center justify-between">
        <Link to="/">
          <h5 className="uppercase font-AtypDisplayBold text-white flex items-center">
            <FaTv className="mr-2" />
            MovieBox
          </h5>
        </Link>

        <div className="flex items-center justify-center lg:w-1/2">
          <div className="flex bg-gray-800 overflow-hidden rounded-md w-full">
            <input
              type="text"
              className="px-3 py-2 border-none outline-none bg-transparent text-white w-full"
              placeholder="Search any movie..."
              onChange={(e) => setProvidedInput(e.target.value)}
            />
            <button
              className="text-white px-3 py-2 text-white"
              onClick={() => {
                updateSearchedKey(providedInput);
                navigate("/search");
              }}
            >
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-5">
          <div
            className="text-2xl flex items-center justify-center p-2 lg:hidden cursor-pointer select-none"
            onClick={toggleMenu}
          >
            <GiHamburgerMenu />
          </div>
          <Link to="/signin" className="text-white flex items-center">
            Sign In
            <GiHamburgerMenu className="text-2xl ml-2" />
          </Link>
        </div>
      </nav>
      {isOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 h-full bg-black/90 w-full z-10 py-20 px-5 flex">
          <ul className="flex flex-col justify-center">
            {navItems.map((singleNavItem) => (
              <NavLink
                key={singleNavItem.providedLink}
                to={singleNavItem.providedLink}
              >
                <li className="custom-minor-title py-4 text-white">
                  {singleNavItem.title}
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
