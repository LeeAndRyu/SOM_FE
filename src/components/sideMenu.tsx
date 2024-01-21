import { Link } from 'react-router-dom'
const SideMenu = () => {
  return (
    <div id='sideMenuWrapper'>
      <ul className='menu bg-base-200 w-56 rounded-box'>
        <li>
          <details open>
            <summary>☁️</summary>
            <ul>
              <li>
                <Link to={'/'}>홈</Link>
              </li>
              <li>
                <Link to={'/'}>내 블로그</Link>
              </li>
              <li>
                <Link to={'/write'}>글쓰기</Link>
              </li>
              <li>
                <details open>
                  <summary>마이페이지</summary>
                  <ul>
                    <li>
                      <Link to={'/'}>내 정보수정</Link>
                    </li>
                    <li>
                      <Link to={'/'}>알림 내역</Link>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <Link to={'/login'}>로그아웃</Link>
        </li>
      </ul>
    </div>
  )
}

export default SideMenu
