// import styled from 'styled-components';
// import { Box, Button,  Modal, Paper  } from '@mui/material';
import { styled, Box, Button, Modal, Paper  } from '../../app/components/maps';

import {Header, SideBar, Leaflet} from "../../app/components/maps/";

import React, { useEffect, useState, useMemo, useRef, createElement } from "react";
//전역 데이터 관리 생성
import {MapsContext,MapsProvider} from '../../app/context/MapsContext';

const Maps = () => {

  return (
    // <MapsProvider value={{L, useMap, data, markers, setMarkers, setValue, getValues, reset, register, errors, handleSubmit, refreshFn, placeList, setPlaceList, place, setPlace,  sidebarEl, asideEl, buttonEl,}}>
     <MapsProvider> 
      <div
        style={{
          width: "100vw",
          height: '100vh',
          // height: 'calc(100 * var(--vh)',
          display: "flex",
          color: "inherit",
          fontSize: '100%',
        }}
      >
        {/* {Object.entries(markers).forEach((key, value) => {
          console.log(`sdf ${key} : ${value}`);
        })}{" "} */}
        {/* <div
          style={{ display: "flex", flexDirection: "column", minWidth: "1em" }}
        >
          <div style={{ minWidth: "1em" }}>
            <img src="" alt="sddddd" style={{ width: "60px" }}></img>sdfsdf
          </div>{" "}
          <div style={{ minWidth: "60px" }}>
            <img src="" alt="sddddd" style={{ width: "60px" }}></img>sdfsdf
          </div>{" "}
        </div> */}

        {/* <Header sidebarEl={sidebarEl} asideEl={asideEl} buttonEl={buttonEl}/> */}
       <Header/>
        <div
          style={
            {
              // display: "flex",
              flex: "1 1 auto"
              // position: "relative",width: "inherit"
              // zIndex: 0,
            }
          }
        >
          {/* <SideBar markers={markers} setMarkers={setMarkers} reset={reset} setValue={setValue} getValues={getValues} handleSubmit={handleSubmit}
            register={register} errors={errors}
            setPlace={setPlace} placeList={placeList} setPlaceList={setPlaceList} sidebarEl={sidebarEl} asideEl={asideEl} buttonEl={buttonEl} 
          />  */}
          <SideBar />
            {/* <Nav className="header-nav">
              <Ul>
                <Li>
                  <MenuBtn
                  variant='contained'
                    onClick={(event) =>{
                    setIsModalOpen(true)
                    }}
                  >
                  지도 검색
                  </MenuBtn>
                </Li>
                <Li>
                  <MenuBtn
                    variant='contained'
                    // aria-expanded={'true'}
                    onClick={(event) =>{
                    console.log()
                    }}
                  >
                    마커 리스트
                  </MenuBtn>
                </Li>
              </Ul>  
            </Nav> */}

            {/* <Leaflet markers={markers} setMarkers={setMarkers} place={place} setPlace={setPlace} setValue={setValue} getValues={getValues} reset={reset} sidebarEl={sidebarEl} asideEl={asideEl} buttonEl={buttonEl}></Leaflet> */}
            <Leaflet/>
        </div>
      </div>
    </MapsProvider>
  );

};

export default Maps;

const h1 = {
  listStyle: 'none',
  /* margin: 0; */
  padding: 0,
  borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
  fontSize: "2em",

  lineHeight: 1,
}

const button ={
  padding: 0,
  margin: 0,

  border: 'none',
  outline: 'none',
 
  //  backgroundColor: 'transparent', 

  /* 마우스 올렸을 때 마우스 스타일 지정 -> 손모양 */
  cursor: 'pointer',
  backgroundColor: 'inherit',
  fontSize: '0.8333em'
}

const ul = {
   padding: 0,
}

const li = {
  listStyle: 'none',
  // padding: 0,
}

const input = {
  width: '13em',
  height: '32px',
  // padding: 0,
}

const Nav = styled.div`
  // width: calc(100vw - 4em - 2.8em);
  height: 2em;
  position: absolute;
  top: 0;
  bottom: 0;
  // left: 0;
  z-index: 999;
`
const Ul = styled.ul`
  text-align: center;
  display: ruby-text;
`

const Li = styled.li`
    display: ruby-text;
  display: inline-block;
  position: relative;
  margin: 0 1%;
`
const MenuBtn = styled(Button)`
 width: 8em
 margin: 0 1% !important;
 background-color: #90caf9 !important;
 outline: none !important;
 &:hover {
  background-color: #ce93d8 !important;
  }
`

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
        // font-size: 16px;
    }

    @media (prefers-color-scheme: light) {
        /* 라이트 모드에 적용할 스타일 정의 */
        color: #000;
        background-color: #fff;

    }
        
    @media (prefers-color-scheme: dark) {
        /* 다크 모드에 적용할 스타일 정의 */
        color: #fff  !important;
        background-color: #121212 !important;

        h1, h2, h3, .navbar_text {
            color: #ffffff;
        }

        .search, .aside {
        color: #fff  !important;
        background-color: #121212 !important;
        border: 1px solid rgb(217, 217, 217) !important;
        }

        .aside {
        color: #fff  !important;
        background-color: #121212 !important;
        border: 1px solid rgb(217, 217, 217) !important;
        border-left: none !important;
        }

        p {
            color: #dbdbdb;
        }

        a {
            // color: #41adff;
        }

        button {
          outline: none;
        }

        .fold-button {
            border-left: 1px solid  rgb(217, 217, 217) !important;  
        }
            
        .fold-button > span {
          border: solid  #fff !important;  
          border-width: 2px 2px 0 0 !important;
        }

        header {
          background-color: #121212 !important;
        
        }

        .icon_inner > svg {
          fill: rgb(217, 217, 217);
        }

    }
`

const SearchDiv = styled.div`
  background-color:  #fff;
`
