import { Connection, PublicKey } from "@solana/web3.js";
import { getDistributionAccount, getDistributionProgram, getWnsToken } from "./core";
import { AnchorProvider, BN, Provider } from "@coral-xyz/anchor";
import { TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { RPC_URL } from "../../constants";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

export const useProvider = () => {
    const connection = new Connection(RPC_URL);
    const wallet = useAnchorWallet();
    if (!wallet) return undefined;
    const provider = new AnchorProvider(connection, wallet, {});

    return provider;
}

export const buildClaimDistributionIx = async (provider: Provider, distribution: string) => {
    const distributionProgram = getDistributionProgram(provider);
    const distributionAccount = new PublicKey(distribution);

    const creatorPubkey = provider.publicKey;
    const mintPubkey = PublicKey.default;

    if (!creatorPubkey) return undefined;

    let creatorTokenAccount = creatorPubkey;
    let programTokenAccount = distributionAccount;

    const ix = await distributionProgram.methods
        .claimDistribution(mintPubkey)
        .accountsStrict({
            creator: creatorPubkey,
            distribution: distributionAccount,
            creatorTokenAccount: creatorTokenAccount,
            distributionTokenAccount: programTokenAccount,
            tokenProgram: TOKEN_2022_PROGRAM_ID,
        })
        .instruction();

    return ix;
};

export const fetchDistributionAccount = async (provider: Provider, collection: string) => {
    const distributionProgram = getDistributionProgram(provider);
    const distributionAddress = getDistributionAccount(collection);

    const distributionAccount = await distributionProgram.account.distributionAccount.fetch(distributionAddress);
    
    return {
        address: distributionAddress,
        account: distributionAccount
    }
}

export const fetchEligibleDistributionForUser = async (provider: Provider, mint: string) => {
    const collection = await fetchCollectionFromNft(provider, mint);
    if (!collection) return {
        distributionAddress: PublicKey.default,
        amount: 0
    };
    const { address: distributionAddress, account: distributionAccount } = await fetchDistributionAccount(provider, collection.toString());
    const creator = provider.publicKey?.toString();

    if (!creator) return {
        distributionAddress,
        amount: 0
    };
    const data = distributionAccount.claimData;

    const creatorBalance: BN = data.find((d) => d.address.toString() === creator)?.claimAmount ?? new BN(0);

    return {
        distributionAddress,
        amount: creatorBalance.toNumber() / 10 ** 9
    };
}

export const fetchCollectionFromNft = async (provider: Provider, nftMint: string) => {
    const wnsToken = await getWnsToken(provider, nftMint);
    const group = wnsToken?.group;

    if (!group) {
        return undefined;
    }

    const collectionMint = group.mint;
    console.log( {mint: collectionMint?.toString()} );
    return collectionMint;
}