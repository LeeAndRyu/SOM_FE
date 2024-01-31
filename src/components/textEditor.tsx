import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Quill from 'quill'
import { ImageActions } from '@xeger/quill-image-actions'
import { ImageFormats } from '@xeger/quill-image-formats'
import React, { useEffect, useRef, useState } from 'react'
import Button from './common/button'
import Image from '../assets/addImg.jpg'
import { axiosInstance } from '../lib/axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Modal from './common/modal'
import { useNavigate } from 'react-router-dom'
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
interface EditProp {
  postItem?: {
    content?: string
    introduction?: string
    tags?: string[]
    thumbnail?: string
    title?: string
  }
}
const TextEditor = ({ postItem }: EditProp) => {
  const { register, handleSubmit } = useForm<Formvalues>({
    mode: 'all',
  })
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [thumbnail, setThumb] = useState('')
  const quillRef = useRef<any>(null)
  useEffect(() => {
    if (!postItem) return
    postItem.content && setContent(postItem.content)
    postItem.tags && setTags(postItem.tags)
    postItem.thumbnail && setThumb(postItem.thumbnail)
  }, [])
  const ImageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
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
          [{ list: 'ordered' }, { list: 'bullet' }],
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
    e.preventDefault()
    if (e.code === 'Enter') {
      !tags.includes(e.target.value) &&
        tagInput !== '' &&
        setTags([...tags, tagInput])
      setTagInput('')
    }
  }
  const getThumbnail = async (e: any) => {
    if (!e.target.files) return
    const file = e.target.files[0]
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
      setThumb(IMG_URL)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    console.log(thumbnail)
  }, [thumbnail])

  //게시글 최종 POST submit
  const onSubmitHandler: SubmitHandler<Formvalues> = async (e: any) => {
    if (e.title === '' || !e.introduction) return
    try {
      const res = await axiosInstance.post(`/post`, {
        content,
        introduction: e.introduction,
        tags,
        thumbnail,
        title: e.title,
      })
      if (res.status === 200) {
        toast.success('게시글 작성 성공')
        navigate(`/blog/${res.data.accountName}/${res.data.postId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div id='write_sec'>
      <input
        type='text'
        placeholder='제목을 입력하세요'
        {...register('title', {
          required: '필수 입력 항목입니다',
        })}
        className={`input titleInput`}
        defaultValue={postItem && postItem.title ? postItem.title : ''}
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
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <ReactQuill
          ref={quillRef}
          modules={modules}
          onChange={(value) => setContent(value)}
          theme='snow'
          formats={formats}
        />

        <Modal btnMessage='작성 완료 📝'>
          <div id='postModal'>
            <h4>썸네일 및 소개글</h4>
            <div className='thumb_sec'>
              {thumbnail ? (
                <img src={thumbnail} />
              ) : (
                <div>
                  <img src={Image} alt='addImg' className='noimg' />
                </div>
              )}
              <input
                type='file'
                name='profileImage'
                id='profileImage'
                onChange={getThumbnail}
                className='file-input file-input-bordered file-input-secondary w-full'
              />
            </div>
            <div className='intro_sec'>
              <textarea
                className='textarea textarea-bordered w-full'
                required
                placeholder='간략한 소개글을 작성해보세요'
                defaultValue={
                  postItem && postItem.introduction ? postItem.introduction : ''
                }
                {...register('introduction', {
                  required: '필수 입력 항목입니다',
                })}
              ></textarea>
            </div>
            <Button type='submit' btnClass='primary'>
              업로드하기
            </Button>
          </div>
        </Modal>
      </form>
    </div>
  )
}

export default TextEditor
