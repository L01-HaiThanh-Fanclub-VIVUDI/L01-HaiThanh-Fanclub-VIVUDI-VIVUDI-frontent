export interface CustomMarkerViewProps {
    location: Location;
    onViewReady?: () => void;
}

export interface Location {
    id: string,
    title: string,
    subtitle: string,
    image: any,
    coordinate: { latitude: number, longitude: number },
}