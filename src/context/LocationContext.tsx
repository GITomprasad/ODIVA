"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CITIES_LIST, CityDeliveryInfo, checkPincodeServiceability } from "@/data/deliveryZones";

interface LocationContextType {
  selectedCity: CityDeliveryInfo;
  selectCity: (cityName: string) => void;
  pincode: string;
  setPincode: (pin: string) => void;
  isPincodeValid: boolean;
  serviceText: string;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [selectedCity, setSelectedCity] = useState<CityDeliveryInfo>(CITIES_LIST[0]);
  const [pincode, setPincodeState] = useState<string>("751001");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedCity = localStorage.getItem("odiva_city");
    const savedPin = localStorage.getItem("odiva_pincode");
    if (savedCity) {
      const found = CITIES_LIST.find((c) => c.name.toLowerCase() === savedCity.toLowerCase());
      if (found) setSelectedCity(found);
    }
    if (savedPin) {
      setPincodeState(savedPin);
    }
  }, []);

  const selectCity = (cityName: string) => {
    const found = CITIES_LIST.find((c) => c.name.toLowerCase() === cityName.toLowerCase());
    if (found) {
      setSelectedCity(found);
      setPincodeState(found.samplePincode);
      localStorage.setItem("odiva_city", found.name);
      localStorage.setItem("odiva_pincode", found.samplePincode);
    }
  };

  const setPincode = (pin: string) => {
    setPincodeState(pin);
    localStorage.setItem("odiva_pincode", pin);
  };

  const serviceCheck = checkPincodeServiceability(pincode);
  const isPincodeValid = Boolean(serviceCheck && serviceCheck.isServiceable);
  const serviceText = serviceCheck ? serviceCheck.estimatedDeliveryText : "Coming soon to this area";

  return (
    <LocationContext.Provider
      value={{
        selectedCity,
        selectCity,
        pincode,
        setPincode,
        isPincodeValid,
        serviceText,
        isLocationModalOpen,
        setIsLocationModalOpen,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
