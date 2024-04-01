import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signin, signup } from "../../services/UserApi";

const initialState = {
  isLoading: false,
  data: {},
  isError: false,
  errorMessage: {},
};

export const registerUser = createAsyncThunk(
  "register",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await signup(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Sign up failed");
    }
  },
);
export const loginUser = createAsyncThunk(
  "login",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await signin(payload);
      return data;
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUserData: (state) => {
      state.data = {};
    },
    addUserData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.status = "error";
      state.isLoading = false;
    });
    //login
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
      state.errorMessage = {};
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      if (action.payload.message) {
        state.errorMessage = action.payload;
      } else {
        state.data = action.payload;
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.status = "error";
      state.isLoading = false;
    });
  },
});

export const { removeUserData, addUserData } = userSlice.actions;
export default userSlice.reducer;
