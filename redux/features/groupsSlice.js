import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchGroups = createAsyncThunk("groups", async () => {
   const response = await axios.get("https://tp-dev.hostbeat.info/api/groups/");
    return response.data;
});

const groupsSlice = createSlice({
    name: "groups",
    initialState:{
        groups: [],
        loading: 'idle'
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGroups.pending, (state, action) => {
            state.loading = 'loading'
        });
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGroups.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.groups = action.payload
        });
    },
});

export default groupsSlice.reducer;
