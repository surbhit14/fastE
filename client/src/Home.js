import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { useHistory } from "react-router-dom";
import { ConnectButton} from "web3uikit";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

function Home2() {
  const { Moralis, account,user } = useMoralis();
  var history = useHistory();
  
  async function fetchUsertype() {
    const  c= Moralis.Object.extend("Customers");
    const  b= Moralis.Object.extend("Bank");
    const useraddr=user.attributes.ethAddress;
    const q1 = new Moralis.Query(c);
    const q2 = new Moralis.Query(b);
    q1.equalTo("address", useraddr);
    q2.equalTo("address", useraddr);
    
    const res1 = await q1.find();
    const res2 = await q2.find();
    if(res1.length>0)
    {
      history.push("/customer");
    }
    else if(res2.length>0)
    {
      history.push("/bank");
    }
    else{
      history.push("/register");
    }
  }

 

  return (
    <Layout>
      <div className="d-md-none d-block" style={{ paddingTop: "200px" }}></div>
      <div className="container text-white">
        <div
          style={{ minHeight: "60vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <div>
            <div className="d-md-flex align-items-center justify-content-center">
              <img src="/logo192.png" alt="" srcSet="" />
              <div className="ms-5 pb-3 d-md-flex flex-md-column align-items-start justify-content-center">
                <h1
                  style={{ fontSize: "5rem" }}
                  className="fw-bold text-primary"
                >
                  fastE
                </h1>
                <h6 className=" ">A quick KYC on the blockchain.</h6>
                <ConnectButton  className="btn btn-lg btn-primary fw-bold my-3" />
              </div>
            </div>
          </div>
        </div>

        <hr />

        <h5 className="py-5 text-end my-5  ">
          Powered by the <span className="fw-bold">Polygon network</span>
        </h5>

        <div className="d-md-flex align-items-center vh-100 justify-content-center my-5 container">
          <div className="col-md-5 mx-md-5">
            <img
              src="https://media0.giphy.com/media/H2yMYCqdjVncIUuKPM/giphy.gif?cid=ecf05e47s7swwfwem06b07dm7xnr8g8h6ym6p1gxhevppre0&rid=giphy.gif&ct=s"
              className="img-fluid"
              alt=""
              srcSet=""
            />
          </div>
          <div className="col-md-7 mt-5 mt-md-0">
            <h1 className="fw-bold w-75">Verify Once, Bank Anywhere</h1>
            <p>
              "fastE" aims to be the one-stop KYC for your banking details and
              document management system. "fastE" aims to provide a platform
              for customers to upload their ID proofs and KYC verification to
              apply for an account to various banks.
            </p>
          </div>
        </div>

        <div className="d-md-flex align-items-center justify-content-center my-5 container">
          <div className="col-md-7 mt-5 mt-md-0">
            <h1 className="fw-bold w-75">Decentralized KYC</h1>
            <p>
              Only the banks enrolled by the customer can access their data and
              documents. The platform is completely decentralised and built on
              Polygon network.
            </p>
          </div>
          <div className="col-md-5 mx-md-5">
            <img
              src="https://media2.giphy.com/media/1Zz3VsTDcnpFlGDWHa/giphy.gif?cid=ecf05e47bd7side7qpsqg8wlc7trggybpqrazqm8khj1uuuq&rid=giphy.gif&ct=s"
              className="img-fluid"
              alt=""
              srcSet=""
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home2;
