import { useEffect, useState } from "react";
import { checkWalletIsConnected } from "../util/interact";
import { getUserHandler } from "../util/interact";
import Header from "../components/Header";
// import AddTokenModal from "../components/modals/AddTokenModal";

export default function Profile() {
  const [currentAccount, setCurrentAccount] = useState(null);
  // const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await checkWalletIsConnected();
      response && setCurrentAccount(response);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function getData() {
      // You can await here
      if (currentAccount !== null) {
        const response = await getUserHandler(currentAccount.toLowerCase());
        console.log("response", response);
      }
    }
    getData();
  }, [currentAccount]);

  return (
    <div className="bg-[#000020] p-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Header />
        {/* <AddTokenModal
          input={input}
          setInput={setInput}
          open={open}
          setOpen={setOpen}
        /> */}
        {/* Main body of project */}
        <div className="mt-20">
          <div>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-white text-4xl font-bold">My Assets</h3>
              {/* <button
                className="text-white text-lg"
                onClick={() => setOpen(true)}
              >
                + Add token
              </button> */}
            </div>

            {!currentAccount ? (
              <p>Loading Page</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="p-5 text-white text-xl font-medium text-left">
                      Token
                    </th>
                    <th className="p-5 text-white text-xl font-medium text-left">
                      Wallet Address
                    </th>
                    <th className="p-5 text-white text-xl font-medium text-left">
                      Network
                    </th>
                    <th className="p-5 text-white text-xl font-medium text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#00000066]">
                    <td className="text-white text-lg px-5 py-3 mb-2">
                      BUSD 234.00985
                    </td>
                    <td className="text-white text-lg px-5 py-3 mb-2">
                      XD1eobR7998iuu6...
                    </td>
                    <td className="text-white text-lg px-5 py-3 mb-2">
                      Bep 20
                    </td>
                    <td className="text-white text-lg px-5 py-3 mb-2">
                      Remove
                    </td>
                  </tr>

                  <tr className="bg-[#00000066] mb-4">
                    <td className="text-white text-lg px-5 py-3 mb-2">
                      BUSD 234.00985
                    </td>
                    <td className="text-white text-lg px-5 py-3 mb-2">
                      XD1eobR7998iuu6...
                    </td>
                    <td className="text-white text-lg px-5 py-3 mb-2">
                      Bep 20
                    </td>
                    <td className="text-white text-lg px-5 py-3 mb-2">
                      Remove
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
