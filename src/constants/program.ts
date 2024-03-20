import { PublicKey } from "@solana/web3.js";

export const DISTRIBUTION_PROGRAM_ID = new PublicKey("diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay");
export const WNS_PROGRAM_ID = new PublicKey("wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM");

export const RPC_URL = process.env.REACT_APP_RPC_URL ?? "https://mainnet.helius-rpc.com/?api-key=b3f98319-e5de-47ad-9f80-364062abc638";
