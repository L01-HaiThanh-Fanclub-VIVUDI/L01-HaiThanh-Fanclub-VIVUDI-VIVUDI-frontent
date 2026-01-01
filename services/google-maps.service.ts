import { GOOGLE_MAPS_API_KEY } from '@/settings';

interface LatLng {
    lat: number;
    lng: number;
}

interface DirectionsLeg {
    distance: {
        text: string;
        value: number;
    };
    duration: {
        text: string;
        value: number;
    };
    start_location: LatLng;
    end_location: LatLng;
}

interface DirectionsRoute {
    overview_polyline: {
        points: string;
    };
    legs: DirectionsLeg[];
}

interface DirectionsResponse {
    routes: DirectionsRoute[];
    status: string;
}

interface RouteInfo {
    coordinates: Array<{ latitude: number; longitude: number }>;
    distance: string;
    duration: string;
}

const decodePolyline = (encoded: string): Array<{ latitude: number; longitude: number }> => {
    const poly: Array<{ latitude: number; longitude: number }> = [];
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
        let b;
        let shift = 0;
        let result = 0;

        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);

        const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
        lat += dlat;

        shift = 0;
        result = 0;

        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);

        const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
        lng += dlng;

        poly.push({
            latitude: lat / 1e5,
            longitude: lng / 1e5,
        });
    }

    return poly;
};

class GoogleMapsService {
    private readonly baseUrl = 'https://maps.googleapis.com/maps/api/directions/json';

    async getDirections(
        origin: { latitude: number; longitude: number },
        destination: { latitude: number; longitude: number },
        mode: 'driving' | 'walking' | 'bicycling' | 'transit' = 'driving'
    ): Promise<RouteInfo | null> {
        try {
            const originStr = `${origin.latitude},${origin.longitude}`;
            const destinationStr = `${destination.latitude},${destination.longitude}`;

            const url = `${this.baseUrl}?origin=${originStr}&destination=${destinationStr}&mode=${mode}&key=${GOOGLE_MAPS_API_KEY}`;

            console.log('Fetching directions from Google Maps API...');

            const response = await fetch(url);
            const data: DirectionsResponse = await response.json();

            if (data.status !== 'OK' || !data.routes || data.routes.length === 0) {
                console.error('Directions API error:', data.status);
                return null;
            }

            const route = data.routes[0];
            const leg = route.legs[0];

            const coordinates = decodePolyline(route.overview_polyline.points);

            console.log(`Route fetched: ${leg.distance.text}, ${leg.duration.text}`);
            console.log(`Route has ${coordinates.length} points`);

            return {
                coordinates,
                distance: leg.distance.text,
                duration: leg.duration.text,
            };
        } catch (error) {
            console.error('Error fetching directions:', error);
            return null;
        }
    }
}

export const googleMapsService = new GoogleMapsService();
