import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signUpWithEmail,
  signInWithEmail,
  signOutUser,
} from "../api/supabaseAuth";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await signUpWithEmail(email, password);

      // If email confirmation is off in the Supabase project, signUp
      // logs the user in immediately. We sign back out right away so the
      // flow is always: create account -> sign in manually with the same
      // credentials, rather than being silently auto-logged-in.
      if (data.session) {
        await signOutUser();
      }

      return { user: data.user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await signInWithEmail(email, password);
      return { user: data.user, session: data.session };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  await signOutUser();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    // "loading" while we check for an existing session on app boot,
    // then "authenticated" or "unauthenticated" once known.
    status: "loading",
    isSubmitting: false,
    error: null,
  },
  reducers: {
    setSession(state, action) {
      const session = action.payload;
      state.user = session?.user ?? null;
      state.status = session?.user ? "authenticated" : "unauthenticated";
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isSubmitting = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.user = action.payload.user;
        state.status = "authenticated";
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.status = "unauthenticated";
      });
  },
});

export const { setSession, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
