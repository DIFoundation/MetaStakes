'use client'
import React, { useState } from 'react'
import { useWriteContract } from 'wagmi'
import { cSTTTokenAbi, cSTTTokenAddress } from '@/contractAddressAndABI'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'
import { isAddress } from 'viem'

export default function FaucetPage() {
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState('')
    const { writeContractAsync } = useWriteContract()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!address) {
            toast.error('Please enter a wallet address')
            return
        }

        if (!isAddress(address)) {
            toast.error('Please enter a valid Ethereum address')
            return
        }

        try {
            setLoading(true)
            await writeContractAsync({
                address: cSTTTokenAddress,
                abi: cSTTTokenAbi,
                functionName: "faucet",
                args: [address],
            })
            toast.success('Successfully claimed 100 STT tokens!')
            setAddress('') // Clear the input after successful claim
        } catch (error) {
            console.error('Claim error:', error)
            const errorMessage = error instanceof Error ? error.message : 'Failed to claim tokens'
            toast.error(`Claim failed: ${errorMessage}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-black/50 p-8 rounded-xl shadow-lg">
                <h2 className="text-base/7 font-semibold text-white">Faucet</h2>
                <p className="mt-1 text-sm/6 text-gray-400">
                    Claim STT tokens for testing purposes. Enter any valid Ethereum address below.
                </p>
                
                <div className="mt-6">
                    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-md">
                        <input
                            type="text"
                            placeholder="Enter any Ethereum address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value.trim())}
                            className="w-full rounded-md bg-black/5 px-3 py-2.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end">
                    <button
                        type="submit"
                        disabled={!address || loading}
                        className="rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-colors"
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                Processing...
                            </span>
                        ) : (
                            "Claim STT Tokens"
                        )}
                    </button>
                </div>
                <p className="mt-6 text-xs text-gray-400 text-center">
                    Token address: <br />
                    <span className="font-mono break-all text-xs">{cSTTTokenAddress}</span>
                </p>
            </form>
        </div>
    )
}