import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { useUpdatePhotoMutation } from "./api";

interface Props {
  photoId: number;
}

export const PhotoTitleInput: FunctionComponent<Props> = ({ photoId }) => {
  const [newTitle, setNewTitle] = useState("");
  const [updatePhoto] = useUpdatePhotoMutation();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleSubmit = () => {
    updatePhoto({
      id: photoId,
      data: {
        title: newTitle
      }
    }).then(() => {
      console.log("updated");
    });
  };

  return (
    <div>
      <input name="title" onChange={handleInputChange} />
      <button type="button" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};
