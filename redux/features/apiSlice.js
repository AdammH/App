import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { event_photo_gallery } from '../../constants/DUMMY/DUMMY_PHOTO';

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://tp-dev.hostbeat.info/api/events/' }),
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: () => '',
    }),
  }),
});
export const groupsApi = createApi({
  reducerPath: 'groupsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://tp-dev.hostbeat.info/api/groups/' }),
  endpoints: (builder) => ({
    getAllGroups: builder.query({
      query: () => '',
    }),
  }),
});

export const eventPhotoApi = createApi({
  reducerPath: 'eventPhotoApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getAllEventPhotos: builder.query({
      queryFn: async ({ limit }) => {
        try {
          return { data: event_photo_gallery.slice(0, limit) };
        } catch (error) {
          return { error };
        }
      },
      serializeQueryArgs: ({ queryArgs }) => {
        const newQueryArgs = { ...queryArgs };
        if (newQueryArgs.limit) {
          delete newQueryArgs.limit;
        }
        return newQueryArgs;
      },
      merge: (currentCache, newItems) => {
        if (currentCache.results) {
          return {
            ...currentCache,
            ...newItems,
            results: [...currentCache.results, ...newItems.results],
          };
        }
        return newItems;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

const chunkArray = (arr, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
};

export const eventPhotoGalleryApi = createApi({
  reducerPath: 'eventPhotoGalleryApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getAllEventPhotosGallery: builder.query({
      queryFn: async ({ limit }) => {
        try {
          const data = chunkArray(event_photo_gallery, 8);
          return { data: data.slice(0, limit) };
        } catch (error) {
          return { error };
        }
      },
      serializeQueryArgs: ({ queryArgs }) => {
        const newQueryArgs = { ...queryArgs };
        if (newQueryArgs.limit) {
          delete newQueryArgs.limit;
        }
        return newQueryArgs;
      },
      merge: (currentCache, newItems) => {
        if (currentCache.results) {
          return {
            ...currentCache,
            ...newItems,
            results: [...currentCache.results, ...newItems.results],
          };
        }
        return newItems;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetAllEventsQuery } = eventsApi;
export const { useGetAllGroupsQuery } = groupsApi;
export const { useGetAllEventPhotosQuery } = eventPhotoApi;
export const { useGetAllEventPhotosGalleryQuery } = eventPhotoGalleryApi;
/* export const { useGetPhotosQuery } = eventPhotoGalleryApi */
