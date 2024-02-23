import { Hero } from "../components/home";
import { MaxWidthWrapper, Page } from "../components/Page";

const spacing = 8;
export default function Home() {
  return (
    <Page spacing={spacing}>
      <MaxWidthWrapper>
        <Hero />
      </MaxWidthWrapper>
    </Page>
  );
}
