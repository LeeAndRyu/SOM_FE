import { HiOutlineTemplate } from 'react-icons/hi'
import { useRecoilState } from 'recoil'
import { ThemeState } from '../store/app'
import { MouseEventHandler, useEffect } from 'react'
import { getLocalStorage, setLocalStorage } from '../lib/localStorage'
const ThemeToggle = () => {
  const [theme, setTheme] = useRecoilState(ThemeState)
  const onClickHandler: MouseEventHandler = (e) => {
    if ((e.target as HTMLElement).nodeName !== 'INPUT') return
    setTheme((e.target as HTMLInputElement).value)
    setLocalStorage('theme', (e.target as HTMLInputElement).value)
  }
  useEffect(() => {
    const THEME = JSON.parse(getLocalStorage('theme')!)
    if (THEME) {
      setTheme(THEME)
    }
  }, [])
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])
  return (
    <div className='dropdown dropdown-end'>
      <div tabIndex={0} role='button' className='btn m-1 p-3'>
        <HiOutlineTemplate />
        <svg
          width='12px'
          height='12px'
          className='h-2 w-2 fill-current opacity-60 inline-block'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 2048 2048'
        >
          <path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z'></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52'
        onClick={onClickHandler}
      >
        <li>
          <input
            type='radio'
            name='theme-dropdown'
            className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
            aria-label='Light'
            value='light'
          />
        </li>
        <li>
          <input
            type='radio'
            name='theme-dropdown'
            className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
            aria-label='Cupcake'
            value='cupcake'
          />
        </li>
        <li>
          <input
            type='radio'
            name='theme-dropdown'
            className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
            aria-label='Retro'
            value='retro'
          />
        </li>
        <li>
          <input
            type='radio'
            name='theme-dropdown'
            className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
            aria-label='Autumn'
            value='autumn'
          />
        </li>
        <li>
          <input
            type='radio'
            name='theme-dropdown'
            className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
            aria-label='Valentine'
            value='valentine'
          />
        </li>
        <li>
          <input
            type='radio'
            name='theme-dropdown'
            className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
            aria-label='Aqua'
            value='aqua'
          />
        </li>
      </ul>
    </div>
  )
}

export default ThemeToggle
