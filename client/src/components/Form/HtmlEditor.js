import React from 'react'
import { Input } from 'components/Styled/Input'
import { FormLabel } from 'components/Styled/Form'
import ReactQuill from 'react-quill';

const modules = {
    toolbar: [
      ['fontfamily', { 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

export default (props) => {
  return (
    <div>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <ReactQuill
        value={props.input.value}
        onChange={props.input.onChange}
        {...props}
        modules={modules}
        formats={formats}
      />
    </div>
  )
}
