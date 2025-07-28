import styled from 'styled-components';
import {Box,Button, Menu, MenuItem  } from '@mui/material';
import { Modal, Paper,Typography  } from '@mui/material';
import { css } from '@emotion/react';
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

import iconUrl from "leaflet/dist/images/marker-icon.png"
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
import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  createElement,
} from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import axios from "axios";
// import { getValue } from "@testing-library/user-event/dist/utils";
const Maps = () => {
  const animateRef = useRef(false);
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
  // console.log(data, "확인용");
  const getDate = async () => {
    const response = await axios.get("/test");
    console.log(response.data, "데이터");
    return response.data;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm();
  
  const [key, setKey] = useState();

  const sidebarEl = document.querySelector(".sidebar") 
  const asideEl = document.querySelector(".aside") 
  const buttonEl = document.querySelector("button[aria-expanded]");

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
    <>
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
              <span className="blind" 
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
            <ul className="list_navbar -fold" 
                // style={{ width: "100%" }}
                style={ul}
            >
              {" "}
              <li className="sc-3l5nav iKvVhN" style={li}>
                <button
                  type="button"
                  className="btn_navbar"
                  style={{...button, width:'62px', textAlign: 'center'}}
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
                <button type="button" className="btn_navbar" style={{...button, width:'62px', textAlign: 'center'}}
                  onClick={() =>{
                    console.log(document.defaultView.getComputedStyle(document.querySelector('.sidebar')).getPropertyValue("font-size"))

                    if (sidebarEl.style.transform == `translateX(0%)`){

                      sidebarEl.style.transform = 'translateX(-100%)';
                      
                      //sidebarEl.style.transform == `translateX(0%)`
                      if (asideEl.style.transform == `translateX(0%)`){
                        asideEl.style.transform = 'translateX(0%)'
                      }else{
                        //sidebarEl.style.transform == `translateX(0%)`
                        //asideEl.style.transform == `translateX(-100%)`
                        buttonEl.querySelector("span").style.transform = `translateY(-60%) rotate(45deg)`;
                      }
                    }else{
                      //sidebarEl.style.transform == `translateX(-100%)
                      if (asideEl.style.transform == `translateX(0%)`){
                        sidebarEl.style.transform = 'translateX(0%)';
                        asideEl.style.transform = `translateX(0%)`
                        buttonEl.querySelector("span").style.transform = `translate(40%,-50%) rotate(-135deg)`;
                        buttonEl.setAttribute("aria-controls", "true");
                      }else{
                        //sidebarEl.style.transform == `translateX(-100%)  
                        //asideEl.style.transform == `translateX(-100%)
                        sidebarEl.style.transform = 'translateX(0%)';
                        asideEl.style.transform = 'translateX(-100%)'
                        buttonEl.querySelector("span").style.transform = `translate(40%,-50%) rotate(-135deg)`;
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
          {/* <div className='side' style={{ position: "absolute", top:'0', bottom: '0', transition: "0.4s", transform: "translateX(-100%)",width: "inherit", zIndex: " 2",}}> */}
          <div 
            className='sidebar' 
            style={{ 
              /*transform: "translateX(-100%)", display: 'flex', */ 
              width: '13em',
              boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 8px 0px', 
              display: 'flex', transform: "translateX(-100%)",transition: "0.4s",position: "absolute", top:'0', bottom: '0', zIndex:1, 
           }}>
            <div
              className='search'
              style={{
                width: "inherit",
                // height: "100vh",
                position: "relative",
                // padding: "60px 20px",
                // transition: "0.4s",
                // transform: "translateX(-100%)",
                // transform: "translateX(0%)",
                // position: "absolute",
                // float: "left",
                backgroundColor: "rgb(255, 255, 255)",
                zIndex: " 2",
                boxShadow: 'inherit',
                // border: "1px solid rgb(217, 217, 217)",
                textAlign: 'center'
              }}
            >
              <div style={{ padding: '15px 0px' }}>               
                <input
                type="text"
                placeholder="장소 검색"
                style={{ height: '32px' }}
                // value="북한산"
                onKeyDown={(e) => {
                  if (e.keyCode == 13) {
                    // console.log(e.target.value);
                    axios
                      .get("https://nominatim.openstreetmap.org/search", {
                        params: {
                          lon: "127.01",
                          lat: "37.64",
                          q: e.target.value,
                          limit: 5,
                          format: "json",
                          exclude: "206494953,206604942,207242176",
                        },
                      })
                      .then(function (res) {
                        setMaps(
                          res.data.map((item) => {
                            // console.log(item);
                            return {
                              display_name: item.display_name,
                              lat: item.lat,
                              lon: item.lon,
                            };
                          })
                        );
                      });
                  }
                }}
                />
              </div>

              <div id="searchList">
                {/* {Object.entries(markers).map(
                  ([key, value]) => (
                    <div key={key}>
                      {key} {markers[key].title} {markers[key].content}
                    </div>
                  )

                  // {
                  //   console.log(`${key}: ${JSON.stringify(markers[key])}`);
                  // }
                )} */}
                {maps?.map((item, index) => (
                  <ul key={index} style={ul}>
                    <li style={li}>
                      <button
                        style={button}
                        data-lat={item.lat}
                        data-lon={item.lon}
                        onClick={() => {
                          setKey(item);
                          // console.log("클릭");
                        }}
                      >
                        <a href="#" style={{ color: "inherit" }}>
                          {item.display_name}
                        </a>
                      </button>
                    </li>
                    {/* {<li>{item.id}</li>} */}
                  </ul>
                ))}
              </div>
            </div>
            <aside
              className='aside'
              style={{
                width: "inherit",
                // height: "100%",
                // position: "relative",
                // padding: "60px 20px",
                transition: "0.4s",
                transform: "translateX(-100%)",
                position: "absolute",
                top: "0px",
                bottom: "0px",
                left: "100%",
                // float: "left",
                backgroundColor: "rgb(255, 255, 255)",
                zIndex: " 1",
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 8px 0px',
                // border: "1px solid rgb(217, 217, 217)",
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                display:'flex',
              }}
            >
<div style={{flexBasis: '100%'}}>
                {" "}
              <div style={{ padding: '15px 0px' }}>    
                <input
                  type="text"
                  style={{...input,}}
                  placeholder="제목"
                  {...register("title", { required: "제목을 입력해주세요" })}
                  onKeyUp={() => {
                    // markers[getValues("id")].title = getValues("title");
                    // markers[getValues("id")].content = getValues("content");
                    if(!markers[getValues("id")] ) {
                      alert('지도에서 좌표를 클릭해주세요')
                      return
                    }
                    setMarkers((prev) => ({
                      ...prev,
                      [getValues("id")]: {
                        position: markers[getValues("id")].position,
                        title: getValues("title"),
                        content: getValues("content"),
                      },
                    }));
                  }}
                />
                
              </div>  
              <span>{errors.title?.message}</span>
              <textarea
                style={{...input,height: '60px'}}
                placeholder="내용"
                {...register("content", { required: "내용을 입력해주세요" })}
                onKeyUp={(e) => {
                  // var keycode = e.keyCode;
                  // console.log(e.target.value);

                  // markers[getValues("id")].title = getValues("title");
                  // markers[getValues("id")].content = getValues("content");
                  if(!markers[getValues("id")] ) {
                    alert('지도에서 좌표를 클릭해주세요')
                    return
                  }
                  setMarkers((prev) => ({
                    ...prev,
                    [getValues("id")]: {
                      position: markers[getValues("id")].position,
                      title: getValues("title"),
                      content: getValues("content"),
                    },
                  }));
                }}
              />
              {" "}
              <span>{errors.content?.message}</span>
              <br />
              <input type="text" hidden placeholder="id" {...register("id")} />
              <input type="text" hidden placeholder="lat" {...register("lat")} />
              <input type="text" hidden placeholder="lng" {...register("lng")} />
              <div style={{ width: '7em', float: "right" }}>
                {" "}
                <button
                  className="btn btn-primary"
                  // style={button}
                  style={{...button, borderRadius: 0 , padding: "1px 6px", background: '#f0f0f0',border: '1px solid rgb(0, 0, 0)'}}
                  onClick={() => {
                    handleSubmit(
                      function (param) {
                        // if (data.id) console.log("데이타 id", id);
                        console.log(param);
                        // param.id = Number(param.id) + 1 ? param.id : "";

                        axios
                          .post("api/test", {
                            ...param,
                            id: Number(param.id) + 1 ? param.id : "",
                          })
                          .then(async (res) => {
                            // console.log(res.data);
                            // console.log(res);
                            refreshFn();

                            if (!Number(param.id) + 0) {
                              console.log(data, getValues("id"), "들어옴1");
                              setMarkers((prev) => {
                                const { [param.id]: $, ...rest } = prev;
                                console.log(prev, param.id, rest, "rest");
                                return rest;
                              });
                            }

                            if (!Number(param.id) + 0) {
                              console.log(data, "데이타");
                              Object.entries(res.data).forEach(
                                ([key, value]) => {
                                  // console.log(`${key}: ${value}`);
                                  setValue(key, value);
                                }
                              );
                            }
                          });
                      },
                      function (e) {
                        const errorlist = Object.values(e);
                        console.log(errorlist[0].message);
                        // console.log(errorlist);
                      }
                    )();
                  }}
                >
                  저장
                </button>{" "}
                <button
                  className="btn btn-primary"
                  style={{...button, borderRadius: 0 , padding: "1px 6px", background: '#f0f0f0',border: '1px solid rgb(0, 0, 0)'}}
                  onClick={() => {
                    // console.log("삭제", getValues("id"));
                    if (Number(getValues("id")) + 0) {
                      console.log("값있음");
                      axios.delete(`api/test/${getValues("id")}`);
                      setMarkers((prev) => {
                        const { [getValues("id")]: _, ...rest } = prev;
                        // console.log(rest, "rest");

                        return rest;
                      });
                      // refreshFn();
                      reset();
                    } else {
                      alert("저장 후 삭제 하실수 있습니다");
                    }
                  }}
                >
                  삭제
                </button>
                {/* {Number(getValues("id")) + 0}
                {typeof (Number(getValues("id")) + 0)} */}
                {/* {typeof (Number(getValues("id")) + 0) === "number"} */}
              </div>
</div>
              <button
                type="button"
                aria-expanded="false"
                className="fold-button"
                style={{
                  ...button,
                  display: "block",
                  padding: "2em 0.5em",
                  width: "30px",
                  height: "30px",
                  position: "absolute",
                  left: "100%",
                  top: "40%",
                  cursor: "pointer",
                  backgroundColor: 'inherit',
                  border: 'none',
                  outline: 'none',
                  borderRadius: '0px 9px 9px 0px',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  zIndex:'4',
                }}
                onClick={() => {
                  
                  if (!buttonEl.getAttribute("aria-controls")) return;
                  
                  // buttonEl.querySelector("span").style.transform = `translate(40%,-50%) rotate(-135deg)`;
                  
                  if(sidebarEl.style.transform == `translateX(-100%)` && asideEl.style.transform==`translateX(0%)`){
                    asideEl.style.transform = `translateX(-100%)`
                    buttonEl.querySelector("span").style.transform = `translateY(-60%) rotate(45deg)`;
                    return
                  }

                  if(sidebarEl.style.transform == `translateX(0%)` && asideEl.style.transform == `translateX(0%)` || asideEl.style.transform == `translateX(-100%)`){
                    // sidebarEl.style.transform = `translateX(0%)`
                    sidebarEl.style.transform = 'translateX(-100%)';
                    asideEl.style.transform = 'translateX(-100%)'
                    buttonEl.querySelector("span").style.transform = `translateY(-60%) rotate(45deg)`;
                    return
                  }

                }}
              >
                {" "}
                <span
                  style={{
                    border: "solid currentcolor",
                    borderWidth: "2px  2px 0 0",
                    position: "absolute",
                    width: "0.5em",
                    height: "0.5em",
                    left: "0.5em",
                    top: "50%",
                    transform: "translateY(-60%) rotate(45deg)",
                  }}
                ></span>
                {/* <span class="blind">패널 접기</span> */}
              </button>
            </aside>
          </div>
      <Nav className="header-nav">
        <Box component='ul' sx={{ textAlign: 'center' }}>
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
        </Box>  
      </Nav>
       <CustomModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <Box>
          <Typography variant="h6" component="h2">
            hi
          </Typography>
          <Typography sx={{ mt: 2 }}>
            it's me
          </Typography>
        </Box>
      </CustomModal>
          <MapContainer
            center={[36.17, 127.83]} // 초기 중심 좌표
            zoom={6.0} // 초기 줌 레벨
            zoomSnap={0.5} // 줌 레벨 스냅
            // maxBounds={L.latLngBounds(
            //   [32.5, 123.5], // 남서 좌표 (제주 남서쪽)
            //   [39.0, 132.0] // 북동 좌표 (강원도 북동쪽)
            // )} // 최대 경계 설정
            maxBoundsViscosity={1.0} // 경계의 견고 정도 제어 (1.0일 경우 완전히 견고해져 경계 밖으로 드래그 불가)
            zoomControl={false}
            style={{
              // flex 1 1 auto 적용 해제시
              width: 'calc(100vw - 66px)',
              // width: "calc(100vw - 7em)",
              // width: "100vw",
              height: "100%",
              // position: "relative",
              zIndex: 0,
            }}
          >
            {" "}
            <TileLayer
              // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[36.17, 127.83]}
              // icon = {new L.Icon({
              //   ...L.Icon.Default.prototype.options,
              //   // className: "blink", // 선택된 마커에 애니메이션 적용
              // })}         
              // icon={L.icon({ iconUrl: markerIcon })}
              // eventHandlers={{ click: tooltipClick.bind(this, "TEST Message") }}
              eventHandlers={{
                click: (e) => {
                  console.log(
                    "click",
                    e.target,
                    e.layerPoint,
                    e.containerPoint,
                    e.originalEvent
                  );
                },
                mouseover: (e) => {
                  // console.log("over", e.target.openPopup());
                  e.target.openPopup();
                },
                mouseout: (e) => {
                  // console.log("out", e.target.closePopup());
                  e.target.closePopup();
                },
              }}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>

              <MyComponent data={key} />
            </Marker>
            <AddMarker />
            {/* <LocationMarker /> */}
            {/* <SetViewOnClick animateRef={animateRef} /> */}
            <ZoomControl position="topright" />
          </MapContainer>
        </div>
      </div>
    </>
  );

  function updateMarkers(data) {
    // markers에 set을 하는 순간 전체적으로 리렌더링
    // console.log(data, "데이타");
    // console.log(data, "update");

    setMarkers((markers) => {
      // console.log(markers,data.length !=0);
      if (markers && data.length !=0) {
        // Object.entries(data[data.length - 1]).forEach(([key, value]) => {
        //   // console.log(`${key}: ${value}`);
        //   setValue(key, value);
        // });
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
  function AddMarker() {
    // console.info("AddMarker loading complete!");

    const map = useMapEvents({
      click: (e) => {
        // console.log(e.target, "맵 클릭");
        const uuid = uuidv4();
        // console.log(uuid);
        setMarkers((prevMarkers) => ({
          // 이전 상태를 기반으로 markers 업데이트 (비동기 처리 고려)
          ...prevMarkers,
          [uuid]: {
            position: e.latlng,
          },
        }));
        reset()
        setValue("id", uuid),
          setValue("title", ""),
          setValue("content", ""),
          setValue("lat", e.latlng.lat);
        setValue("lng", e.latlng.lng);
        
        // console.log("add");
        // map.setView(e.latlng, 13);
        setKey(null);
      },
    });

    return (
      <>
        {Object.keys(markers)?.map((uuid, idx) => {
          const icon = new L.Icon({
            ...L.Icon.Default.prototype.options,
            // className: "blink", // 선택된 마커에 애니메이션 적용
          });
          return (
            <Marker
              key={uuid}
              // icon={icon}
              position={markers[uuid].position}
              eventHandlers={{
                click: (e) => {
                  // 등록된 마커 클릭 이벤트
                  // console.log("clickEventHandlers loading complete!");
                  // console.log("테스트", markers[uuid].title);
                  const { lat, lng } = e.latlng;

                  // setValue("id", uuid);
                  setValue("lat", lat); // 위도
                  setValue("lng", lng); // 경도
                  setValue("title", markers[uuid].title); // 제목
                  setValue("content", markers[uuid].content); // 내용
                  
                  // console.log(
                  //   document.getElementsByClassName("sidebar")[0],
                  //   document.querySelector(".sidebar")
                  // );
                  // map.setView(e.latlng, 13);

                  // sidebarEl.style.transform = `translateX(-50%)`;
                  // sidebarEl.style.transition = `0.4s`

                  if(sidebarEl.style.transform == `translateX(0%)` && asideEl.style.transform==`translateX(0%)`){

                    if(uuid != getValues("id")){
                      console.log(uuid != getValues("id"),'두개다 오픈',uuid,getValues('id'))
                      setValue("id", uuid);
                      return
                    } 
                  
                    setValue("id", uuid);
                  
                    asideEl.style.transform = `translateX(-100%)`
                    buttonEl.querySelector("span").style.transform = `translate(40%,-50%) rotate(-135deg)`;
                    buttonEl.setAttribute("aria-controls", "true");
                    return
                  }

                  if(sidebarEl.style.transform == `translateX(0%)` && asideEl.style.transform==`translateX(-100%)`){

                   setValue("id", uuid);
                    asideEl.style.transform = `translateX(0%)`
                    // buttonEl.querySelector("span").style.transform = `translate(40%,-50%) rotate(-135deg)`;
                    // sidebarEl.style.transform = `translateX(100%)`
                  }
                  
                  if(sidebarEl.style.transform == `translateX(-100%)` && asideEl.style.transform==`translateX(0%)`){
                    if(uuid != getValues("id")){
                      console.log(uuid != getValues("id"),'마커만클릭',uuid,getValues('id'))
                      setValue("id", uuid);
                      return
                    } 

                   setValue("id", uuid);
                    asideEl.style.transform = `translateX(-100%)`
                    buttonEl.querySelector("span").style.transform = `translateY(-60%) rotate(45deg)`;
                    buttonEl.setAttribute("aria-controls", "true");
                    return
                  }
                  
                  if(sidebarEl.style.transform == `translateX(-100%)` && asideEl.style.transform==`translateX(-100%)`){
                    setValue("id", uuid);
                    asideEl.style.transform = `translateX(0%)`
                    // buttonEl.querySelector("span").style.transform = `translate(40%,-50%) rotate(-135deg)`;
                    // sidebarEl.style.transform = `translateX(100%)`
                  }

                  // asideEl.style.transform = `translateX(-100%)`;
                  // asideEl.style.transition = `0.4s`
                  
                  buttonEl.querySelector("span").style.transform = `translate(40%,-50%) rotate(-135deg)`;
                  buttonEl.setAttribute("aria-controls", "true");
                },
                mouseover: (e) => {
                  // console.log("over", e.target.openPopup);
                  e.target.openPopup();
                },
                mouseout: (e) => {
                  // console.log("out", e.target.closePopup());
                  e.target.closePopup();
                  // document.querySelector(
                  //   ".sidebar"
                  // ).style.transform = `translateX(-100%)`;
                },
              }}
            >
              <Popup closeButton={false}>
                {markers[uuid] && markers[uuid].title
                  ? markers[uuid].title
                  : "제목을 입력해 주세요"}
              </Popup>
            </Marker>
          );
        })}
      </>
    );
  }
  function SetViewOnClick({ animateRef }) {
    const map = useMapEvent("click", (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: animateRef.current || false,
      });
    });

    return null;
  }

  function MyComponent({ data }) {
    const element = document.querySelector("button[data-lat][data-lon]");
    // console.log(element);
    // console.log(data, typeof data);
    if (!data) {
      return;
    }
    // const position = [data.lat, data.lon];
    // console.log(position, "위치");

    // console.log(
    //   element,
    //   element.getAttribute("data-lat"),
    //   element.getAttribute("data-lon")
    // );
    // return;

    const map = useMap();
    // console.log(map.getCenter());
    map.setView([data.lat, data.lon], 13);
    console.log(map.getZoom());
    // map.setZoom(13);
    // console.log(useMap().setView(position).setZoom(13));
    // console.log(map.getCenter());
    // console.log([data.lat, data.lon], "위치");

    // console.log(map.setZoom(13));
    // console.log(map.getCenter());
    // console.log("map center:", map.getCenter());
    // setKey(null);
    return (
      <Marker
        position={[data.lat, data.lon]}
        onContextMenu={(event) => {
          event.preventDefault();
          console.log;
          console.log("마커");
        }}
        eventHandlers={{
          contextmenu: (e) => {
            event.preventDefault();
            if (confirm("마커로 등록 하시겠습니까?")) {
              const { lat, lng } = e.latlng;
              const uuid = uuidv4();
              setMarkers((prevMarkers) => ({
                // 이전 상태를 기반으로 markers 업데이트 (비동기 처리 고려)
                ...prevMarkers,
                [uuid]: {
                  position: e.latlng,
                },
              }));
              setValue("id", uuid),
                setValue("title", ""),
                setValue("content", ""),
                setValue("lat", e.latlng.lat);
              setValue("lng", e.latlng.lng);
              console.log("add");
              map.setView(e.latlng, 13);
              setKey(null);

              if(sidebarEl.style.transform == `translateX(0%)` && asideEl.style.transform==`translateX(0%)`){
                asideEl.style.transform = `translateX(-100%)`
                buttonEl.querySelector("span").style.transform = `translate(40%,-50%) rotate(-135deg)`;
                buttonEl.setAttribute("aria-controls", "true");
                return
              }

              if(sidebarEl.style.transform == `translateX(0%)` && asideEl.style.transform==`translateX(-100%)`){
                asideEl.style.transform = `translateX(0%)`
                // buttonEl.querySelector("span").style.transform = `translate(40%,-50%) rotate(-135deg)`;
                // sidebarEl.style.transform = `translateX(100%)`
              }
              
              if(sidebarEl.style.transform == `translateX(-100%)` && asideEl.style.transform==`translateX(0%)`){
                asideEl.style.transform = `translateX(-100%)`
                buttonEl.querySelector("span").style.transform = `translateY(-60%) rotate(45deg)`;
                buttonEl.setAttribute("aria-controls", "true");
                return
              }
              
              if(sidebarEl.style.transform == `translateX(-100%)` && asideEl.style.transform==`translateX(-100%)`){
                asideEl.style.transform = `translateX(0%)`
                // buttonEl.querySelector("span").style.transform = `translate(40%,-50%) rotate(-135deg)`;
                // sidebarEl.style.transform = `translateX(100%)`
              }

              // asideEl.style.transform = `translateX(-100%)`;
              // asideEl.style.transition = `0.4s`
              
              buttonEl.querySelector("span").style.transform = `translate(40%,-50%) rotate(-135deg)`;
              buttonEl.setAttribute("aria-controls", "true");
            }
          },
        }}
      >
        <Popup>{data.display_name}</Popup>
      </Marker>
    );
  }

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        console.log(map.setPosition([36.17, 127.83]));
        // map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }
};

function sidbarBtn (){
  const element = createElement(
        "div",
        { id: "app" },
        createElement("h1", null, "Hello, World!"),
        createElement(
          "button",
          { onClick: () => alert("Clicked!") },
          "Click me"
        )
      );
  document.querySelector('.search').append(element)
}

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
  width: calc(100vw - 4em - 2.8em);
  height: 2em;
  position: absolute;
  top: 0;
  bottom: 0;
  // left: 0;
  z-index: 999;
`
const Li = styled.li`
  display: inline-block;
  position: relative;
  margin: 0 1%;
`
const MenuBtn = styled(Button)`
 width: 8em
 margin: 0 1% !important;
 background-color: #90caf9 !important;
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
        font-size: 20px;
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
export const CustomModal= ({ isOpen, closeModal, children }) => {
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Paper
        elevation={2}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
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