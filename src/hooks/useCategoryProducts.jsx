import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useApi } from "./useApi";

const STALE_TIME = 5 * 60 * 1000;

export const useCategoryProducts = ({ category } = {}) => {
  const { getProducts } = useApi();

  const {
    items,
    loading,
    error,
    lastFetched = 0,
  } = useSelector((state) => state.products);

  const isStale = Date.now() - lastFetched > STALE_TIME;

  useEffect(() => {
    if (!items.length || isStale) {
      getProducts({ limit: 50 });
    }
  }, []);

  const filtered = items.filter((item) =>
    category ? item.category.name === category : true
  );

  return { products: filtered, loading, error };
};
