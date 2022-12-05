import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import tokenList from "../TokenList";
import Input from "../Input";

export default function AddTokenModal(props) {
  const { input, setInput, open, setOpen } = props;

  const cancelButtonRef = useRef(null);
  const [data, setData] = useState({
    token: "",
    network: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    setInput({ ...input, tokens: [...input.tokens, data] });
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#030324] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-[#030324] px-4 pt-6 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-medium leading-6 text-white mb-8 mt-2"
                    >
                      Add New Token
                    </Dialog.Title>
                    <form className="mt-2">
                      <Input.Select
                        title={"Add New Token"}
                        name="token"
                        id="token"
                        className="border-white p-4 mb-7 w-full"
                        onChange={handleChange}
                      >
                        <option>Select Token</option>
                        {tokenList?.tokens?.length > 0 &&
                          tokenList?.tokens?.map((token, i) => (
                            <option key={i} value={token}>
                              {token}
                            </option>
                          ))}
                      </Input.Select>

                      <Input.Select
                        title={"Add Token Network"}
                        type="text"
                        name="network"
                        id="network"
                        className="border-white p-4 mb-7 w-full"
                        onChange={handleChange}
                      >
                        <option>Select Network</option>
                        {tokenList?.networks?.length > 0 &&
                          tokenList?.networks?.map((network, i) => (
                            <option key={i} value={network}>
                              {network}
                            </option>
                          ))}
                      </Input.Select>

                      <div className="flex justify-center mb-8">
                        <button
                          type="button"
                          className="h-12 text-lg font-medium px-6 rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
                          onClick={handleSubmit}
                        >
                          Add Token
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
