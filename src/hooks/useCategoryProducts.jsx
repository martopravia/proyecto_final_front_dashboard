import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useApi } from "./useApi";
import { productsReceived } from "../redux/productsSlice";

const STALE_TIME = import.meta.env.VITE_STALE_TIME_SEC * 1000;

export const useCategoryProducts = (
  { category, params } = { params: { limit: 250 } }
) => {
  const { getProducts } = useApi();
  const dispatch = useDispatch();

  const {
    items,
    loading,
    error,
    lastFetched = 0,
  } = useSelector((state) => state.products);

  useEffect(() => {
    const isStale = Date.now() - lastFetched > STALE_TIME;

    if (!loading && (!items.length || isStale)) {
      getProducts(params).then((res) => res && dispatch(productsReceived(res)));
    }
  }, [loading, items.length, lastFetched, dispatch]);

  const filtered = items.filter((item) =>
    category ? item.category.name === category : true
  );

  return { products: filtered, loadingProducts: loading, error };
};
