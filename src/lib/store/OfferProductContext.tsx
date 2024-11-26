import { createContext, ReactNode, useState } from "react";

type OfferContextType = {
  refetchOffer: boolean;
  changeOfferStatus: (value: boolean) => void;
};

export const OfferContext = createContext<OfferContextType | undefined>(
  undefined
);

const OfferContextProvider = ({ children }: { children: ReactNode }) => {
  const [refetchOffer, setRefetchOffer] = useState<boolean>(false);

  const changeOfferStatusHandler = (value: boolean) => {
    setRefetchOffer(value);
  };

  const offerContext = {
    refetchOffer: refetchOffer,
    changeOfferStatus: changeOfferStatusHandler,
  };
  return (
    <OfferContext.Provider value={offerContext}>
      {children}
    </OfferContext.Provider>
  );
};

export default OfferContextProvider;
