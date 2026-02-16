import api from '../api/axios';

export interface Property {
    _id: string;
    title: string;
    description: string;
    address: string;
    pricePerNight: number;
    media: {
        url: string;
        publicId: string;
        resourceType: 'image' | 'video';
    }[];
    amenities: string[];
    maxGuests: number;
    status: 'available' | 'booked' | 'maintenance';
}

export interface BookingData {
    fullName: string;
    email: string;
    phoneNumber: string;
    preferredApartment?: string; // This will be the Property ID
    checkInDate: string;
    checkOutDate: string;
    numberOfGuests: number;
    additionalMessage?: string;
}

export const getProperties = async (params?: { search?: string; minPrice?: number; maxPrice?: number; guests?: number }): Promise<Property[]> => {
    const response = await api.get('/properties', { params });
    // Backend returns { success: true, count: number, data: Property[] }
    return response.data.data;
};

export const getProperty = async (id: string): Promise<Property> => {
    const response = await api.get(`/properties/${id}`);
    return response.data.data;
};

export const createBooking = async (data: BookingData) => {
    const response = await api.post('/bookings', data);
    return response.data;
};
