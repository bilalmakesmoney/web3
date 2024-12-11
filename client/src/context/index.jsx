import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0xC6280156d5A6257D03a3159fD1A446De575cCc74');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
            address,
            form.title,
            form.description,
            form.target,
            new Date(form.deadline).getTime(),
            form.image
        ]
    });
    console.log("contract call success", data)
} 
catch (error) {
    console.log("contract call failure", error)
}}

  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));

    return parsedCampaings;
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    try {
      console.log(`Starting donation to campaign ID: ${pId}, Amount: ${amount} ETH`);
      
      // Ensure amount is greater than 0
      if (!amount || parseFloat(amount) <= 0) {
        throw new Error('Donation amount must be greater than zero.');
      }
  
      // Call the donateToCampaign contract function
      const data = await contract.call('donateToCampaign', [pId], {
        value: ethers.utils.parseEther(amount), // Convert ETH to Wei
      });
  
      console.log('Donation successful:', data);
      return data; // Return data for success confirmation
    } catch (error) {
      console.error('Failed to donate:', error.message || error);
      throw error; // Propagate error to the frontend
    }
  };
  

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);