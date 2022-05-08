import { useContext, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useNotification } from "web3uikit";

import Layout from "./components/Layout";
import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

function Register() {

  const [formToggle, setFormToggle] = useState(false);
  const [aadharUrl, setAadharUrl] = useState("/aadhar-placeholder.jpg");
  const [panUrl, setPanUrl] = useState("/pancard-placeholder.png");
  const contractProcessor = useWeb3ExecuteFunction();
  const dispatch = useNotification();

  const handleSuccess= () => {
    dispatch({
      type: "success",
      message: `Transaction Successful`,
      title: "Succesful",
      position: "topL",
    });
  };

  const handleError= (msg) => {
    dispatch({
      type: "error",
      message: `${msg}`,
      title: "Failed",
      position: "topL",
    });
  };
  let history = useHistory();

  const customerNameInputRef = useRef();
  const customerAddressInputRef = useRef();
  const customerPhoneInputRef = useRef();

  const bankNameInputRef = useRef();
  const bankAddressInputRef = useRef();

  async function createbank() {
    var bankName = bankNameInputRef.current.value;
    var bankAddress = bankAddressInputRef.current.value;
    let options = {
        contractAddress: "0x69F8D0aB8394A3312eD282147C72Ee4f56B2aa52",
        functionName: "addBankInfo",
        abi: [
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_addres",
                        "type": "string"
                    }
                ],
                "name": "addBankInfo",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        params: {
          _name: bankName,
          _addres: bankAddress,
        }
      }

      await contractProcessor.fetch({
        params: options,
        onSuccess: () => {
          handleSuccess();
        },
        onError: (error) => {
          handleError(error.data.message)
        }
      });
  
    // Call API to create bank
    history.push("/bank");
  }

  async function retrievePan(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setPanUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function retrieveAadhar(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setAadharUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createcustomer() {
    var customerName = customerNameInputRef.current.value;
    var customerAddress = customerAddressInputRef.current.value;
    var customerPhone = customerPhoneInputRef.current.value;

    console.log(aadharUrl);
    console.log(panUrl);

    let options = {
        contractAddress: "0x69F8D0aB8394A3312eD282147C72Ee4f56B2aa52",
        functionName: "addCustomerInfo",
        abi: [
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_addres",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_phoneNo",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_aadhar",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_pan",
                        "type": "string"
                    }
                ],
                "name": "addCustomerInfo",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        params: {
          _name: customerName,
          _addres: customerAddress,
          _phoneNo: customerPhone,
          _aadhar:aadharUrl,
          _pan:panUrl
        }
      }

      await contractProcessor.fetch({
        params: options,
        onSuccess: () => {
          handleSuccess();
        },
        onError: (error) => {
          handleError(error.data.message)
        }
      });

    history.push("/customer");

    // Call to create customer
  }

  return (
    <Layout>
      <section className="pt-2">
        {formToggle ? (
          <div className="text-white container" style={{ paddingTop: "150px" }}>
            <div className="mb-5 d-flex justify-content-between  align-items-center">
              <h1 className="fw-bold  ">Create a Bank</h1>
              <div className="form-check form-switch mb-3">
                <button
                  onClick={() => setFormToggle(!formToggle)}
                  className="btn btn-outline-primary"
                  type="button"
                >
                  {formToggle
                    ? "Create a Customer account"
                    : "Create a Bank instead?"}
                </button>
              </div>
            </div>
            <section className="pb-5 mb-5">
              <form>
                <div className="form-group   my-4">
                  <label htmlFor="inputName" className="text-white">
                    Name
                  </label>
                  <input
                    ref={bankNameInputRef}
                    type="text"
                    className="p-3 d-flex bg-dark w-100 text-white  rounded focus-none"
                    id="inputName"
                    placeholder="Bank Name - Eg. XYZ Bank "
                  />
                </div>
                <div className="form-group   my-4">
                  <label htmlFor="inputName" className="text-white">
                    Address
                  </label>
                  <input
                    ref={bankAddressInputRef}
                    type="text"
                    className="p-3 d-flex bg-dark w-100 text-white  rounded focus-none"
                    id="inputName"
                    placeholder="Bank Name - Eg. XYZ Bank "
                  />
                </div>
              </form>

              <div
                onClick={() => createbank()}
                className="mt-5 btn d-block btn-lg fw-bold btn-primary p-3"
              >
                Create Bank & Proceed ✅
              </div>
            </section>
          </div>
        ) : (
          <div className="text-white container" style={{ paddingTop: "150px" }}>
            <div className="mb-5 d-flex justify-content-between align-items-center">
              <h1 className="fw-bold">Register a Customer</h1>
              <div className="form-check form-switch mb-3">
                <button
                  onClick={() => setFormToggle(!formToggle)}
                  className="btn btn-outline-primary"
                  type="button"
                >
                  {formToggle
                    ? "Create a Customer account"
                    : "Create an Bank instead?"}
                </button>
              </div>
            </div>
            <section className="pb-5 mb-5">
              <form>
                <div className="form-group  my-4">
                  <label htmlFor="inputName" className="text-white">
                    Name
                  </label>
                  <input
                    ref={customerNameInputRef}
                    type="text"
                    style={{ width: "100%" }}
                    className="p-3 d-flex bg-dark col-md-6 text-white  rounded focus-none"
                    id="inputName"
                    placeholder="Customer Name - Eg. Ram Kumar"
                  />
                </div>

                <div className="form-group  my-4">
                  <label htmlFor="inputAddress" className="text-white">
                    Address
                  </label>
                  <input
                    ref={customerAddressInputRef}
                    type="text"
                    className={
                      "p-3 d-flex bg-dark  text-white rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputAddress"
                    placeholder="Address - Eg. #12, Street, City, State, Country"
                  />
                </div>

                <div className="form-group  my-4">
                  <label htmlFor="inputPhone" className="text-white">
                    Phone
                  </label>
                  <input
                    ref={customerPhoneInputRef}
                    type="number"
                    className={
                      "p-3 d-flex bg-dark  text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputPhone"
                    placeholder="Phone - Eg. +91-1234567890"
                  />
                </div>

                <div className="d-flex justify-content-start">
                  <div className="me-md-4">
                    <div>Upload Pan Card</div>
                    <input
                      type="file"
                      className="form-control my-3 bg-dark text-white"
                      name="profilePic"
                      placeholder="Upload Profile Pic"
                      onChange={retrievePan}
                    />
                  </div>
                  <div className="me-md-4">
                    <div>Upload Aadhar Card</div>
                    <input
                      type="file"
                      className="form-control my-3 bg-dark text-white"
                      name="ID_Proof"
                      placeholder="Upload ID_Proof"
                      onChange={retrieveAadhar}
                    />
                  </div>
                </div>
              </form>

              <hr />

              <div className="d-flex justify-content-start mt-3">
                <div>
                  Your uploaded Pan Card
                  <div className="card card-body bg-dark my-3 me-md-3">
                    <img src={panUrl} style={{ height: "300px" }} alt="" />
                  </div>
                </div>
                <div>
                  Your uploaded Aadhar Card
                  <div className="card card-body bg-dark my-3 me-md-3">
                    <img src={aadharUrl} style={{ height: "300px" }} alt="" />
                  </div>
                </div>
              </div>

              <div
                onClick={() => createcustomer()}
                className="mt-5 btn d-block btn-lg fw-bold btn-primary p-3"
              >
                Create Customer & Proceed ✅
              </div>
            </section>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Register;
