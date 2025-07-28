import styled from 'styled-components';

// 화면 크기에 따라 글꼴 크기를 설정하는 ResponsiveDiv 컴포넌트
const ResponsiveDiv = styled.div`

    width: 100vw;
    height: 100vh;
    display: flex;
    color: inherit;
    font-size: 14px; // 기본 모바일 글꼴 크기

    @media (min-width: 768px) { // 태블릿
    font-size: 16px;
    }

    @media (min-width: 1224px) { // 데스크탑
        width: 100vw;
        height: 100vh;
        display: flex;
        font-size: 20px;
    }

    @media (prefers-color-scheme: light) {
        /* 라이트 모드에 적용할 스타일 정의 */
        color: #000;
        background-color: #fff;

    }
        
    @media (prefers-color-scheme: dark) {
        /* 다크 모드에 적용할 스타일 정의 */
        color: #fff;
        background-color: #121212;

        h1,
        h2,
        h3 {
            color: #ffffff;
        }

        p {
            color: #dbdbdb;
        }

        a {
            color: #41adff;
        }

    }
`;
import React, { useEffect, useState } from "react";


// 실제 컴포넌트
const Component = () => {   

 const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  function Darkmode(){
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => setIsDarkMode(e.matches))
  }

  return (  
  <ResponsiveDiv>반응형 웹 콘텐츠
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <p>현재 모드: {isDarkMode ? "다크 모드" : "라이트 모드"}</p>
    </div>
    <Darkmode/>
  </ResponsiveDiv>
);
};

export default Component;