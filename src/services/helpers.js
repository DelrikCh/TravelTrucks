export const get_filters = (vehicle) => {
  // (true/false)-based:
  // AC, TV, bathroom, gas, kitchen, microwave, radio, refrigerator, water

  // text-based:
  // engine: diesel, petrol, hybrid
  // transmission: automatic, manual

  // There are no icons for filters below, so we're skipping them
  // diesel, hybrid, manual

  // Key: value, icon
  // Key is the key in the vehicle object
  // Value is the expected value in the vehicle object by the key
  // Icon is the icon name to be used in the UI if the object's value matches the expected value
  const matcher = {
    transmission: { value: "automatic", icon: "automatic", text: "Automatic" },
    engine: { value: "petrol", icon: "petrol", text: "Petrol" },
    kitchen: { value: true, icon: "kitchen", text: "Kitchen" },
    AC: { value: true, icon: "ac", text: "AC" },
    TV: { value: true, icon: "tv", text: "TV" },
    bathroom: { value: true, icon: "bathroom", text: "Bathroom" },
    gas: { value: true, icon: "gas", text: "Gas" },
    microwave: { value: true, icon: "microwave", text: "Microwave" },
    radio: { value: true, icon: "radio", text: "Radio" },
    refrigerator: { value: true, icon: "refrigerator", text: "Refrigerator" },
    water: { value: true, icon: "water", text: "Water" },
  };
  let filters = [];
  for (const key in matcher) {
    const { value, icon, text } = matcher[key];
    if (vehicle[key] === value) {
      filters.push({ icon, text });
    }
  }
  return filters;
};

export const prettify_filter_data = (filter, data) => {
  filter = filter.toLowerCase();
  switch (filter) {
    case "form":
      switch (data) {
        case "alcove":
          return "Alcove";
        case "fullyIntegrated":
          return "Fully Integrated";
        case "panelTruck":
          return "Van";
        default:
          return data;
      }
    case "length":
    case "width":
    case "height":
      // substitute "m" for " m"
      return data.replace("m", " m");
    case "tank":
      return data.replace("l", " l");
    case "consumption":
    default:
      return data;
    }
}