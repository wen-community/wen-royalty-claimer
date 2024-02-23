import { Buffer } from 'buffer';
import { struct } from '@solana/buffer-layout';
import { publicKey } from '@solana/buffer-layout-utils';
import { LENGTH_SIZE, Mint, TYPE_SIZE } from "@solana/spl-token";
import { TokenMetadata, unpack } from '@solana/spl-token-metadata';
import { PublicKey } from '@solana/web3.js';
import { TokenGroup, TokenGroupMember } from './idl';

/** GroupPointer as stored by the program */
export interface GroupPointer {
    /** Optional authority that can set the metadata address */
    authority: PublicKey | null;
    /** Optional Account Address that holds the group */
    groupAddress: PublicKey | null;
}

/** Buffer layout for de/serializing a Metadata Pointer extension */
export const GroupPointerLayout = struct<{ authority: PublicKey; groupAddress: PublicKey }>([
    publicKey('authority'),
    publicKey('groupAddress'),
]);

/** GroupMemberPointer as stored by the program */
export interface GroupMemberPointer {
    /** Optional authority that can set the member address */
    authority: PublicKey | null;
    /** Optional Account Address that holds the member */
    memberAddress: PublicKey | null;
}

/** Buffer layout for de/serializing a Metadata Pointer extension */
export const GroupMemberPointerLayout = struct<{ authority: PublicKey; memberAddress: PublicKey }>([
    publicKey('authority'),
    publicKey('memberAddress'),
]);

function addTypeAndLengthToLen(len: number): number {
    return len + TYPE_SIZE + LENGTH_SIZE;
}

enum ExtendedExtensionType {
    Uninitialized,
    TransferFeeConfig,
    TransferFeeAmount,
    MintCloseAuthority,
    ConfidentialTransferMint,
    ConfidentialTransferAccount,
    DefaultAccountState,
    ImmutableOwner,
    MemoTransfer,
    NonTransferable,
    InterestBearingConfig,
    CpiGuard,
    PermanentDelegate,
    NonTransferableAccount,
    TransferHook,
    TransferHookAccount,
    // ConfidentialTransferFee, // Not implemented yet
    // ConfidentialTransferFeeAmount, // Not implemented yet
    MetadataPointer = 18, // Remove number once above extensions implemented
    TokenMetadata = 19, // Remove number once above extensions implemented
    /// Mint contains a pointer to another account (or the same account) that
    /// holds group configurations
    GroupPointer = 20,
    /// Mint contains a pointer to another account (or the same account) that
    /// holds group member configurations
    GroupMemberPointer = 22,
}
function getExtensionData(extension: ExtendedExtensionType, tlvData: Buffer): Buffer | null {
    let extensionTypeIndex = 0;
    while (addTypeAndLengthToLen(extensionTypeIndex) <= tlvData.length) {
        const entryType = tlvData.readUInt16LE(extensionTypeIndex);
        const entryLength = tlvData.readUInt16LE(extensionTypeIndex + TYPE_SIZE);
        const typeIndex = addTypeAndLengthToLen(extensionTypeIndex);
        if (entryType === extension) {
            return tlvData.slice(typeIndex, typeIndex + entryLength);
        }
        extensionTypeIndex = typeIndex + entryLength;
    }
    return null;
}

export function getGroupPointerState(mint: Mint): Partial<GroupPointer> | null {
    const extensionData = getExtensionData(ExtendedExtensionType.GroupPointer, mint.tlvData);
    if (extensionData !== null) {
        const { authority, groupAddress } = GroupPointerLayout.decode(extensionData);

        // Explicity set None/Zero keys to null
        return {
            authority: authority.equals(PublicKey.default) ? null : authority,
            groupAddress: groupAddress.equals(PublicKey.default) ? null : groupAddress,
        };
    } else {
        return null;
    }
}

export function getGroupMemberPointerState(mint: Mint): Partial<GroupMemberPointer> | null {
    const extensionData = getExtensionData(ExtendedExtensionType.GroupMemberPointer, mint.tlvData);
    if (extensionData !== null) {
        const { authority, memberAddress } = GroupMemberPointerLayout.decode(extensionData);

        // Explicity set None/Zero keys to null
        return {
            authority: authority.equals(PublicKey.default) ? null : authority,
            memberAddress: memberAddress.equals(PublicKey.default) ? null : memberAddress,
        };
    } else {
        return null;
    }
}

export function getMetadataState(mint: Mint): Partial<TokenMetadata | null> {
    const extensionData = getExtensionData(ExtendedExtensionType.TokenMetadata, mint.tlvData);

    if (extensionData === null) {
        return null;
    }

    return unpack(extensionData);
}

export interface WnsToken {
    metadata: Partial<TokenMetadata | null>,
    group: Partial<TokenGroup | null>,
    member: Partial<TokenGroupMember | null>
}