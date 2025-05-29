import { useDropzone } from 'react-dropzone';
import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface FileUploader {
  children?: ReactNode;
  multiple?: boolean,
  presentationClass?: string,
  inputClass?: string,
  onChange: (value: any) => void
}

const FileUploader: React.FC<FileUploader> = ({ children, presentationClass = "border-dashed p-4", inputClass = "", multiple = false, onChange = () => { } }) => {


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
      <div {...getRootProps()} className={clsx("cursor-pointer", presentationClass)}>
        <input {...getInputProps()} accept=".png,.jpg,.jpeg" className={inputClass} />
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
