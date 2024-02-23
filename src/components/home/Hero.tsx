import { Column, Image } from "../common";
import { HERO_LOGO } from "../../constants";
import { Button, Input, Link, Stack, Typography } from "@mui/material";
import { useHomeScrollContext } from "../../contexts";
import { buildClaimDistributionIx, fetchEligibleDistributionForUser, shakeAnimation, useProvider } from "../../util";
import { useState } from "react";
import { PublicKey, Transaction } from "@solana/web3.js";

export default function Hero() {
  const provider = useProvider();

  const [transaction, setTransaction] = useState<string | undefined>();
  const [nftMint, setNftMint] = useState<string | undefined>();
  const [distribution, setDistribution] = useState<string | undefined>();
  const [eligibleDistribution, setEligibleDistribution] = useState<number | undefined>();

  const loadDistribution = async () => {
    if (!provider || !nftMint) return;
    try {
      new PublicKey(nftMint);
    } catch {
      return;
    }
    const { distributionAddress, amount } = await fetchEligibleDistributionForUser(provider, nftMint);
    setDistribution(distributionAddress.toString());
    setEligibleDistribution(amount);
  }

  const claimDistribution = async () => {
    if (!distribution || distribution === PublicKey.default.toString() || !provider) return;
    const distributionIx = await buildClaimDistributionIx(provider, distribution);
    if (!distributionIx) return;

    const txn = new Transaction();

    txn.add(distributionIx);

    const result = await provider.sendAndConfirm(txn, []);

    if (result) {
      setTransaction(result);
    }
  }
  return (
    <Column
      sx={{ py: "100px" }}
      alignItems="center"
      textAlign="center"
      spacing={4}
    >
      <Logo />
      <Typography variant="h3">
        Load your royalties by entering an NFT mint from the collection you want to check.
      </Typography>
      { eligibleDistribution === undefined && 
        <>
          <Input value={nftMint} onChange={(e) => setNftMint(e.target.value)}/>
          <Button onClick={loadDistribution}>Check Royalties</Button>
        </>
      }
      { eligibleDistribution !== undefined && 
        <>
          <Typography variant="h4">Eligible for {eligibleDistribution} SOL for collection {nftMint} </Typography>
          <Button onClick={claimDistribution}>Claim Royalties</Button>
        </>
      }
      { transaction !== undefined && <Typography variant="h4">View your <a href={`https://xray.helius.xyz/tx/${transaction}?network=mainnet`} >Transaction</a></Typography>}
    </Column>
  );
}

function Logo() {
  const { scrollTo } = useHomeScrollContext();

  return (
    <Stack sx={{ cursor: "pointer" }} onClick={scrollTo.firstOnPage}>
      <Image
        src={HERO_LOGO}
        mobileHeight="100px"
        height="250px"
        sx={{
          ":hover": { animation: `${shakeAnimation} 0.5s linear infinite` },
        }}
        variant="fixed-height"
      />
    </Stack>
  );
}
