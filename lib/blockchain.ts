import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { mainnet, polygon, sepolia } from 'viem/chains'
import { ethers } from 'ethers'

// Smart Contract ABI (Simplified)
export const CIPHERMEME_CONTRACT_ABI = [
  "function createEncryptedMeme(string memory memeId, string memory encryptedHash) public",
  "function getMeme(string memory memeId) public view returns (string memory)",
  "function likeMeme(string memory memeId) public",
  "function shareMeme(string memory memeId) public",
  "function getMemeStats(string memory memeId) public view returns (uint256, uint256, uint256)",
  "event MemeCreated(address indexed creator, string memeId, uint256 timestamp)",
  "event MemeLiked(string memeId, address indexed liker)",
  "event MemeShared(string memeId, address indexed sharer)"
]

// Contract Address (Testnet)
export const CONTRACT_ADDRESS = {
  sepolia: "0xYourContractAddressHere",
  polygon: "0xYourContractAddressHere",
  mainnet: "0xYourContractAddressHere"
}

export class BlockchainService {
  private static provider: ethers.BrowserProvider | null = null
  private static signer: ethers.JsonRpcSigner | null = null
  private static contract: ethers.Contract | null = null

  static async connectWallet() {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('MetaMask not installed')
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      this.provider = new ethers.BrowserProvider(window.ethereum)
      this.signer = await this.provider.getSigner()
      
      // Initialize contract
      this.contract = new ethers.Contract(
        CONTRACT_ADDRESS.sepolia,
        CIPHERMEME_CONTRACT_ABI,
        this.signer
      )

      return {
        address: accounts[0],
        chainId: await this.getChainId(),
        provider: this.provider,
        signer: this.signer
      }
    } catch (error) {
      console.error('Wallet connection failed:', error)
      throw error
    }
  }

  static async getChainId() {
    if (!this.provider) return null
    const network = await this.provider.getNetwork()
    return Number(network.chainId)
  }

  static async createMemeOnChain(memeId: string, encryptedHash: string) {
    if (!this.contract || !this.signer) {
      throw new Error('Wallet not connected')
    }

    try {
      const tx = await this.contract.createEncryptedMeme(memeId, encryptedHash)
      const receipt = await tx.wait()
      
      return {
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        memeId
      }
    } catch (error) {
      console.error('Create meme on chain failed:', error)
      throw error
    }
  }

  static async likeMeme(memeId: string) {
    if (!this.contract) {
      throw new Error('Wallet not connected')
    }

    const tx = await this.contract.likeMeme(memeId)
    await tx.wait()
    return tx.hash
  }

  static async shareMeme(memeId: string) {
    if (!this.contract) {
      throw new Error('Wallet not connected')
    }

    const tx = await this.contract.shareMeme(memeId)
    await tx.wait()
    return tx.hash
  }

  static async getMemeStats(memeId: string) {
    if (!this.contract) {
      throw new Error('Contract not initialized')
    }

    try {
      const stats = await this.contract.getMemeStats(memeId)
      return {
        likes: Number(stats[0]),
        shares: Number(stats[1]),
        views: Number(stats[2])
      }
    } catch (error) {
      console.error('Get stats failed:', error)
      return { likes: 0, shares: 0, views: 0 }
    }
  }
}

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}
