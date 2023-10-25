import React, {useState, useCallback, useEffect} from "react"
import {useDropzone} from 'react-dropzone';

export default function FileInput(props) {

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        props.onDrop(acceptedFiles,reader);
      }
      reader.readAsText(file)
    })
    
  }, []) 


  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop});

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container flex flex-col gap-4 w-full h-full bg-[#fefefe] p-4 rouded-4  ">
      <div {...getRootProps({className: 'dropzone bg-[#FAFAFA] p-12 text-xl text-[#727272] border border-dashed '})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4 className="text-xl font-bold" >Files</h4>
        <ul className="text-lg font-medium">{files}</ul>
      </aside>
    </section>
  );
}

