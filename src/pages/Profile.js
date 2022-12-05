import { useEffect, useState } from "react";
import { checkWalletIsConnected } from "../util/interact";
import { getUserHandler } from "../util/interact";
import Header from "../components/Header";
import Input from "../components/Input";
// import AddTokenModal from "../components/modals/AddTokenModal";

export default function Profile() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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
      try {
        if (currentAccount !== null) {
          const response = await getUserHandler(currentAccount.toLowerCase());
          setLoading(false);
          setData(response);
        }
      } catch (error) {
        setLoading(false);
      }
    }
    getData();
  }, [currentAccount]);

  console.log("data", data, data[3]);

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
              <h3 className="text-white text-4xl font-bold">My Profile</h3>
              {/* <button
                className="text-white text-lg"
                onClick={() => setOpen(true)}
              >
                + Add token
              </button> */}
            </div>

            {loading ? (
              <p className="text-white text-2xl font medium text-center mt-16 pt-10">
                Loading Page...
              </p>
            ) : (
              <div>
                {data?.length > 0 ? (
                  <>
                    <div className="p-5 glass mb-7">
                      <h2 className="text-white text-2xl font-medium mb-8">
                        My Assets
                      </h2>
                      {data?.length > 0 && (
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
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-[#00000024]">
                              <td className="text-white text-lg px-5 py-3 mb-2">
                                {data[7]}
                              </td>
                              <td className="text-white text-lg px-5 py-3 mb-2">
                                {currentAccount}
                              </td>
                              <td className="text-white text-lg px-5 py-3 mb-2">
                                {data[8]}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      )}
                    </div>
                    <div className="p-5 glass mb-5">
                      <h2 className="text-white text-2xl font-medium mb-8">
                        Next of Kin details
                      </h2>
                      {data?.length > 0 && (
                        <form className="grid grid-cols-1 gap-3">
                          <Input.Label
                            title="Next of kin name"
                            className="border-white p-4 mb-4"
                            type="text"
                            name="next_of_kin_name"
                            htmlFor="next_of_kin_name"
                            value={data[3]}
                            disabled
                          />

                          <Input.Email
                            title="Next of kin email"
                            className="border-white p-4 mb-4"
                            type="email"
                            name="next_of_kin_email"
                            htmlFor="next_of_kin_email"
                            value={data[4]}
                            disabled
                          />

                          <Input.Label
                            title="Next of kin phone"
                            className="border-white p-4 mb-4"
                            type="email"
                            name="next_of_kin_phone"
                            htmlFor="next_of_kin_phone"
                            value={data[5].toString()}
                            disabled
                          />
                        </form>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-white glass px-4 py-8 my-10 text-center flex flex-col gap-4 items-center">
                    <h4 className="text-xl mb-2">No data found</h4>
                    <p>Connect wallet to get started</p>
                    <a
                      href="/get-started"
                      className="h-12 px-6 rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
                    >
                      Get Started
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
