import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connectWalletHandler } from "../util/interact";
import { checkWalletIsConnected } from "../util/interact";
import RemoveWalletModal from "./modals/RemoveWalletModal";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

  const getWallet = async () => {
    const response = await connectWalletHandler();
    response && setCurrentAccount(response);
  };
  function shortAddress(address) {
    let newAddress =
      address.substring(0, 6) +
      "......" +
      address.substring(address.length - 4);
    return newAddress;
  }

  useEffect(() => {
    async function fetchData() {
      const response = await checkWalletIsConnected();
      response && setCurrentAccount(response);
    }
    fetchData();
  }, []);

  const connectWalletButton = () => {
    return (
      <button
        onClick={getWallet}
        className="h-12 px-6 rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
      >
        Connect Wallet
      </button>
    );
  };
  return (
    <>
      <RemoveWalletModal open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between mt-3 mb-3">
        <button
          className="text-3xl font-bold text-white italic"
          onClick={() => navigate("/")}
        >
          Vult
        </button>
        {location?.pathname === "/" ? (
          <button
            className="h-10 text-lg font-medium px-6 rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
            onClick={() => navigate("/get-started")}
          >
            Get Started
          </button>
        ) : (
          <>
            {currentAccount ? (
              <button
                className="h-10 text-md font-medium px-5 rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
                onClick={() => setOpen(true)}
              >
                Connected: {shortAddress(currentAccount)}
              </button>
            ) : (
              connectWalletButton()
            )}
          </>
        )}
      </div>
    </>
  );
}
