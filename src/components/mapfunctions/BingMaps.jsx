import axios from "axios";

const BING_MAPS_API_KEY =
  "ApYJA9wirw_71Ky9Op1pVgSjw70J-frOoiEtOMfYsxsWVvsouz_X6BlYfqXMddSb";

export const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://dev.virtualearth.net/REST/v1/Locations?q=${address}&key=${BING_MAPS_API_KEY}`
    );

    const location =
      response.data.resourceSets[0].resources[0].point.coordinates;
    const userAddress = response.data.resourceSets[0].resources[0].name;
    return { lat: location[0], lng: location[1], userAddress };
  } catch (error) {
    console.error("Error geocoding address:", error);
    throw error;
  }
};
