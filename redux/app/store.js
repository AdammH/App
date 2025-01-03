import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { eventsApi } from '../features/apiSlice';
import { groupsApi } from '../features/apiSlice';
import { eventPhotoApi } from '../features/apiSlice';
import { eventPhotoGalleryApi } from '../features/apiSlice';

export const store = configureStore({
  reducer: {
    [eventsApi.reducerPath]: eventsApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [eventPhotoApi.reducerPath]: eventPhotoApi.reducer,
    [eventPhotoGalleryApi.reducerPath]: eventPhotoGalleryApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(eventsApi.middleware, groupsApi.middleware, eventPhotoApi.middleware, eventPhotoGalleryApi.middleware ),
});

setupListeners(store.dispatch);

/*  
 events: eventsReducer,
 groups: groupsReducer,

getDefaultMiddleware({
    immutableCheck: {
      ignoredPaths: ['events._h', 'events._i', 'events._j', 'events._k', 'events.events', 'events.upcoming', 'events.history'],
    },
    serializableCheck: false
  }).concat(eventsApi.middleware),
}) */
