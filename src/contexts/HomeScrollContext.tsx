import { ReactNode, createContext, useContext, useRef } from "react";

type RefType = React.RefObject<HTMLDivElement> | null;
const HomeScrollContext = createContext<{
  tokenomicsRef: RefType;
  aboutRef: RefType;
  foundationRef: RefType;
}>({ tokenomicsRef: null, aboutRef: null, foundationRef: null });

export const HomeScrollContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const tokenomicsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const foundationRef = useRef<HTMLDivElement>(null);

  return (
    <HomeScrollContext.Provider
      value={{ tokenomicsRef, aboutRef, foundationRef }}
    >
      {children}
    </HomeScrollContext.Provider>
  );
};

export function useHomeScrollContext() {
  const context = useContext(HomeScrollContext);

  const options: ScrollIntoViewOptions = { behavior: "smooth", block: "start" };
  const tokenomics = () =>
    context.tokenomicsRef?.current?.scrollIntoView(options);
  const about = () => context.aboutRef?.current?.scrollIntoView(options);
  const foundation = () =>
    context.foundationRef?.current?.scrollIntoView(options);

  const firstOnPage = about;

  const scrollTo = { firstOnPage, tokenomics, about, foundation };

  return { ...context, scrollTo };
}
