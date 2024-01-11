# Welcome

This is a simple repository used to follow the "Build Interactive Maps in Next.js using Google Maps API" tutorial

Link: https://www.99darshan.com/posts/interactive-maps-using-nextjs-and-google-maps

## Packages

- `@react-google-maps/api`: [Repo](https://github.com/JustFly1984/react-google-maps-api/)
- `use-places-autocomplete`: [Repo](https://github.com/wellyshen/use-places-autocomplete)

## Setup

1. Create an API key in the Google Cloud Console which allows the following APIs:

   - Geocoding API
   - Maps JavaScript API
   - Places API

2. Create a `.env.local` file with `NEXT_PUBLIC_GOOGLE_MAPS_KEY=` followed by your API key

## PlacesAutocomplete

When using `usePlacesAutocomplete`:

- `debounce`: specifies the numbers of milliseconds to delay before making a request to Google Maps Places API
- `cache`: specifies the number of seconds to cache the response data from the Google Maps Places API

## Todo:

Need to improve the accessibility of the google map autocomplete
