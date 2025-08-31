
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MetaStakeModule = buildModule("MetaStakeModule", (m) => {
  // Get the deployer account
  // const deployer = m.getAccount(0);

  // Deploy sLiskToken (assuming it's the staking token, like XFI)
  const sLiskToken = m.contract("sLiskToken", [
    "sLisk Token",
    "SLISK",
    m.getParameter("initialSupply", 1_000_000_000),
  ]);

  // Deploy MockUSDC
  const mockUSDC = m.contract("MockUSDC", []);

  // Deploy sbFTToken
  const sbFTToken = m.contract("SbFTToken", [
    "Stake and Bake FT",
    "SBFT",
  ]);

  // Deploy StakingContract
  const stakingContract = m.contract("StakingContract", [
    sLiskToken,
    sbFTToken,
  ]);

  // Deploy StakeAndBakeNFT
  const stakeAndBakeNFT = m.contract("StakeAndBakeNFT", [
    "Stake and Bake NFT",
    "SBNFT",
    sLiskToken,
    sbFTToken,
    m.getParameter("tokenURI", "https://ipfs.io/ipfs/bafkreibki2gkw3mqs6emnoqlddxsobkhg5ntlet3273izcn6hlt5xo6odu"),
  ]);

  // Set the staking contract address in sbFTToken
  m.call(sbFTToken, "setStakingContract", [stakingContract]);

  // Set the master NFT address in StakingContract
  m.call(stakingContract, "setMasterNFT", [stakeAndBakeNFT]);

  // Deploy sbFTMarketplace
  const sbFTMarketplace = m.contract("SbFTMarketplace", [
    sbFTToken,
    mockUSDC,
  ]);

  // Deploy VotingContract
  const votingContract = m.contract("VotingContract", [sbFTToken]);

  // Deploy WrappedsbFTToken
  const wrappedSbFTToken = m.contract("WrappedSbFTToken", [
      "Wrapped sbFT Token",
      "wsbFT",
  ]);

  // Deploy SbFTBridgeFactory
  const sbFTBridgeFactory = m.contract("SbFTBridgeFactory", []);


  return {
    sLiskToken,
    mockUSDC,
    sbFTToken,
    stakingContract,
    stakeAndBakeNFT,
    sbFTMarketplace,
    votingContract,
    wrappedSbFTToken,
    sbFTBridgeFactory,
  };
});

export default MetaStakeModule;
