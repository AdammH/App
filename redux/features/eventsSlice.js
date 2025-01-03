import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEvents = createAsyncThunk('events', async () => {
  const response = await axios.get('https://tp-dev.hostbeat.info/api/events/');
  return response.data;
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    upcoming: [],
    history: [],
    loading: 'idle',
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state, action) => {
      state.loading = 'loading';
    });
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      const currentDate2 = new Date('2022-11-17');
      state.events = action.payload;
      state.upcoming = action.payload.map((event) => {
        if (new Date(event.date_start) >= currentDate2) {
          return event;
        }
      });
      state.history = action.payload.map((event) => {
        if (new Date(event.date_start) <= currentDate2) {
          return event;
        }
      })
      state.loading = 'succeeded';
    });
  },
});

export default eventsSlice.reducer;
