import React, { useState, useEffect } from "react";
import FundraiserCard from "./FundraiserCard";
import detectEthereumProvider from "@metamask/detect-provider";
import FactoryContract from "./contracts/FundraiserFactory.json";
import Web3 from 'web3'

const Home = () => {
  const [ web3, setWeb3 ] = useState(null);
  const [ contract, setContract] = useState(null);
  const [ accounts, setAccounts ] = useState(null);
  const [ funds, setFunds ] = useState([]);
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const provider = await detectEthereumProvider();
      if (provider) {

        console.log('Ethereum successfully detected!')
      }
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FactoryContract.networks[networkId];
      const accounts = await web3.eth.getAccounts();
      const instance = new web3.eth.Contract(
        FactoryContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      setWeb3(web3);
      setContract(instance);
      setAccounts(accounts);
      
      // const funds = await instance.methods.fundraisers(1, 0).send({ from: accounts[0] })
      // console.log('funds: ', funds)
      // setFunds(funds)
      const funds = await instance.methods.fundraisers(2,0).call()
      console.log('funds:...', funds)
      setFunds(funds)
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`+error
      );
      console.error(error);
    }
  };

  const displayFundraisers = () => {
    
    return funds.map((fundraiser) => {
      return <FundraiserCard fundraiser={fundraiser} key={fundraiser} />;
    });
  };
  const handleClick = async () => {
    const funds = await contract.methods.fundraisers(2,0).call()
    setFunds(funds)
  }

  return <div className="main-container">{displayFundraisers()}</div>;
};

export default Home;
