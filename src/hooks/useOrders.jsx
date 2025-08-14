import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useApi } from "./useApi";
import { ordersReceived } from "../redux/ordersSlice";

const STALE_TIME = import.meta.env.VITE_STALE_TIME_SEC * 1000;

export const useOrders = (params = { limit: 50 }) => {
  const { getOrders } = useApi();
  const dispatch = useDispatch();

  const {
    items,
    loading,
    error,
    lastFetched = 0,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    const isStale = Date.now() - lastFetched > STALE_TIME;

    if (!loading && (!items.length || isStale)) {
      getOrders(params).then((res) => res && dispatch(ordersReceived(res)));
    }
  }, [loading, items.length, lastFetched, dispatch]);

  return { orders: items, loadingOrders: loading, error };
};
