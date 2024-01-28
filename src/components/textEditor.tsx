import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Quill from 'quill'

import { ImageActions } from '@xeger/quill-image-actions'

import { ImageFormats } from '@xeger/quill-image-formats'
import React, { useRef, useState } from 'react'
import Button from './common/button'
Quill.register('modules/imageActions', ImageActions)
Quill.register('modules/imageFormats', ImageFormats)

const formats = [
  'font',
  'header',
  'bold',
  'height',
  'width',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'ordered',
  'indent',
  'link',
  'align',
  'image',
  'color',
  'background',
  'size',
  'code-block',
  'link',
  'blockquote',
  'h1',
]
const TextEditor = () => {
  const [values, setValues] = useState('')
  const quillRef = useRef(null)
  const submitHandler = () => {
    console.log(values)
  }
  const ImageHandler = () => {
    console.log('nothu')
  }
  const modules = React.useMemo(
    () => ({
      imageActions: {},
      imageFormats: {},
      toolbar: {
        handlers: {
          image: ImageHandler,
        },
        container: [
          [{ header: [1, 2, 3, false] }],
          [{ header: 1 }, { header: 2 }],
          ['bold', 'underline', 'strike'], // 굵기, 기울기, 밑줄 등 부가 tool 설정
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ], // 리스트, 인덴트 설정
          [{ align: [] }, { color: [] }, { background: [] }], // 정렬, 글자 색, 글자 배경색 설정
          ['blockquote', 'link', 'code-block', 'image'],
          ['clean'], // toolbar 설정 초기화 설정
        ],
        ImageResize: {
          modules: ['Resize'],
        },
      },
    }),
    []
  )

  return (
    <div id='write_sec'>
      <ReactQuill
        ref={quillRef}
        modules={modules}
        onChange={setValues}
        theme='snow'
        formats={formats}
      />
      {/* <button onClick={submitHandler}>출력</button> */}
      <Button onClick={submitHandler}>출력</Button>
    </div>
  )
}

export default TextEditor
