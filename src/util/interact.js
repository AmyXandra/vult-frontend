import { ethers } from "ethers";
import contract from "../contracts/userVault.json";
const contractAddress = "0xEc95e2aDB1605E71498980715D199259d07BfC1f";
const abi = contract.abi;

export const checkWalletIsConnected = async () => {
  const { ethereum } = window;
  if (!ethereum) {
    console.log("Make sure you have metamask");
  } else {
    console.log("Wallets exist, we're good to go!");
  }

  const accounts = await ethereum.request({
    method: "eth_accounts",
  });

  if (accounts.length !== 0) {
    const account = accounts[0];
    console.log("Found an account! Address:", account);
    return account;
  } else {
    console.log("No authorised account found");
  }
};

export const connectWalletHandler = async () => {
  const { ethereum } = window;
  if (!ethereum) {
    alert("Please install metamask");
  }
  try {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("Found an account! Address:", accounts[0]);
    return accounts[0];
  } catch (error) {
    console.log(error);
  }
};

export const addUserHandler = async (
  _creator_name,
  _next_of_kin_name,
  _next_of_kin_email,
  _next_of_kin_phone,
  _next_of_kin_otp,
  _token_network,
  _token_name
) => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const addContract = new ethers.Contract(contractAddress, abi, signer);
      console.log("initialise");
      let addUserTxn = await addContract.storeNextOfKinInfo(
        _creator_name,
        _next_of_kin_name,
        _next_of_kin_email,
        _next_of_kin_phone,
        _next_of_kin_otp,
        _token_network,
        _token_name
      );
      console.log("addUserTxn", addUserTxn);

      console.log("...creating please wait");
      await addUserTxn.wait();

      console.log("Created, see transaction hash:", addUserTxn.hash);
      return addUserTxn;
    } else {
      console.log("Ethereum object does not exist");
    }
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const getUserHandler = async (user) => {
  console.log("user", user);
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const getContract = new ethers.Contract(contractAddress, abi, provider);
      console.log("initialise contract");

      let getUserTxn = await getContract.all_users(user);
      console.log("...creating please wait");
      console.log("getUserTxn", getUserTxn);
      return getUserTxn;
    } else {
      console.log("Ethereum object does not exist");
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const nokValidationHandler = async (
  _creator_name,
  _next_of_kin_name,
  _next_of_kin_email,
  _next_of_kin_phone
) => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const addContract = new ethers.Contract(contractAddress, abi, signer);
      console.log("initialise payment");
      let addUserTxn = await addContract.storeNextOfKinInfo(
        _creator_name,
        _next_of_kin_name,
        _next_of_kin_email,
        _next_of_kin_phone
      );

      console.log("...creating please wait");
      await addUserTxn.wait();

      console.log("Created, see transaction hash:", addUserTxn.hash);
    } else {
      console.log("Ethereum object does not exist");
    }
  } catch (error) {
    console.log("error", error);
  }
};
