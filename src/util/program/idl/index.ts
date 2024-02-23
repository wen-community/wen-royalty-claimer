import distributionIdl from "./wen_royalty_distribution.json";
import standardIdl from "./wen_new_standard.json";
import { WenRoyaltyDistribution } from "./wen_royalty_distribution";
import { WenNewStandard } from "./wen_new_standard";
import { PublicKey } from "@solana/web3.js";

export type WenDistribution = WenRoyaltyDistribution;
export type WenStandard = WenNewStandard;
export type TokenGroup = {
    updateAuthority: PublicKey,
    mint: PublicKey,
    size: number,
    maxSize: number
}
export type TokenGroupMember = {
    mint: PublicKey,
    group: PublicKey,
    memberNumber: number,
}
export {
    distributionIdl,
    standardIdl
}