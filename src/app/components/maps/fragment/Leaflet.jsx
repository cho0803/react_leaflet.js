// import  AddMarker from "./AddMarker"

//현대 디렉토리에 index.jsx 파일가져옴
import {AddMarker, NewMarker, MapPosition} from "..";
// import {AddMarker, NewMarker} from "../../components/maps";
import Header from "./Header"
import SideBar from "./SideBar"



import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMapEvent, useMap, ZoomControl } from "react-leaflet";


// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// // 마커 아이콘 경로 설정
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   // iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   // iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   iconUrl: iconUrl,
//   // shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
//   shadowUrl: shadowUrl,
//   // iconSize: [25, 30], // 마커의 가로, 세로 크기
//   // iconAnchor: [32, 64], // 마커 포인트
//   // shadowAnchor: [32, 64], // 그림자 포인트 위치
//   // popupAnchor: [0, -60], // 팝업 위치
// });

import { MapsContext, useContext, useState , useTheme, useMediaQuery} from "..";

export default function Leaflet ({markers, setMarkers, place, setPlace, reset, setValue, getValues, sidebarEl, asideEl, buttonEl, }) {
  
  const {map, setMap} = useContext(MapsContext)
  // console.log(map ? map.getCenter() : null,"map")

  const theme = useTheme();
  // 모바일(sm 미만) 여부 체크
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // console.log(isMobile,"isMobile")
  
  
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
        ref={setMap}             // Leaflet 지도 인스턴스(L.Map)에 직접 접근하여 외부에서 지도를 조작하기 위한 ref 연결
        style={{
          // flex 1 1 auto 적용 해제시
          // 전체화면 설정 
          //  width: "calc(100vw - 66px)",
          // Dialog 기준 css
          width: isMobile ? '22em' : '65em',
          // width: "calc(100vw - 7em)",
          // width: "100vw",
          // height: "100vh", 
          //  height: "100%",
          // 전체화면 설정
          // Dialog 기준 css
          height: isMobile ? '41em' : '100%',
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
        
        {/* <AddMarker markers={markers} setMarkers={setMarkers} reset={reset} setValue={setValue} getValues={getValues} sidebarEl={sidebarEl} asideEl={asideEl} buttonEl={buttonEl} setPlace={setPlace}/> */}
        <AddMarker/>
        {/* <NewMarker L={L} setMarkers={setMarkers} useMap={useMap} setValue={setValue} sidebarEl={sidebarEl} asideEl={asideEl} buttonEl={buttonEl} place={place} setPlace={setPlace} /> */}
        <NewMarker/>
        <MapPosition/>
        <ZoomControl position="topright" />
      </MapContainer>
    </>
  )
};
