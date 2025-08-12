import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useApi } from "./useApi";
import { categoriesReceived } from "../redux/categorySlice";

const STALE_TIME = import.meta.env.VITE_STALE_TIME_SEC * 1000;

export const useCategories = () => {
  const { getCategories } = useApi();
  const dispatch = useDispatch();

  const {
    items,
    loading,
    error,
    lastFetched = 0,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    const isStale = Date.now() - lastFetched > STALE_TIME;

    if (!loading && (!items.length || isStale)) {
      getCategories({ limit: 50 }).then(
        (res) => res && dispatch(categoriesReceived(res))
      );
    }
  }, [loading, items.length, lastFetched, dispatch]);

  return { categories: items, loadingCategories: loading, error };
};
