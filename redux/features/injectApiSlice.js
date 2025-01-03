import { eventPhotoGalleryApi } from "./apiSlice";
import { event_photo_gallery } from "../../constants/DUMMY/DUMMY_PHOTO";

const extendedApiSlice = eventPhotoGalleryApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getSlicedPhotos: builder.query({
      queryFn:( {limit}) => {
        try {
          const data = chunkArray(event_photo_gallery, 8);
          return { data: data.slice(limit-2, limit) };
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
            results: [...currentCache.results, ...newItems.results]
          };
        }
        return newItems;
      }
    }),
  }),
  overrideExisting: false,
})

export const { useGetSlicedPhotos } = extendedApiSlice