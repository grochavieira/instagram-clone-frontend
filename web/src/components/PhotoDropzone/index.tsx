import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiCamera } from "react-icons/fi";

import "./styles.scss";

interface ImageDropzoneProps {
  onFileUploaded: (file: File) => void;
  error: boolean;
  info: string;
}

const PhotoDropzone: React.FC<ImageDropzoneProps> = ({
  onFileUploaded,
  info,
  error,
}) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(file);
      onFileUploaded(file);
      setSelectedFileUrl(fileUrl);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*, video/*",
  });

  return (
    <div
      className={error ? "dropzone photo-error" : "dropzone"}
      {...getRootProps()}
    >
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Post" />
      ) : (
        <p>
          <FiCamera />
          {info}
        </p>
      )}
    </div>
  );
};

export default PhotoDropzone;
