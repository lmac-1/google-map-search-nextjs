"use client";
import {
  //CircleF,
  GoogleMap,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";
import { PlacesAutocomplete } from "./components/PlacesAutocomplete";
import { getGeocode, getLatLng } from "use-places-autocomplete";

const DEFAULT_LOCATION = { lat: 37.98, lng: 23.72 };

export default function Home() {
  const [lat, setLat] = useState(DEFAULT_LOCATION.lat);
  const [lng, setLng] = useState(DEFAULT_LOCATION.lng);

  const libraries = useMemo(() => ["places"], []);
  // This gives coordinates for the center of the map
  const mapCenter = useMemo(() => ({ lat, lng }), [lat, lng]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  // This loads the google maps script into our application
  const { isLoaded } = useLoadScript({
    // your API key will be publicly exposed, so be sure to apply HTTP restrictions on the Google Cloud console
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    // This specifies the google maps libraries that we want to load (e.g. we could add drawing, geometry, places etc)
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex justify-center align-center">
      <div className="border border-r-gray-400 w-1/4 h-screen bg-gray-200">
        <PlacesAutocomplete
          onAddressSelect={(address) => {
            getGeocode({ address }).then((results) => {
              const { lat, lng } = getLatLng(results[0]);

              setLat(lat);
              setLng(lng);
            });
          }}
        />
      </div>
      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerClassName="w-3/4"
        //mapContainerStyle={{ width: "800px", height: "800px" }}
        onLoad={() => console.log("Map component loaded")}
      >
        {/* This draws a marker over the map
          position prop specifies the lat + long of where to place ther marker
        */}
        <MarkerF
          position={mapCenter}
          onLoad={() => console.log("Marker loaded")}
          /* you can also change the icon of the marker 
          icon="https://picsum.photos/64"*/
        />
        {/* we can also draw circles around the map */}
        {/* {[1000, 2500].map((radius, idx) => {
          return (
            <CircleF
              key={idx}
              center={mapCenter}
              radius={radius}
              onLoad={() => console.log("Circle Load...")}
              options={{
                fillColor: radius > 1000 ? "red" : "green",
                strokeColor: radius > 1000 ? "red" : "green",
                strokeOpacity: 0.8,
              }}
            />
          );
        })} */}
      </GoogleMap>
    </main>
  );
}
