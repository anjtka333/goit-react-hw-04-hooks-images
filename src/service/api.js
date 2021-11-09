import axios from "axios";
require("dotenv").config();

const API_KEY = process.env.REACT_APP_API_KEY;

// axios.defaults.baseURL = "https://newsapi.org/v2/"; api key d335026227984500a8905e832ae515ac
axios.defaults.baseURL = "https://pixabay.com/api/";

const setParams = (params) =>
  (axios.defaults.params = { key: API_KEY, ...params });

export const getPictures = (query, page) => {
  setParams({
    q: query,
    per_page: 12,
    page,
  });

  return (
    axios
      // .get(`everything`)
      .get()
      .then(({ data }) => {
        const images = data.hits.map((item) => {
          return {
            title: item.id,
            url: item.webformatURL,
            largeImageURL: item.largeImageURL,
          };
        });
        return images;
      })
      .catch((err) => {
        throw err;
      })
  );
};
