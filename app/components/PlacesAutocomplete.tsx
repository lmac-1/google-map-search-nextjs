import { useId } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

export const PlacesAutocomplete = ({
  onAddressSelect,
}: {
  onAddressSelect?: (address: string) => void;
}) => {
  const autocompleteResultsId = useId();
  const {
    ready,
    value,
    suggestions: { status, data }, // results from Google Places API for the given search term
    setValue, // use this method to link input value with the autocomplete hook
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: "gr" } }, // restricting search by country, in this case greece
    debounce: 300, // milliseconds of delay before making a request to Google Maps Places API
    cache: 86400, // seconds to cache the response data from Google Maps Places API
  });

  /* renders a list of li elements from our suggestiosn from Google Maps Places API */
  const renderSuggestions = () => {
    return data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
        description,
      } = suggestion;
      return (
        <li
          key={place_id}
          onClick={() => {
            setValue(description, false);
            clearSuggestions();
            onAddressSelect && onAddressSelect(description);
          }}
          className="focus:bg-orange-300 py-1 px-2 hover:bg-gray-300 border-b border-gray-500"
          role="option"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  };
  return (
    <div className="p-3">
      <input
        value={value}
        className="w-full h-full py-3 px-4 border-gray-400 border rounded-md focus:ring-3 outline-none focus:ring focus:ring-blue-300"
        disabled={!ready}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search address..."
        role="combobox"
        aria-controls={autocompleteResultsId}
      />
      {/* status = ok means that we have received suggestions */}
      {status === "OK" && (
        <ul
          id={autocompleteResultsId}
          className="focus:bg-yellow-100"
          role="listbox"
          aria-label="Suggestions"
        >
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
};
