import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function RemoveWalletModal(props) {
  const { open, setOpen } = props;
  const cancelButtonRef = useRef(null);

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
                      className="text-xl font-medium leading-6 text-white mb-1 pb-3 mt-2 border-b border-gray-500"
                    >
                      Disconnect Wallet
                    </Dialog.Title>

                    <div className="py-8">
                      <p className="text-white">
                        Would you like to disconnect your wallet from Vult?
                      </p>
                    </div>

                    <div className="flex justify-between gap-6 mb-8">
                      <button
                        type="button"
                        className="h-12 text-lg text-white font-medium px-6 rounded-md w-full border-solid border-2 border-violet-500"
                        onClick={() => setOpen(false)}
                      >
                        No
                      </button>
                      {/* <button
                        type="button"
                        className="h-12 text-lg text-white font-medium px-6 rounded-md w-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                      >
                        Yes
                      </button> */}
                    </div>
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
