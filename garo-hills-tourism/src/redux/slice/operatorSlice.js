import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addOperator,
  deleteOperator,
  editOperator,
  getOperator,
} from "../../services/operatorAPI";

//get Places
export const fetchOperator = createAsyncThunk(
  "fetchOperator",
  async (payload, { rejectWithValue }) => {
    const data = await getOperator();
    return data;
  }
);
//delete Place
export const removeOperator = createAsyncThunk(
  "deleteOperator",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await deleteOperator(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || "failed to delete data");
    }
  }
);
//Add attraction
export const addNewOperator = createAsyncThunk(
  "addNewOperator",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await addOperator(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "failed to add data");
    }
  }
);
//updatePlace
export const updateOperator = createAsyncThunk(
  "updateOperator",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await editOperator(payload);
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

const operatorSlice = createSlice({
  name: "attraction",
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    //addplaces
    builder.addCase(fetchOperator.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOperator.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchOperator.rejected, (state, action) => {
      state.isLoading = false;
      console.log("Error", action.payload);
      state.isError = true;
    });
    //removeplaces
    builder.addCase(removeOperator.pending, (state, action) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(removeOperator.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = "fulfilled";
      state.isError = false;

      const id = action.payload.data._id;
      if (id) {
        state.data = state.data.filter((ele) => ele._id !== id);
      }
    });
    builder.addCase(removeOperator.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.status = "error";
      state.isError = true;
      state.isLoading = false;
    });
    ///Add attraction
    builder.addCase(addNewOperator.pending, (state, action) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(addNewOperator.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.status = "success";
    });
    builder.addCase(addNewOperator.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.status = "error";
      state.isLoading = false;
    });
    //Update places
    builder.addCase(updateOperator.pending, (state, action) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(updateOperator.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = state.data.map((ele) =>
        ele._id === action.payload.data._id ? { ...action.payload.data } : ele
      );
      state.status = "success";
    });
    builder.addCase(updateOperator.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.status = "error";
      state.isLoading = false;
    });
  },
});

export const { clearStatus } = operatorSlice.actions;
export default operatorSlice.reducer;
