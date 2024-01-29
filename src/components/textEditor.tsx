import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Quill from 'quill'
import { ImageActions } from '@xeger/quill-image-actions'
import { ImageFormats } from '@xeger/quill-image-formats'
import React, { useEffect, useRef, useState } from 'react'
import Button from './common/button'
import { axiosInstance } from '../lib/axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Modal from './common/modal'
Quill.register('modules/imageActions', ImageActions)
Quill.register('modules/imageFormats', ImageFormats)
type Formvalues = {
  content: string
  introduction: string
  tags: string[]
  thumbnail: string
  title: string
}
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
  'h2',
]
const TextEditor = () => {
  const {
    register,

    handleSubmit,
  } = useForm<Formvalues>({
    mode: 'all',
  })
  const [content, setContent] = useState('')
  // const [title, setTitle] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  /*   const [thumbnail, setThumb] = useState('')
  const [intro, setIntro] = useState('')
  const [showStep2, setShotStep2] = useState(false) */
  const quillRef = useRef<any>(null)
  const submitHandler = () => {
    console.log(content)
  }
  useEffect(() => {
    console.log(tags)
  }, [tags])
  const ImageHandler = () => {
    console.log('nothu')
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click() // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
    input.addEventListener('change', async () => {
      if (!input.files) return
      const file = input.files[0]
      const formData = new FormData()
      formData.append('image', file)
      try {
        const result = await axiosInstance.post('/api/s3/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            credentials: 'include',
          },
        })
        const IMG_URL = result.data
        if (!quillRef.current) return
        const editor = quillRef.current.getEditor()
        const range = editor.getSelection()
        editor.insertEmbed(range.index, 'image', IMG_URL)
      } catch (error) {
        console.log(error)
      }
    })
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
          ['bold', 'underline', 'strike'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          [{ align: [] }, { color: [] }, { background: [] }],
          ['blockquote', 'link', 'code-block', 'image'],
          ['clean'],
        ],
        ImageResize: {
          modules: ['Resize'],
        },
      },
    }),
    []
  )
  const deleteTag = (e: any) => {
    console.log(e.target.innerHTML)
    const newTags = tags.filter((tag) => tag !== e.target.innerHTML)
    setTags(newTags)
  }
  const handleOnKeyPress = (e: any) => {
    if (e.code === 'Enter') {
      !tags.includes(e.target.value) &&
        tagInput !== '' &&
        setTags([...tags, tagInput])
      setTagInput('')
    }
  }
  const getThumbnail = () => {}
  //게시글 최종 POST submit
  const onSubmitHandler: SubmitHandler<Formvalues> = async (e: any) => {
    try {
      const res = await axiosInstance.post(`/member/edit-password`, {
        content,
        introduction: e.introduction,
        tags,
        thumbnail: e.thumbnail,
        title: e.title,
      })
      if (res.status === 200) {
        toast.success('게시글 작성 성공')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div id='write_sec'>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          type='text'
          placeholder='제목을 입력하세요'
          {...register('title', {
            required: '필수 입력 항목입니다',
          })}
          className={`input titleInput`}
          required
        />
        <div className='tag_sec'>
          <input
            type='text'
            placeholder='태그 입력'
            className={`input tagInput`}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyUp={handleOnKeyPress}
          />
          <ul>
            {tags.map((tag, idx) => (
              <li
                onClick={deleteTag}
                className='bg-primary text-primary-content'
                key={tag + idx}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <ReactQuill
          ref={quillRef}
          modules={modules}
          onChange={setContent}
          theme='snow'
          formats={formats}
        />

        <Modal btnMessage='제출'>
          <input
            type='file'
            name='profileImage'
            id='profileImage'
            onChange={getThumbnail}
            className='file-input file-input-bordered w-full max-w-xs'
          />
          <input
            type='text'
            placeholder='소개글'
            {...register('introduction', {
              required: '필수 입력 항목입니다',
            })}
          />
        </Modal>
      </form>

      <Button onClick={submitHandler}>출력</Button>
    </div>
  )
}

export default TextEditor
