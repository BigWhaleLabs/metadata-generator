import {
  SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
  SC_ERC721_LEDGER_CONTRACT_ADDRESS,
  SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS,
} from '@big-whale-labs/constants'
import Network from '@/models/Network'

const data = {
  ExternalERC721: {
    ledger: SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS,
    ownerContent: (original: string) =>
      `This is a zkNFT derivative. It means this person has been verified to own at least one ${original} Mainnet NFT.`,
    network: Network.Mainnet,
  },
  Email: {
    ledger: SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
    ownerContent: (original: string) =>
      `This is a zkNFT derivative of an email. It means this person has been verified own a ${original} email.`,
    network: Network.Goerli,
  },
  ERC721: {
    ledger: SC_ERC721_LEDGER_CONTRACT_ADDRESS,
    ownerContent: (original: string) =>
      `This is a zkNFT derivative. It means this person has been verified to own at least one ${original} Goerli NFT.`,
    network: Network.Goerli,
  },
}

export default data
