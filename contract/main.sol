// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.9.0;
pragma experimental ABIEncoderV2;
 
contract test5{
    
    struct customer {           
        string name;
        string addres;
        uint phoneNo;
        bool verified;
        string status;
        uint[] banks;
        string aadhar;
        string pan;
     }
    
    mapping (uint => uint ) public type_user;//check if user type_user
    mapping (uint => customer) c_info;//mapping from id to customer struct
    mapping (address => uint) public addresstoId;//mapping from address to id
    uint[] public Bank_ids;
    string[] public Bank_names;

    uint[] public KYC_pending;
    
    uint customercount;
    uint public bankcount;
    uint hlp=1000;
  
    //register customer
    function addCustomerInfo (string memory _name, string memory _addres,uint _phoneNo,string memory _aadhar,string memory _pan) public  {
        require(addresstoId[msg.sender]==0);
        uint id=customercount+1;
        customercount++; 
        c_info[id].name = _name;
        c_info[id].addres = _addres;
        c_info[id].phoneNo = _phoneNo;
        c_info[id].aadhar= _aadhar;
        c_info[id].pan= _pan;
        c_info[id].status= "pending";
        c_info[id].verified=false;
        type_user[id] = 1; 
        addresstoId[msg.sender] = id;
        KYC_pending.push(id);
    }

    function getCustomerInfo() public view returns(string memory name , string memory addres,uint phoneNo ,bool ver,string memory status, uint[]memory banks,string memory aadhar,string memory pan){
        uint id=addresstoId[msg.sender];
        require(type_user[id]==1 && addresstoId[msg.sender]==id);
        return(c_info[id].name, c_info[id].addres, c_info[id].phoneNo,c_info[id].verified,c_info[id].status,c_info[id].banks,c_info[id].aadhar,c_info[id].pan);
    }

//for customers to add Bank to their details
    function addBank_Customer(uint bid) public {
        uint cid=addresstoId[msg.sender];
        require(type_user[cid]==1 && type_user[bid]==2);
        // customer memory x=c_info[cid];
        // require(x.verified);
        c_info[cid].banks.push(bid);
        b_info[bid].customers.push(cid);
    }

//for Bank
    function Verify1(uint cid) public {
        uint bid=addresstoId[msg.sender];
        require(type_user[cid]==1 && type_user[bid]==2);
        customer storage x=c_info[cid];
        x.verified=true;
        x.status="success";
    }

    function Verify2(uint cid) public {
        uint bid=addresstoId[msg.sender];
        require(type_user[cid]==1 && type_user[bid]==2);
        customer storage x=c_info[cid];
        x.verified=true;
        x.status="rejected";
    }
       
//Bank starts here
     struct Bank{
        string name;
        string addres;
        uint customer_count;
        uint[] customers;
    }
    
    mapping(uint=>Bank) b_info;
  
    //Register Bank
    function addBankInfo(string memory _name,string memory _addres) public {
        require(addresstoId[msg.sender]==0);
        uint bank_id=hlp+bankcount;
        bankcount++; 
        b_info[bank_id].name = _name;
        b_info[bank_id].addres = _addres;
        b_info[bank_id].customer_count+=1;
        type_user[bank_id]=2;
        addresstoId[msg.sender] = bank_id;
        Bank_ids.push(bank_id);
        Bank_names.push(_name);
    }

       function getBankInfo_bank() public view returns(string memory name ,string memory addres, uint count, uint[]memory customers){
       uint bankid=addresstoId[msg.sender];
       require(type_user[bankid]==2);
        return(b_info[bankid].name,b_info[bankid].addres,b_info[bankid].customer_count,b_info[bankid].customers);
    }

    function getBankInfo(uint bankid) public view returns(string memory name ,string memory addres, uint count, uint[]memory customers){
        return(b_info[bankid].name,b_info[bankid].addres,b_info[bankid].customer_count,b_info[bankid].customers);
    }
 
       

    function getCustomerInfo_Bank(uint cid) public view returns(string memory name , string memory addres,uint phoneNo ,bool ver,string memory aadhar,string memory pan){
        // uint bid=addresstoId[msg.sender];
        // require(type_user[cid]==1 && type_user[bid]==2);
        // bool x=false;
        // for (uint i=0;i<c_info[cid].banks.length; i++) {
        // if(c_info[cid].banks[i]==bid)
        // {
        // x=true;
        // break;
        // }
        // }
        // require(x);
        return(c_info[cid].name, c_info[cid].addres, c_info[cid].phoneNo,c_info[cid].verified,c_info[cid].aadhar,c_info[cid].pan);
    }
       

      
//Identify 
    function Identify() public view returns (uint val) {
        uint No = addresstoId[msg.sender];
        if(type_user[No]==0){
            return(0);
        }
        else 
            return(type_user[No]);
    }
}