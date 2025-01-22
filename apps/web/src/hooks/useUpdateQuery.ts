import { useNavigate } from "react-router-dom";
import queryString from "query-string";

export const useUpdateQueryParams = () => {
  const navigate = useNavigate();

  const updateQueryParams = (path: string, newParams: Record<string, unknown>) => {
    const currentSearch = queryString.parse(window.location.search);
    const updatedSearch = { ...currentSearch, ...newParams };
    const sanitizedSearch = Object.fromEntries(
      Object.entries(updatedSearch).map(([key, value]) => [
        key,
        typeof value === "string" ? value.replace(/^"|"$/g, "") : value, // Remove extra quotes
      ])
    );

    navigate({ pathname: path, search: queryString.stringify(sanitizedSearch) });
  };

  return updateQueryParams;
};
