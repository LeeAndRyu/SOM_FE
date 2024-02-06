import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Quill from 'quill'
import { ImageActions } from '@xeger/quill-image-actions'
import { ImageFormats } from '@xeger/quill-image-formats'
import React, { useEffect, useRef, useState } from 'react'
import Image from '../assets/addImg.jpg'
import { axiosInstance } from '../lib/axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Modal from './common/modal'
import { useNavigate } from 'react-router-dom'
import TextareaAutosize from 'react-textarea-autosize'
import WarningMsg from './common/warningMsg'
import clsx from 'clsx'
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
    postId?: number
    content?: string
    introduction?: string
    tags?: string[]
    thumbnail?: string
    title?: string
    totalImageList?: string[]
  }
}
const TextEditor = ({ postItem }: EditProp) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<Formvalues>({
    mode: 'all',
    defaultValues: {
      title: (postItem && postItem.title) || '',
      introduction: (postItem && postItem.introduction) || '',
    },
  })
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [thumbnail, setThumb] = useState('')
  const [totalImageList, setTotalImageList] = useState<string[]>([])
  const quillRef = useRef<any>(null)
  const titleInputRef = useRef<HTMLTextAreaElement | null>(null)
  const { ref } = register('title')
  useEffect(() => {
    if (!postItem) return
    if (titleInputRef.current !== null) {
      titleInputRef.current.selectionStart = titleInputRef.current.value.length
      titleInputRef.current.focus()
    }
    postItem.content && setContent(postItem.content)
    postItem.tags && setTags(postItem.tags)
    postItem.thumbnail && setThumb(postItem.thumbnail)
    postItem.totalImageList && setTotalImageList(totalImageList)
    postItem.title && setValue('title', postItem.title)
    postItem.introduction && setValue('introduction', postItem.introduction)
  }, [postItem])

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
        const res = await axiosInstance.post('/api/s3/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            credentials: 'include',
          },
        })
        if (res.status === 200) {
          if (!quillRef.current) return
          setTotalImageList((prev) => {
            return [...prev, res.data]
          })
          const IMG_URL = res.data
          const editor = quillRef.current.getEditor()
          const range = editor.getSelection()
          editor.insertEmbed(range.index, 'image', IMG_URL)
        }
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

  //게시글 최종 POST or PUT submit
  const onSubmitHandler: SubmitHandler<Formvalues> = async (e: any) => {
    if (e.title === '' || e.title.length > 70 || !e.introduction) return
    try {
      const res = postItem
        ? await axiosInstance.put(`/post/${postItem.postId}`, {
            content,
            introduction: e.introduction,
            tags,
            thumbnail,
            title: e.title,
            totalImageList,
          })
        : await axiosInstance.post(`/post`, {
            content,
            introduction: e.introduction,
            tags,
            thumbnail,
            title: e.title,
            totalImageList,
          })

      if (res.status === 200) {
        toast.success(postItem ? '게시글 수정 성공' : '게시글 작성 성공')
        navigate(`/blog/${res.data.accountName}/${res.data.postId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div id='write_sec'>
      <TextareaAutosize
        placeholder='제목을 입력하세요'
        {...register('title', {
          validate: {
            value: (value) => {
              return (
                value?.length < 100 ||
                '제목은 공백 포함 70자 내외 (±20) 로 입력해주세요'
              )
            },
          },
        })}
        className={clsx(`input titleInput`, !!errors.title && 'text-error')}
        // defaultValue={postItem && postItem.title ? postItem.title : ''}
        ref={(e) => {
          ref(e)
          titleInputRef.current = e
        }}
      ></TextareaAutosize>
      {errors.title && errors.title.message && (
        <WarningMsg message={errors.title.message} />
      )}
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
          value={content}
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
                className={clsx(
                  'textarea textarea-bordered w-full',
                  !!errors.introduction && 'textarea-error'
                )}
                required
                placeholder='간략한 소개글을 작성해보세요 (200자 내외)'
                /*                 defaultValue={
                  postItem && postItem.introduction ? postItem.introduction : ''
                } */
                {...register('introduction', {
                  required: '소개글은 필수 입력 항목입니다',
                  validate: {
                    value: (value) => {
                      return (
                        value.length < 200 ||
                        '소개글은 공백 포함 200자 내외 (±20) 로 입력해주세요'
                      )
                    },
                  },
                })}
              ></textarea>
              {errors.introduction && errors.introduction.message && (
                <WarningMsg message={errors.introduction.message} />
              )}
            </div>
            <button
              type='submit'
              disabled={!isValid}
              className={'btn btn-primary'}
            >
              업로드하기
            </button>
          </div>
        </Modal>
      </form>
    </div>
  )
}

export default TextEditor
