import axios from "axios";

const instance = axios.create({
  baseURL: "https://medsos-backend66.herokuapp.com/",
  // "http://localhost:5000/",
});

instance.defaults.headers.common["Access-Control-Allow-Origin"] =
  "https://medsos-backend66.herokuapp.com/";
instance.defaults.headers.common["Access-Control-Allow-Headers"] =
  "Origin, X-Requested-With, Content-Type, Accept, Authorization";

export default instance;
