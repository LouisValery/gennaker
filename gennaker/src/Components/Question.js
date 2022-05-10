import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';

function Question (props) {
    const [content, setContent] = useState("");

    fetch(props.filePath, {
        // This is needed for local access sadly
        headers : { 
          'Content-Type': 'text',
          'Accept': 'text'
         }
      })
        .then((res) => res.text())
        .then((text) => setContent(text));

    return (
    <ReactMarkdown children={content} transformImageUri={uri =>
        `${process.env.PUBLIC_URL}/${transformImageURI(uri, props.filePath)}`} />
    )
}

export function transformImageURI(uri, filePath) {
    let strippedPath = filePath.substr(0, filePath.lastIndexOf("/")+1);
    return strippedPath + uri;
}

export {Question}