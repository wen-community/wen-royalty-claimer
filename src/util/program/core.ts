
import { PublicKey } from "@solana/web3.js";
import { DISTRIBUTION_PROGRAM_ID, WNS_PROGRAM_ID } from "../../constants";
import { Idl, Program, Provider } from "@coral-xyz/anchor";
import { WenDistribution, WenStandard, distributionIdl, standardIdl } from "./idl";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID, getMint } from "@solana/spl-token";
import { WnsToken, getGroupMemberPointerState, getGroupPointerState, getMetadataState } from "./extensions";

export const getProgramAddress = (seeds: Array<Buffer | Uint8Array>, programId: PublicKey) => {
    const [key] = PublicKey.findProgramAddressSync(seeds, programId);
    return key;
};

export const getATAAddressSync = ({ mint, owner }: { mint: PublicKey; owner: PublicKey }): PublicKey => {
    return getProgramAddress(
        [owner.toBuffer(), TOKEN_2022_PROGRAM_ID.toBuffer(), mint.toBuffer()],
        ASSOCIATED_TOKEN_PROGRAM_ID
    );
};

export const getWnsProgram = (provider: Provider) => {
    return new Program(
        standardIdl as Idl,
        WNS_PROGRAM_ID,
        provider
    ) as unknown as Program<WenStandard>;
}


export const getWnsToken = async (provider: Provider, mint: string) => {
    const wnsProgram = getWnsProgram(provider);
    try {
        const mintAccount = await getMint(provider.connection, new PublicKey(mint), "confirmed", TOKEN_2022_PROGRAM_ID);
    
        const metadataAccount = getMetadataState(mintAccount);
        const tokenData: WnsToken = {
            metadata: metadataAccount,
            group: null,
            member: null
        }
        const groupPointerInfo = getGroupPointerState(mintAccount);
        if (groupPointerInfo !== null) {
            // collection NFT
            const groupAccount = groupPointerInfo.groupAddress;
            if (groupAccount !== undefined && groupAccount !== null) {
                const groupData = await wnsProgram.account.tokenGroup.fetch(groupAccount);
                tokenData["group"] = groupData;
            }
        }
        const memberPointerInfo = getGroupMemberPointerState(mintAccount);
        if (memberPointerInfo !== null) {
            // member NFT
            const memberAccount = memberPointerInfo.memberAddress;
            if (memberAccount !== undefined && memberAccount !== null) {
                const memberData = await wnsProgram.account.tokenGroupMember.fetch(memberAccount);
                tokenData["member"] = memberData;
                const groupAccount = memberData.group;
                const groupData = await wnsProgram.account.tokenGroup.fetch(groupAccount);
                tokenData["group"] = groupData;
            }
        }
        return tokenData;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export const getDistributionProgram = (provider: Provider) => {
    return new Program(
        distributionIdl as Idl,
        DISTRIBUTION_PROGRAM_ID,
        provider
    ) as unknown as Program<WenDistribution>;
}

export const getDistributionAccount = (collection: string) => {
    const [distributionAccount] = PublicKey.findProgramAddressSync([new PublicKey(collection).toBuffer()], DISTRIBUTION_PROGRAM_ID);

    return distributionAccount;
}