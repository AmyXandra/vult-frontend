import { useState } from "react";
import { addUserHandler } from "../util/interact";
import Header from "../components/Header";
import Input from "../components/Input";

export default function Login() {
  const [input, setInput] = useState({
    creator_name: "",
    next_of_kin_name: "",
    next_of_kin_email: "",
    next_of_kin_phone: "",
    tokens: [],
  });
  const {
    creator_name,
    next_of_kin_name,
    next_of_kin_email,
    next_of_kin_phone,
  } = input;

  const handleChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setInput({ ...input, [name]: value });
  };

  console.log("input", input);
  const handleSubmit = async () => {
    await addUserHandler(
      creator_name,
      next_of_kin_name,
      next_of_kin_email,
      next_of_kin_phone
    );
  };

  return (
    <div className="bg-[#000020] p-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Header />
        {/* Main body of project */}
        <div className="mt-20">
          <div>
            <div className="max-w-3xl mx-auto">
              <div className="mb-10">
                <h3 className="text-white text-3xl font-bold mb-1">Login</h3>
                <p className="text-white">
                  Fill in the following details to start your Vult journey
                </p>
              </div>
              <div className="px-6 py-4 rounded glass mb-6">
                <div className="mb-8">
                  <p className="text-white text-sm font-medium mt-4 mb-1">
                    STEP 2
                  </p>
                  <h2 className="text-white text-2xl font-bold">Add Tokens</h2>
                </div>

                <form>
                  <Input.Label
                    title="Email address"
                    className="border-white p-4 mb-4"
                    type="text"
                    name="creator_name"
                    htmlFor="creator_name"
                  />
                  <Input.Label
                    title="OTP"
                    className="border-white p-4 mb-4"
                    type="text"
                    name="creator_name"
                    htmlFor="creator_name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full h-12 px-6 rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
