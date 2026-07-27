import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStoredSession, SESSION_STORAGE_KEY } from "../api/localAuth";
import { setSession } from "../store/authSlice";

export function useAuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSession(getStoredSession()));

    // Keeps multiple tabs in sync — signing out in one tab signs you out
    // in others too, since they all share the same localStorage session.
    function handleStorageChange(event) {
      if (event.key === SESSION_STORAGE_KEY) {
        dispatch(setSession(getStoredSession()));
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);
}
