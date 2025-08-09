// import  AddMarker from "./AddMarker"

//현대 디렉토리에 index.jsx 파일가져옴
import {AddMarker, NewMarker} from "..";
// import {AddMarker, NewMarker} from "../../components/maps";
import Header from "./Header"
import SideBar from "./SideBar"


import { useForm } from "react-hook-form";

/* eslint-disable */
import React, { useEffect, useState, useMemo, useRef, createElement } from "react";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMapEvent, useMap, ZoomControl } from "react-leaflet";


import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { v4 as uuidv4 } from "uuid";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

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

export default function Leaflet ({markers, setMarkers, place, setPlace, reset, setValue, getValues}) {
  
//  const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     // reset,
//     // setValue,
//     // getValues,
//   } = useForm();

  const [key, setKey] = useState();

  const sidebarEl = document.querySelector(".sidebar");
  const asideEl = document.querySelector(".aside");
  const buttonEl = document.querySelector("button[aria-expanded]");

  // const [placeList, setPlaceList] = useState([]);

  // const [place, setPlace] = useState();
  
  // const [markers, setMarkers] = useState({
  //   1: {
  //     position: {
  //       lat: 37.57,
  //       lng: 127.26,
  //     },
  //     title: "기본",
  //     content: "기본내용",
  //     status: 1,
  //   },
  //   2: {
  //     position: {
  //       lat: 38.22,
  //       lng: 126.58,
  //     },
  //     title: "테스트",
  //     content: "테스트 내용",
  //     status: 1,
  //   },
  // });
  
  
  return (
    <>
    {/* <Header sidebarEl={sidebarEl} asideEl={asideEl} buttonEl={buttonEl}/> */}
    {/* <SideBar markers={markers} setMarkers={setMarkers} reset={reset} setValue={setValue} getValues={getValues} handleSubmit={handleSubmit}
            register={register} errors={errors}
            setPlace={setPlace} placeList={placeList} setPlaceList={setPlaceList} sidebarEl={sidebarEl} asideEl={asideEl} buttonEl={buttonEl} 
      /> */}
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
          width: "calc(100vw - 66px)",
          // width: "calc(100vw - 7em)",
          // width: "100vw",
          // height: "100vh", 
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
        </Marker>
        <AddMarker markers={markers} setMarkers={setMarkers} useform={useForm} reset={reset} setValue={setValue} getValues={getValues} sidebarEl={sidebarEl} asideEl={asideEl} buttonEl={buttonEl} setPlace={setPlace}/>
        <NewMarker L={L}    setMarkers={setMarkers} useMap={useMap} setValue={setValue} sidebarEl={sidebarEl} asideEl={asideEl} buttonEl={buttonEl} place={place} setPlace={setPlace} />
        <ZoomControl position="topright" />
      </MapContainer>
    </>
  )
};
