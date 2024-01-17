import { styled } from 'styled-components';
const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 30px;
`;
const SideMenu = () => {
  return (
    <Wrapper>
      <ul className='menu bg-base-200 w-56 rounded-box'>
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <details open>
            <summary>Parent</summary>
            <ul>
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
              <li>
                <details open>
                  <summary>Parent</summary>
                  <ul>
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <a>Item 3</a>
        </li>
      </ul>
    </Wrapper>
  );
};

export default SideMenu;
