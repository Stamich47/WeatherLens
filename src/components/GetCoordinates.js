export const getCoordinatesFromZipcode = async (zipcode) => {
  const API = process.env.REACT_APP_OPENCAGE_API_KEY;
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${zipcode}&countrycode=ca,us&key=${API}`
  );
  const data = await response.json();

  console.log(data.results[0].annotations.timezone.name);

  if (data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry;
    const city = data.results[0].components._normalized_city;
    const timezone = data.results[0].annotations.timezone.name;

    return { latitude: lat, longitude: lng, city: city, timezone: timezone };
  } else {
    throw new Error("Invalid zipcode");
  }
};
