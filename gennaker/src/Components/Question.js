import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';

const CORRECTION_MARKER="# Correction"

function Question (props) {
    const [content, setContent] = useState("");
    const [question, setQuestion] = useState("");
    const [correction, setCorrection] = useState("");

    useEffect(() => {fetch(props.filePath, {
        // This is needed for local access sadly
        headers : { 
          'Content-Type': 'text',
          'Accept': 'text'
        }
        })
        .then((res) => res.text())
        .then((text) => {
                setContent(text); 
                const [question, correction] = text.split(CORRECTION_MARKER)
                
                setQuestion(question)
                if(text.indexOf(CORRECTION_MARKER)>=0) {
                    setCorrection(CORRECTION_MARKER+correction)
                } else {
                    setCorrection('');
                }
            });
        }, [props.filePath]);
    
    return (
        <div>
            <ReactMarkdown 
                children={question} 
                transformImageUri={uri =>
                    `${process.env.PUBLIC_URL}/${transformImageURI(uri, props.filePath)}`} 
                components={{h1: ({node, ...props}) => <h6 {...props} />}}
            />
            { props.displayCorrection ? 
            <ReactMarkdown 
                children={correction} 
                transformImageUri={uri =>
                    `${process.env.PUBLIC_URL}/${transformImageURI(uri, props.filePath)}`} 
                components={{h1: ({node, ...props}) => <h6 class="text-primary" {...props} />}}
            /> : null
            }
        </div>
    )
}

export function transformImageURI(uri, filePath) {
    let strippedPath = filePath.substr(0, filePath.lastIndexOf("/")+1);
    return strippedPath + uri;
}

export {Question}