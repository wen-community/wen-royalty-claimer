import { ExtensionType, Mint, getExtensionData } from "@solana/spl-token";
import { TokenMetadata, unpack } from '@solana/spl-token-metadata';
import { TokenGroup, TokenGroupMember } from './idl';

export function getMetadataState(mint: Mint): Partial<TokenMetadata | null> {
    const extensionData = getExtensionData(ExtensionType.TokenMetadata, mint.tlvData);

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