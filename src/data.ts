import {
  SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
  SC_ERC721_LEDGER_CONTRACT_ADDRESS,
  SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS,
} from '@big-whale-labs/constants'
import Network from '@/models/Network'

const data = {
  ERC721: {
    ledger: SC_ERC721_LEDGER_CONTRACT_ADDRESS,
    network: Network.Goerli,
    ownerContent: (original: string) =>
      `This is a zkNFT derivative. It means this person has been verified to own at least one ${original} Goerli NFT.`,
  },
  Email: {
    ledger: SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
    network: Network.Goerli,
    ownerContent: (original: string) =>
      `This is a zkNFT derivative of an email. It means this person has been verified own a ${original} email.`,
  },
  ExternalERC721: {
    ledger: SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS,
    network: Network.Mainnet,
    ownerContent: (original: string) =>
      `This is a zkNFT derivative. It means this person has been verified to own at least one ${original} Mainnet NFT.`,
  },
}

export default data
