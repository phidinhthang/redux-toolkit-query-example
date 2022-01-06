import React, { FunctionComponent } from "react";
import { useGetPhotoByIdQuery } from "./api";

interface Props {
  photoId: number;
}

export const PhotoCard: FunctionComponent<Props> = ({ photoId }) => {
  const { data, isLoading, isError } = useGetPhotoByIdQuery(photoId);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError || !data) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <p>{data.title}</p>
      <img src={data.url} alt={data.title} />
    </div>
  );
};
