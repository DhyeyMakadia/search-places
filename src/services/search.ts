import axios from "axios";

export const GetCities = (cityName: string) => {
  return axios.get(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&namePrefix=${cityName}`,
    {
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      },
    }
  );
};
