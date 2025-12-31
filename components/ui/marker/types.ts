export interface CustomMarkerViewProps {
    location: Location;
    onViewReady?: () => void;
}

export interface Location {
    id: string;
    coordinate: {
        latitude: number;
        longitude: number;
    };
    image: any;
    name: string;
    address: string;
    rating?: number;
}