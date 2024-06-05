import { Column, Image } from "../common";
import { HERO_LOGO } from "../../constants";
import { Button, Input, Stack, Typography } from "@mui/material";
import { useHomeScrollContext } from "../../contexts";
import { buildClaimDistributionIx, fetchEligibleDistributionForUser, shakeAnimation, useProvider } from "../../util";
import { useState } from "react";
import { ComputeBudgetProgram, PublicKey, Transaction } from "@solana/web3.js";

export default function Hero() {
  const provider = useProvider();

  const [transaction, setTransaction] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
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
    const prioIx = ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 100_000 });
    if (!distributionIx) return;

    const txn = new Transaction();
    txn.add(prioIx);
    txn.add(distributionIx);

    setLoading(true);
    const result = await provider.sendAndConfirm(txn, []);
    setLoading(false);
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
      { loading && <Typography variant="body1">Transaction in progress...</Typography>}
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
