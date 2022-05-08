import { motion, AnimatePresence } from "framer-motion";

import { Link, useLocation, useHistory } from "react-router-dom";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";


export default function Layout(props) {
  const location = useLocation();
  const { Moralis, account,user } = useMoralis();
  var history = useHistory();
  
  async function fetchUsertype() {
    console.log("Clicked");
    const  c= Moralis.Object.extend("Customers");
    const  b= Moralis.Object.extend("Bank");
    const useraddr=user.attributes.ethAddress;
    console.log(useraddr);
    const q1 = new Moralis.Query(c);
    const q2 = new Moralis.Query(b);
    // q1.equalTo("address", useraddr);
    q1.equalTo("cid", String(1));
    q2.equalTo("bid", String(1000));
    // q2.equalTo("address", useraddr);
    
    const res1 = await q1.find();
    const res2 = await q2.find();
    console.log(res1);
    console.log(res2);
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

  function Header() {
    return (
      <motion.div
        initial={{ opacity: 0.9, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          style={{
            marginTop: "-30px",
            paddingTop: "60px",
            paddingBottom: "30px",
          }}
          className={`fixed-top shadow px-md-4 px-3 d-flex justify-content-between  align-items-center pl-md-5 pl-4 ${
            location.pathname === "/register" ? "bg-dark" : "bg-black"
          } `}
        >
          <div className="d-flex col-12 align-items-center justify-content-between">
            <Link
              to="/"
              style={{ fontSize: "2em" }}
              className="navbar-brand fw-bold text-white me-md-5  me-3"
            >
              <img src="/logo192.png" height="60px" alt="" srcSet="" />
              <span className="text-primary" style={{ marginLeft: "20px" }}>
                fastE
              </span>
            </Link>

            <h5 className="text-white p-3">A quick KYC on the Blockchain</h5>
            {location.pathname === "/" && (
              <button
                onClick={()=>{fetchUsertype()}}
                className="p-3 btn btn-outline-primary fw-bold btn-lg "
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <Header />
      <AnimatePresence>
        <motion.div
          id="page-content"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 2.5 }}
          style={{ paddingTop: "18vh" }}
          className={
            props.contained ? "container overflow-hidden" : "overflow-hidden"
          }
        >
          {props.children}

          <div className="  bg-black text-white py-5 text-center">
            Built by
            <div className="fw-bold">@surbhitagrawal</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
