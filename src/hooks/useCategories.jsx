import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useApi } from "./useApi";

const STALE_TIME = import.meta.env.VITE_STALE_TIME_SEC * 1000;

export const useCategories = () => {
  const { getCategories } = useApi();

  const {
    items,
    loading,
    error,
    lastFetched = 0,
  } = useSelector((state) => state.categories);

  const isStale = Date.now() - lastFetched > STALE_TIME;

  useEffect(() => {
    if (!loading && (!items.length || isStale)) {
      getCategories({ limit: 50 });
    }
  }, [loading, isStale]);

  return { categories: items, loadingCategories: loading, error };
};
