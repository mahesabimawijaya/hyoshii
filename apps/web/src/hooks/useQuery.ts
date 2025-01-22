import { useLocation } from "react-router-dom";

const useQueryStrings = () => {
  return new URLSearchParams(useLocation().search);
};

export default useQueryStrings;
