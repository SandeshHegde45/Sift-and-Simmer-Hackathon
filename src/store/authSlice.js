import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "../api/localAuth";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await registerUser(email, password);
      return {};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const session = await loginUser(email, password);
      return { user: session };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  logoutUser();
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
      state.user = session ?? null;
      state.status = session ? "authenticated" : "unauthenticated";
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
