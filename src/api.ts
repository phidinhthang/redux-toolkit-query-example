import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Photo } from "./interface";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Photos"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com"
  }),
  endpoints: (builder) => ({
    getPhotos: builder.query<Photo[], void>({
      query: () => "photos",
      providesTags: [{ type: "Photos", id: "LIST" }]
    }),
    getPhotoById: builder.query<Photo, number>({
      query: (photoId: number) => `/photos/${photoId}`,
      providesTags: (result, error, id) => [{ type: "Photos", id }]
    }),
    updatePhoto: builder.mutation<Photo, { id: number; data: Partial<Photo> }>({
      query: ({ id, data }) => ({
        url: `photos/${id}`,
        method: "PATCH",
        body: data
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const getPhotoByIdPatch = dispatch(
          api.util.updateQueryData("getPhotoById", id, (currentPhotoValue) => {
            Object.assign(currentPhotoValue, data);
          })
        );

        const getAllPhotosPatch = dispatch(
          api.util.updateQueryData("getPhotos", undefined, (photosList) => {
            const photoIndex = photosList.findIndex((photo) => photo.id === id);
            if (photoIndex > -1) {
              const currentPhotoValue = photosList[photoIndex];
              Object.assign(photosList[photoIndex], {
                ...currentPhotoValue,
                ...data
              });
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          getPhotoByIdPatch.undo();
          getAllPhotosPatch.undo();
        }
      }
    })
  })
});

export const {
  useGetPhotosQuery,
  useGetPhotoByIdQuery,
  useUpdatePhotoMutation
} = api;
