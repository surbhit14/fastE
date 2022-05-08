import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useNotification } from "web3uikit";

function Bank() {
  const { Moralis, account,user, } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const dispatch = useNotification();
  const [bank, setBank] = useState([]);
  const [regcusts,setregCusts]=useState([]);
  const [address, setAddress] = useState();

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

  useEffect(() => {
      
    const getDetails = async () => {
    
    if(!bank || !regcusts || !account){
    
    const  bnk= Moralis.Object.extend("Bank");
    const regcust=Moralis.Object.extend("CustomertoBanks");
    const c=Moralis.Object.extend("Customers");
    const useraddr=user.attributes.ethAddress;
    
    setAddress(useraddr)

    if(address){
        setAddress(user["attributes"]["accounts"][0]);
    const q1 = new Moralis.Query(bnk);
    const q2 = new Moralis.Query(regcust);
    const q3=   new Moralis.Query(c);
    q1.equalTo("bid", String(1000));
    const res1 = await q1.find();
    console.log(res1);
    q2.equalTo("bid", String(1000));
    const res2 = await q2.find();
    console.log(res2);
    var cids=res2.map((item)=>{
        return item["attributes"]["cid"];
    })

   var custs=[]
    for(var i=0;i<cids.length;i++)
    {
        q3.equalTo("cid",i);
        var res = await q3.find();
        custs.push(res);
    }

    console.log(custs);
    
    setBank(res1[0]["attributes"]);
    setregCusts(res2);
    }
        }
    };

    
    getDetails();
  }, [regcusts,bank,address,user]);

 
  return (
    <Layout>
      <div className="container text-white mt-3">
        {bank ? (
          <div className="d-md-flex align-items-center justify-content-center">
            <div className="card bg-dark w-100">
              <div className="card-body">
                <h6 className="card-title text-secondary">Bank Details</h6>
                <h3 className="card-subtitle mb-2 text-white fw-bold">
                  Bank Id: {bank.bid}
                </h3>
                <h3 className="card-subtitle mb-2 text-white fw-bold">
                  Bank Name: {bank.name}
                </h3>
                <h3 className="card-subtitle mb-2 text-white fw-bold">
                  Bank Address: {bank.address}
                </h3>
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        )}

<h6 className="text-start pb-3">Available Customers</h6>
          <div className="container text-white">
            <div className="d-md-flex">
              {regcusts.map((item) => (
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
        
      </div>
      </div>
      </div>
    </Layout>
  );
}

export default Bank;
