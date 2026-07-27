import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentSession, subscribeToAuthChanges } from "../api/supabaseAuth";
import { setSession } from "../store/authSlice";

export function useAuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentSession()
      .then((session) => dispatch(setSession(session)))
      .catch(() => dispatch(setSession(null)));

    const subscription = subscribeToAuthChanges((session) => {
      dispatch(setSession(session));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);
}
