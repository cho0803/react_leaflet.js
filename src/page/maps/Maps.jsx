// import styled from 'styled-components';
// import { Box, Button,  Modal, Paper  } from '@mui/material';
import { styled, Box, Button, Modal, Paper  } from '../../app/components/maps';


import {AppBar,Toolbar, IconButton, InputBase, } from '@mui/material';

// import {Menu as MenuIcon, Search as SearchIcon, Directions as DirectionsIcon  } from '@mui/icons-material';
// 속도 저하로 import 방식 변경 이유 확인필요
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon  from'@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

import {Header, SideBar, Leaflet} from "../../app/components/maps/";

import {
  MapContainer, 
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMapEvent,
  useMap,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import "./index.css";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import { v4 as uuidv4 } from "uuid";

// 마커 아이콘 경로 설정
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  // iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  // iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconUrl: iconUrl,
  // shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  shadowUrl: shadowUrl,
  // iconSize: [25, 30], // 마커의 가로, 세로 크기
  // iconAnchor: [32, 64], // 마커 포인트
  // shadowAnchor: [32, 64], // 그림자 포인트 위치
  // popupAnchor: [0, -60], // 팝업 위치
});

/* eslint-disable */
import React, { useEffect, useState, useMemo, useRef, createElement } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import axios from "axios";

//전역 데이터 관리 생성
import {MapsContext} from '../../app/context/MapsContext';

const Maps = () => {

  const [markers, setMarkers] = useState({
    1: {
      position: {
        lat: 37.57,
        lng: 127.26,
      },
      title: "기본",
      content: "기본내용",
      status: 1,
    },
    2: {
      position: {
        lat: 38.22,
        lng: 126.58,
      },
      title: "테스트",
      content: "테스트 내용",
      status: 1,
    },
  });
  const [maps, setMaps] = useState();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["dataMap"],
    queryFn: () =>
      axios.get("api/test").then(
        (res) =>
          // res
          updateMarkers(res.data)
        // console.log(res.data, "usequery"),
        // setMarkers(res.data)
      ),
  });
  const queryClient = useQueryClient();
  // mutate 함수
  const refreshFn = () => {
    // (현재 있는 list데이터를 등록해제 시키면, 데이터를 다시받아옴)
    queryClient.invalidateQueries(["dataMap"]);
  };

  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm();

  const [key, setKey] = useState();

  const sidebarEl = document.querySelector(".sidebar");
  const asideEl = document.querySelector(".aside");
  const buttonEl = document.querySelector("button[aria-expanded]");

  const [placeList, setPlaceList] = useState([]);

  const [place, setPlace] = useState();

  useEffect(() => {
    // axios.get("test").then((res) => {
    //   setTests(res.data);
    //   setMaps(res.data);
    //   console.log(res.data);
    // });
    // axios
    //   .get("https://nominatim.openstreetmap.org/search", {
    //     params: {
    //       lon: "127.01",
    //       lat: "37.64",
    //       q: "북한산",
    //       limit: 5,
    //       format: "json",
    //       exclude: "206494953,206604942,207242176",
    //     },
    //   })
    //   .then(function (res) {
    //     // console.log(res);
    //     res.data.map((item) => {
    //       console.log(item);
    //     });
    //   });
    // console.log(markers, "markers");
  }, [markers]);

  // console.log(getDate);
  // axios.get("test").then((res) => console.log(res.data), setMarkers(res.data));

  let vh = window.innerHeight * 0.01

  document.documentElement.style.setProperty('--vh', `${vh}px`)

  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  })

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <MapsContext value={{L, useMap, markers, setMarkers, setValue, getValues, reset, register, errors, handleSubmit, placeList, setPlaceList, place, setPlace,  sidebarEl, asideEl, buttonEl,}}>
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
            <Nav className="header-nav">
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
            </Nav>

            <CustomModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
              <AppBar position="static" width="100%">
                <Toolbar>
                  {/*  display : flex 적용 되어 있으므로 justifyContent : 'center' css 추가  */}
                  <Box sx={{ width: '5em', textAlign: 'center', justifyContent : 'center'}}>장소 찾기</Box>
                </Toolbar>
              </AppBar>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '29.5em' }}
              >
              <IconButton sx={{ p: '10px' }} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
              </Paper>
            </CustomModal>
            <Leaflet markers={markers} setMarkers={setMarkers} place={place} setPlace={setPlace} setValue={setValue} getValues={getValues} reset={reset} sidebarEl={sidebarEl} asideEl={asideEl} buttonEl={buttonEl}></Leaflet>
        </div>
      </div>
    </MapsContext>
  );

  function updateMarkers(data) {
    // markers에 set을 하는 순간 전체적으로 리렌더링
    // console.log(data, "데이타");
    // console.log(data, "update");

    setMarkers((markers) => {
      // console.log(markers,data.length !=0);
      if (markers && data.length != 0) {
        Object.entries(data[data.length - 1]).forEach(([key, value]) => {
          // console.log(`${key}: ${value}`);
          setValue(key, value);
        });
      }
      return {
        ...markers,
        ...data.reduce(
          (prev, coord) => ({
            // console.log(coord, "coord");
            ...prev,
            [Number(coord.id)]: {
              position: new L.LatLng(coord.lat, coord.lng),
              title: coord.title,
              content: coord.content,
              // image: coord.image,
              status: 1,
            },
          }),
          {}
        ),
      };
    });

    return data;
  }
 
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

const SearchInput = styled(InputBase)`
color: inherit;
& .MuiInputBase-input {
  padding : 1, 1, 0 !important;
}
`
export const CustomModal= ({ isOpen, closeModal, children }) => {
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Paper
        elevation={2}
        sx={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: '30em',
          maxWidth: "100%",
          maxHeight: "90%",
          overflowY: "auto",
        }}
      >
        {children}
      </Paper>
    </Modal>
  );
}