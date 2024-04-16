import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import eventBus from "../common/EventBus";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    const unsubscribe = eventBus.on("logout", () => {
      logOut();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logOut = () => {
    authService.logout();
    setCurrentUser(undefined);
    setShowAdminBoard(false);
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="bg-white px-6 py-4 shadow-lg shadow-blue-100">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link
            to={"/"}
            className="text-blue-700 text-3xl uppercase font-bold font-serif"
          >
            I<span className="text-black uppercase text-xl">ncident</span> R
            <span className="text-black uppercase text-xl">eporting</span>
          </Link>
          <div className="flex space-x-4">
            {showAdminBoard && (
              <Link
                to={"/department-head"}
                className="text-blue-700 text-md font-bold mt-2 hover:border-b-2  border-blue-700 active:border-blue-700 hover:text-blue-600"
              >
                Department Head
              </Link>
            )}
            {currentUser && (
              <Link
                to={"/reporting-page"}
                className="text-blue-700 text-md font-bold mt-2 hover:border-b-2  border-blue-700 active:border-blue-700 hover:text-blue-600"
              >
                Reporting Page
              </Link>
            )}
            {currentUser ? (
              <button
                className="text-white bg-blue-700 px-4 py-2 text-md uppercase font-bold rounded-md hover:bg-blue-600"
                onClick={logOut}
              >
                Log Out
              </button>
            ) : (
              <Link
                to={"/login"}
                className="text-white bg-blue-700 px-4 py-2 text-md uppercase font-bold rounded-md hover:bg-blue-600"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
