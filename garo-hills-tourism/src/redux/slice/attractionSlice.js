import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAttraction,
  deleteAttraction,
  editAttraction,
  getAttraction,
} from "../../services/AttractionAPI";

//get Places
export const fetchAttraction = createAsyncThunk(
  "fetchAttraction",
  async (payload, { rejectWithValue }) => {
    const data = await getAttraction();
    return data;
  }
);
//delete Place
export const removeAttraction = createAsyncThunk(
  "deleteAttraction",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await deleteAttraction(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || "failed to delete data");
    }
  }
);
//Add attraction
export const addNewAttraction = createAsyncThunk(
  "addNewPlace",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await addAttraction(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "failed to add data");
    }
  }
);
//updatePlace
export const updateAttraction = createAsyncThunk(
  "updatePlace",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await editAttraction(payload);
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

const attractionSlice = createSlice({
  name: "attraction",
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    //addplaces
    builder.addCase(fetchAttraction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAttraction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchAttraction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("Error", action.payload);
      state.isError = true;
    });
    //removeplaces
    builder.addCase(removeAttraction.pending, (state, action) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(removeAttraction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = "fulfilled";
      state.isError = false;

      const id = action.payload.data._id;
      if (id) {
        state.data = state.data.filter((ele) => ele._id !== id);
      }
    });
    builder.addCase(removeAttraction.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.status = "error";
      state.isError = true;
      state.isLoading = false;
    });
    ///Add attraction
    builder.addCase(addNewAttraction.pending, (state, action) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(addNewAttraction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.status = "success";
    });
    builder.addCase(addNewAttraction.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.status = "error";
      state.isLoading = false;
    });
    //Update places
    builder.addCase(updateAttraction.pending, (state, action) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(updateAttraction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = state.data.map((ele) =>
        ele._id === action.payload.data._id ? { ...action.payload.data } : ele
      );
      state.status = "success";
    });
    builder.addCase(updateAttraction.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.status = "error";
      state.isLoading = false;
    });
  },
});

export const { clearStatus } = attractionSlice.actions;

export default attractionSlice.reducer;
