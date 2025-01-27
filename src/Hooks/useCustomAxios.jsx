import axios from "axios";

const CustomAxios = axios.create({
  baseURL: "https://artifact-hub-server.vercel.app",
});
const useCustomAxios = () => {
  return CustomAxios;
};

export default useCustomAxios;
