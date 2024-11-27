"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type OfferContextType = {
  refetchOffer: boolean;
  changeOfferStatus: (value: boolean) => void;
};

const OfferContext = createContext<OfferContextType | undefined>(undefined);

const OfferContextProvider = ({ children }: { children: ReactNode }) => {
  const [refetchOffer, setRefetchOffer] = useState<boolean>(false);

  const changeOfferStatusHandler = (value: boolean) => {
    setRefetchOffer(value);
  };

  const offerContext = {
    refetchOffer,
    changeOfferStatus: changeOfferStatusHandler,
  };

  return (
    <OfferContext.Provider value={offerContext}>
      {children}
    </OfferContext.Provider>
  );
};


export const useOfferContext = () => {
  const context = useContext(OfferContext);
  if (!context) {
    throw new Error(
      "useOfferContext must be used within an OfferContextProvider"
    );
  }
  return context;
};

export default OfferContextProvider;
