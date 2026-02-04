import { create } from 'zustand';

interface BookingStore {
    isOpen: boolean;
    selectedPropertyId: string | null;
    openBooking: (propertyId?: string) => void;
    closeBooking: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
    isOpen: false,
    selectedPropertyId: null,
    openBooking: (propertyId) => set({ isOpen: true, selectedPropertyId: propertyId || null }),
    closeBooking: () => set({ isOpen: false, selectedPropertyId: null }),
}));
