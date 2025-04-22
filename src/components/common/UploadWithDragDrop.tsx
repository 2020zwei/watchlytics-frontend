import { useDropzone } from 'react-dropzone';
import React, { ReactNode } from 'react';

interface FileUploader {
  children?: ReactNode;
  multiple?: boolean,
  onChange: (value: any) => void
}

const FileUploader: React.FC<FileUploader> = ({ children, multiple = false, onChange = () => { } }) => {


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: multiple,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onChange({ url: reader.result as string, file })
        };
        reader.readAsDataURL(file);
      }
    }
  });

  return (
    <div className="flex flex-col items-center">
      <div {...getRootProps()} className="border-dashed p-4 cursor-pointer">
        <input {...getInputProps()} />
        {isDragActive ? (
          children
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default FileUploader;
