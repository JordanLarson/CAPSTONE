let apiUrl;

const apiUrls = {
  production: "https://wave-forecast-app.herokuapp.com/api",
  development: "http://localhost:3001/api",
};

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

export default apiUrl;
