import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  addRestPlace,
  deleteRestPlace,
  editRestPlace,
  getRestPlace,
} from "../../services/Restplace";

//get Places
export const fetchRestPlace = createAsyncThunk(
  "fetchRestplace",
  async (payload, { rejectWithValue }) => {
    const data = await getRestPlace();
    return data;
  }
);
//delete Place
export const removeRestPlace = createAsyncThunk(
  "deleteRestplace",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await deleteRestPlace(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || "failed to delete data");
    }
  }
);
//Add attraction
export const addNewRestPlace = createAsyncThunk(
  "addNewRestplace",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await addRestPlace(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "failed to add data");
    }
  }
);
//updatePlace
export const updateRestPlace = createAsyncThunk(
  "updateRestplace",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await editRestPlace(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Cannot update data, something went wrong"
      );
    }
  }
);

const initialState = {
  isLoading: false,
  status: "",
  data: [],
  singleData: {},
  isError: false,
  searchData: [],
};

const restplaceSlice = createSlice({
  name: "restplace",
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    //addplaces
    builder.addCase(fetchRestPlace.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRestPlace.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchRestPlace.rejected, (state, action) => {
      state.isLoading = false;
      console.log("Error", action.payload);
      state.isError = true;
    });
    //removeplaces
    builder.addCase(removeRestPlace.pending, (state, action) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(removeRestPlace.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = "fulfilled";
      state.isError = false;

      const id = action.payload.data._id;
      if (id) {
        state.data = state.data.filter((ele) => ele._id !== id);
      }
    });
    builder.addCase(removeRestPlace.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.status = "error";
      state.isError = true;
      state.isLoading = false;
    });
    ///Add attraction
    builder.addCase(addNewRestPlace.pending, (state, action) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(addNewRestPlace.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.status = "success";
    });
    builder.addCase(addNewRestPlace.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.status = "error";
      state.isLoading = false;
    });
    //Update places
    builder.addCase(updateRestPlace.pending, (state, action) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(updateRestPlace.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = state.data.map((ele) =>
        ele._id === action.payload.data._id ? { ...action.payload.data } : ele
      );
      state.status = "success";
    });
    builder.addCase(updateRestPlace.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.status = "error";
      state.isLoading = false;
    });
  },
});

export const { clearStatus } = restplaceSlice.actions;
export default restplaceSlice.reducer;
