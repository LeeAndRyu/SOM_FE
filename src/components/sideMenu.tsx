const SideMenu = () => {
  return (
    <div id='sideMenuWrapper'>
      <ul className='menu bg-base-200 w-56 rounded-box'>
        <li>
          <details open>
            <summary>MY</summary>
            <ul>
              <li>
                <a>내 블로그</a>
              </li>
              <li>
                <a>글쓰기</a>
              </li>
              <li>
                <details open>
                  <summary>MYPAGE</summary>
                  <ul>
                    <li>
                      <a>내 정보수정</a>
                    </li>
                    <li>
                      <a>알림 내역</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <a href='/login'>로그아웃</a>
        </li>
      </ul>
    </div>
  )
}

export default SideMenu
