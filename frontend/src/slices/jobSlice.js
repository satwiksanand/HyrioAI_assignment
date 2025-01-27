import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const createJob = createAsyncThunk(
  "jobs/create",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/jobs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const finalResponse = await response.json();
      console.log(finalResponse);
      if (!response.ok) {
        toast.error("jobs not created!");
        return rejectWithValue(
          finalResponse.message || "something wrong with the server!"
        );
      }
      toast.success("job created");
      navigate("/");
    } catch (err) {
      toast.error("something up with the server!");
      return rejectWithValue(err.message || "something wrong with the server!");
    }
  }
);
export const addCandidate = createAsyncThunk(
  "jobs/addCandidate",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/jobs/addCandidate",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );
      const finalResponse = await response.json();
      console.log(finalResponse);
      if (!response.ok) {
        toast.error("candidate could not be added");
        return rejectWithValue(
          finalResponse.message || "something wrong with the server!"
        );
      }
      toast.success("candidate added successfully");
    } catch (err) {
      toast.error("something up with the server!");
      return rejectWithValue(err.message || "something wrong with the server!");
    }
  }
);
export const sendUpdate = createAsyncThunk(
  "jobs/sendUpdate",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/jobs/sendUpdate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );
      const finalResponse = await response.json();
      console.log(finalResponse);
      if (!response.ok) {
        toast.error("mail could not be sent");
        return rejectWithValue(
          finalResponse.message || "something wrong with the server!"
        );
      }
      toast.success("mail sent successfully");
    } catch (err) {
      toast.error("something up with the server!");
      return rejectWithValue(err.message || "something wrong with the server!");
    }
  }
);

export const getAllJobs = createAsyncThunk(
  "jobs/getAllJobs",
  async (arg, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/jobs/getAllJobs",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const finalResponse = await response.json();
      if (!response.ok) {
        toast.error("jobs not created!");
        return rejectWithValue(
          finalResponse.message || "something wrong with the server!"
        );
      }
      return fulfillWithValue(finalResponse);
    } catch (err) {
      toast.error("something up with the server!");
      return rejectWithValue(err.message || "something wrong with the server!");
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    allJobs: [],
    loading: false,
    error: null, //for now we only care about allJobs
  },
  extraReducers: (builder) => {
    //create
    builder.addCase(createJob.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createJob.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createJob.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //getAllJobs
    builder.addCase(getAllJobs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllJobs.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.allJobs = action.payload;
    });
    builder.addCase(getAllJobs.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default jobSlice.reducer;
