import React, { useState, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useNotification } from "web3uikit";

import Layout from "./components/Layout";
function Customer() {
  const [bid, setBid] = useState(0);
  const [banks, setBanks] = useState([]);
  const [cust,setCust]=useState([]);
  const [address, setAddress] = useState();
const { Moralis, account,user, } = useMoralis();
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


  const addBank = async () => {
    let options = {
        contractAddress: "0x69F8D0aB8394A3312eD282147C72Ee4f56B2aa52",
        functionName: "addBank_Customer",
        abi: [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "bid",
                        "type": "uint256"
                    }
                ],
                "name": "addBank_Customer",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        params: {
          bid: bid
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
  };


  useEffect(() => {
      
    const getDetails = async () => {
        // console.log(account)
        if(!cust || !banks || !account){
    // console.log(user)
    const  c= Moralis.Object.extend("Customers");
    const  b= Moralis.Object.extend("Bank");
    const useraddr=user.attributes.ethAddress;
    // console.log(useraddr);
    setAddress(useraddr)
    // console.log(user["attributes"]["accounts"][0]);
    // console.log(user)
    

    if(address){
        setAddress(user["attributes"]["accounts"][0]);
    const q1 = new Moralis.Query(c);
    const q2 = new Moralis.Query(b);
    q1.equalTo("cid", String(1));
    const res1 = await q1.find();
    console.log(res1);
    // q2.equalTo("cid",address)
    const res2 = await q2.find();
    console.log(res2);
    setCust(res1[0]["attributes"]);
    setBanks(res2);
    
    }
        }
    };

    
    getDetails();
  }, [cust,banks,address,user]);

  return (
    <Layout>
      <div className="container mb-5 text-white" style={{ marginTop: "100px" }}>
        {!cust ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <div className="container ">
            <div className="m-3 rounded card card-body bg-black">
              <div className="d-md-flex d-block">
                <div className="m-4 col-md-4 d-flex align-items-center justify-content-center">
                  <img
                    src="/avatar.png"
                    style={{ borderRadius: "100%" }}
                    className="img-fluid "
                    alt=""
                    srcSet=""
                  />
                </div>
                <div className="col-md-8 col-12 d-md-flex align-items-center justify-content-center">
                  <div className="text-secondary text-start m-5">
                    <div>
                      <h6>Customer</h6>
                      <h3 className="fw-bold text-primary">
                        {cust.name}
                      </h3>
                    </div>
                    <div className="my-2">
                      <h6>Address</h6>
                      <h3 className="fw-bold text-primary">
                        {cust.addres}
                      </h3>
                    </div>
                    <div>
                      <h6>Phone</h6>
                      <h3 className="fw-bold text-primary">
                        {cust.phoneNo}
                      </h3>
                    </div>
                    <div>
                      <h6>Banks you've applied</h6>
                      {/* <h3 className="fw-bold text-primary">
                        {cust.bnkData === null ? (
                          <div>
                            <h3>No Banks applied yet</h3>
                          </div>
                        ) : (
                          <div>
                            {cust.bnkData.map((item, index) => (
                              <div key={index}>
                                <h3 className="fw-bold">
                                  {index + 1}. {item[0]}, {item[1]}
                                </h3>
                              </div>
                            ))}
                          </div>
                        )}
                      </h3> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <h6 className="text-start pb-3">Available Documents</h6>

            <div className="d-flex justify-content-center align-items-center">
              <a
                href={cust.aadhar}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-black mx-3"
              >
                <img
                  src={cust.aadhar}
                  alt=""
                  style={{ height: "400px" }}
                  srcSet=""
                />
              </a>
              <a
                href={cust.pan}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-black mx-3"
              >
                <img
                  src={cust.pan}
                  alt=""
                  style={{ height: "400px" }}
                  srcSet=""
                />
              </a>
            </div>
          </div>
        )}

        <hr />

        <h6 className="text-start pb-3">Available Banks</h6>
          <div className="container text-white">
            <div className="d-md-flex">
              {banks.map((item) => (
                <div
                  className="m-3 rounded card card-body bg-black"
                >
                  <p className="text-secondary p">Bank Id: #{item["attributes"]["bid"]}</p>
                  <h3>
                    {item["attributes"]["name"]}
                  </h3>
                  <h5>
                    {item["attributes"]["addres"]}
                  </h5>
                </div>
              ))}
        

        <h6 className="pb-3 mt-5">Add Bank to User with ID</h6>
        <div className="input-group-append">
          <input
            type="number"
            className="bg-dark form-control text-white rounded"
            value={bid}
            onChange={(e) => setBid(e.target.value)}
          />
          <button
            type="button"
            className="mt-2 btn btn-primary d-block fw-bold text-center"
            onClick={addBank}
            style={{ width: "100%" }}
          >
            Add
          </button>
        </div>
      </div>
      </div>
      </div>
      
    </Layout>
)
};

export default Customer;
