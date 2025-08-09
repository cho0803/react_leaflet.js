  import { Marker, Popup, useMap, uuidv4, styled, } from "..";
  import { Box,Button, Menu, MenuItem } from "..";

  //전역 데이터 받아오기
  import { MapsContext, useContext } from "..";
 
export default function Header(){
    const { sidebarEl, asideEl, buttonEl,} = useContext(MapsContext)
    return (
        <header
          id="header"
          style={{
            // width: "64px",
            // height: "100vh",
            zIndex: 2,
            "::after": "width",
            border: "1px solid rgb(217, 217, 217)",
            backgroundColor: "rgb(255, 255, 255)",
          }}
        >
          <h1
            className="logo_box"
            // style={{ padding:'0', fontSize:"2em",borderBottom: "1px solid rgba(0, 0, 0, 0.15)" }}
            style={h1}
          >
            <a
              className="link_logo"
              href="https://www.naver.com"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span
                className="blind"
                style={{
                  display: "inline-block",
                  height: "1em",
                  // overflow: "hidden",
                  width: "2em",
                }}
              >
                산행 지도
              </span>
            </a>
          </h1>
          <nav style={{ width: "4em" }}>
            <ul
              className="list_navbar -fold"
              // style={{ width: "100%" }}
              style={ul}
            >
              {" "}
              <li className="sc-3l5nav iKvVhN" style={li}>
                <button
                  type="button"
                  className="btn_navbar"
                  style={{ ...button, width: "62px", textAlign: "center" }}
                  // style={{
                  //   // appearance: "none",
                  //   backgroundColor: "inherit",
                  //   border: "0px",
                  //   margin: "0px",
                  // }}
                >
                  <span className="sc-1fdfve0 evoerN icon">
                    <span className="icon_inner" aria-hidden="true">
                      <svg
                        viewBox="0 0 62 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M31 1c-4.418 0-8 3.416-8 7.63 0 1.455.41 2.81 1.152 3.967l6.662 9.31c.09.124.283.124.372 0l6.662-9.31A7.303 7.303 0 0 0 39 8.63C39 4.416 35.418 1 31 1"></path>
                        <path
                          fill="#FFF"
                          d="M32.146 6v3.105L29.888 6H27.5v6h2.355V8.894L32.114 12H34.5V6z"
                        ></path>
                      </svg>
                    </span>
                  </span>
                  <span className="navbar_text">지도 홈</span>
                </button>
              </li>
              <li className="sc-3l5nav iKvVhN" style={li}>
                <button
                  type="button"
                  className="btn_navbar"
                  style={{ ...button, width: "62px", textAlign: "center" }}
                  onClick={() => {
                    console.log(
                      document.defaultView
                        .getComputedStyle(document.querySelector(".sidebar"))
                        .getPropertyValue("font-size")
                    );

                    if (sidebarEl.style.transform == `translateX(0%)`) {
                      sidebarEl.style.transform = "translateX(-100%)";

                      //sidebarEl.style.transform == `translateX(0%)`
                      if (asideEl.style.transform == `translateX(0%)`) {
                        asideEl.style.transform = "translateX(0%)";
                      } else {
                        //sidebarEl.style.transform == `translateX(0%)`
                        //asideEl.style.transform == `translateX(-100%)`
                        buttonEl.querySelector(
                          "span"
                        ).style.transform = `translateY(-60%) rotate(45deg)`;
                      }
                    } else {
                      //sidebarEl.style.transform == `translateX(-100%)
                      if (asideEl.style.transform == `translateX(0%)`) {
                        sidebarEl.style.transform = "translateX(0%)";
                        asideEl.style.transform = `translateX(0%)`;
                        buttonEl.querySelector(
                          "span"
                        ).style.transform = `translate(40%,-50%) rotate(-135deg)`;
                        buttonEl.setAttribute("aria-controls", "true");
                      } else {
                        //sidebarEl.style.transform == `translateX(-100%)
                        //asideEl.style.transform == `translateX(-100%)
                        sidebarEl.style.transform = "translateX(0%)";
                        asideEl.style.transform = "translateX(-100%)";
                        buttonEl.querySelector(
                          "span"
                        ).style.transform = `translate(40%,-50%) rotate(-135deg)`;
                        buttonEl.setAttribute("aria-controls", "true");
                      }
                    }
                  }}
                >
                  <span className="sc-1fdfve0 evoerN icon">
                    <span className="icon_inner" aria-hidden="true">
                      <svg
                        viewBox="0 0 62 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m39.768 7.184-4.664-3.096a.52.52 0 0 0-.81.43V6.58H28.08c-1.147 0-2.08.929-2.08 2.07V19h2.08V8.65h6.215v2.06c0 .413.462.66.809.43l4.664-3.095a.516.516 0 0 0 0-.861"></path>
                      </svg>
                    </span>
                  </span>
                  <span className="navbar_text">장소찾기</span>
                </button>
              </li>
            </ul>
          </nav>
        </header>
    )
}

const h1 = {
  listStyle: "none",
  /* margin: 0; */
  padding: 0,
  borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
  fontSize: "2em",

  lineHeight: 1,
};

const button = {
  padding: 0,
  margin: 0,

  border: "none",
  outline: "none",

  //  backgroundColor: 'transparent',

  /* 마우스 올렸을 때 마우스 스타일 지정 -> 손모양 */
  cursor: "pointer",
  backgroundColor: "inherit",
  fontSize: "0.8333em",
};

const ul = {
  padding: 0,
};

const li = {
  listStyle: "none",
  // padding: 0,
};

const input = {
  width: "13em",
  height: "32px",
  // padding: 0,
};

const Nav = styled.div`
  width: calc(100vw - 4em - 2.8em);
  height: 2em;
  position: absolute;
  top: 0;
  bottom: 0;
  // left: 0;
  z-index: 999;
`;
const Li = styled.li`
  display: inline-block;
  position: relative;
  margin: 0 1%;
`;
const MenuBtn = styled(Button)`
 width: 8em
 margin: 0 1% !important;
 background-color: #90caf9 !important;
 &:hover {
  background-color: #ce93d8 !important;
  }
`;