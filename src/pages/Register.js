import { useEffect, useState } from "react";
import { checkWalletIsConnected } from "../util/interact";
import { addUserHandler } from "../util/interact";
import Header from "../components/Header";
import Input from "../components/Input";
import AddTokenModal from "../components/modals/AddTokenModal";
// const otpGenerator = require("otp-generator");

export default function Register() {
  //   const newOtp = otpGenerator.generate(6, {
  //     upperCaseAlphabets: false,
  //     specialChars: false,
  //   });
  //   console.log("newOtp", newOtp);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    creator_name: "",
    next_of_kin_name: "",
    next_of_kin_email: "",
    next_of_kin_phone: "",
    next_of_kin_otp: "098749",
    tokens: [],
  });
  const {
    creator_name,
    next_of_kin_name,
    next_of_kin_email,
    next_of_kin_phone,
    tokens,
  } = input;

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await checkWalletIsConnected();
      response && setCurrentAccount(response);
      // ...
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(
      "input",
      creator_name,
      next_of_kin_name,
      next_of_kin_email,
      next_of_kin_phone,
      input.next_of_kin_otp,
      input.tokens
    );
    await addUserHandler(
      creator_name,
      next_of_kin_name,
      next_of_kin_email,
      next_of_kin_phone,
      input.next_of_kin_otp,
      input.tokens
    );
  };

  return (
    <div className="bg-[#000020] p-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Header />
        <AddTokenModal
          input={input}
          setInput={setInput}
          open={open}
          setOpen={setOpen}
        />
        {/* Main body of project */}
        <div className="mt-20">
          <div>
            <div className="max-w-3xl mx-auto">
              <div className="mb-10">
                <h3 className="text-white text-3xl font-bold mb-1">
                  Get Started
                </h3>
                <p className="text-white">
                  Fill in the following details to start your Vult journey
                </p>
              </div>

              <div className="px-6 py-4 rounded glass mb-6">
                <>
                  <p className="text-white text-sm font-medium mt-4 mb-1">
                    STEP 1
                  </p>
                  <h2 className="text-white text-2xl font-bold mb-8">
                    Connect Account
                  </h2>
                </>
                {!currentAccount ? (
                  <div className="text-white glass px-4 py-8 my-10 text-center">
                    <h4 className="text-xl mb-2">No wallet found</h4>
                    <p>Connect wallet to get started</p>
                  </div>
                ) : (
                  <div>
                    <form>
                      <Input.Label
                        title="Wallet Address"
                        className="border-white p-4 mb-4"
                        type="text"
                        name="creator_name"
                        htmlFor="creator_name"
                        defaultValue={currentAccount}
                        disabled
                      />
                      <Input.Label
                        title="Username"
                        className="border-white p-4 mb-4"
                        type="text"
                        name="creator_name"
                        htmlFor="creator_name"
                        placeholder="Enter your name"
                        onChange={handleChange}
                      />
                    </form>
                  </div>
                )}
              </div>

              <div
                className={`${
                  creator_name ? "block" : "block-content"
                } retative px-6 py-4 rounded glass mb-6`}
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <p className="text-white text-sm font-medium mt-4 mb-1">
                      STEP 2
                    </p>
                    <h2 className="text-white text-2xl font-bold">
                      Add Tokens
                    </h2>
                  </div>
                  <button className="text-white" onClick={() => setOpen(true)}>
                    + Add token
                  </button>
                </div>

                {creator_name && (
                  <>
                    {tokens?.length === 0 ? (
                      <div className="text-white glass px-4 py-8 my-10 text-center">
                        <h4 className="text-xl font-bold mb-2">
                          No tokens added
                        </h4>
                        <p>
                          You have not added any tokens to pass on to your Next
                          of Kin
                        </p>
                      </div>
                    ) : (
                      <form>
                        {tokens?.length > 0 &&
                          tokens?.map((token, i) => (
                            <div key={i}>
                              <p className="text-white mb-2 font-medium">
                                Token {i + 1}
                              </p>
                              <div className="grid grid-cols-2 gap-4">
                                <Input.Label
                                  title="Token"
                                  className="border-white p-4 mb-4"
                                  type="text"
                                  defaultValue={token?.token}
                                  disabled
                                />
                                <Input.Label
                                  title="Network"
                                  className="border-white p-4 mb-4"
                                  type="text"
                                  defaultValue={token?.network}
                                  disabled
                                />
                              </div>
                            </div>
                          ))}
                      </form>
                    )}
                  </>
                )}
              </div>

              <div
                className={`${
                  creator_name && tokens.length > 0 ? "block" : "block-content"
                } retative px-6 py-4 rounded glass mb-6`}
              >
                <div>
                  <p className="text-white text-sm font-medium mt-4 mb-1">
                    STEP 3
                  </p>
                  <h2 className="text-white text-2xl font-bold mb-8">
                    Add next of kin details
                  </h2>
                </div>

                {creator_name && tokens.length > 0 && (
                  <form className="grid grid-cols-1 gap-3">
                    <Input.Label
                      title="Next of kin name"
                      className="border-white p-4 mb-4"
                      type="text"
                      name="next_of_kin_name"
                      htmlFor="next_of_kin_name"
                      placeholder="Enter next of kin name"
                      onChange={handleChange}
                    />

                    <Input.Label
                      title="Next of kin email"
                      className="border-white p-4 mb-4"
                      type="email"
                      name="next_of_kin_email"
                      htmlFor="next_of_kin_email"
                      placeholder="Enter next of kin email"
                      onChange={handleChange}
                    />

                    <Input.Label
                      title="Next of kin phone"
                      className="border-white p-4 mb-4"
                      type="email"
                      name="next_of_kin_phone"
                      htmlFor="next_of_kin_phone"
                      placeholder="Enter next of kin phone"
                      onChange={handleChange}
                    />

                    <Input.Label
                      title="Relationship"
                      className="border-white p-4 mb-4"
                      type="text"
                      //   name="next_of_kin_phone"
                      //   htmlFor="next_of_kin_phone"
                      placeholder="What is your relationship with next of kin?"
                      //   onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="h-12 px-6 rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
                    >
                      Submit
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
