import { create } from "zustand";

import { DriverStore, LocationStore, MarkerData } from "@/types/type";

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));

    // if driver is selected and now new location is set, clear the selected driver
    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    if (selectedDriver) clearSelectedDriver();
  },

  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));

    // if driver is selected and now new location is set, clear the selected driver
    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    if (selectedDriver) clearSelectedDriver();
  },
}));

// This guy show nears drivers on the map
export const useDriverStore = create<DriverStore>((set) => ({
  // Available drivers starts as empty array
  drivers: [] as MarkerData[],
  // No driver is selected by default
  selectedDriver: null,
  // If the user selects a driver, the driver id is stored here
  setSelectedDriver: (driverId: number) =>
    set(() => ({ selectedDriver: driverId })),
  //  All the drivers allowed to travel are stored here
  setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers })),
  //  Clear the selected driver
  clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
}));
