
import "leaflet/dist/leaflet.css";
//Leaflet.js api css 적용 

import { Marker, Popup,  uuidv4 ,useState} from "..";

//전역 데이터 받아오기
import { MapsContext, useContext } from "..";

function NewMarker() {
  
  const { L, useMap, place, setMarkers, setValue, sidebarEl, asideEl, buttonEl, setPlace,}  = useContext(MapsContext)

  if (!place) {
    return;
  }
  
  const map = useMap();

  map.setView([place.lat, place.lon], 13);
  console.log(map.getZoom());
  const {lat,lon} = place;
  
var infoPopup = L.popup({closeButton: false}) 
.setLatLng([Number(place.lat) + 0.025, lon])
.setContent('새로운 마커 등록은 마우스 우측버튼을 클릭해주세요!')
.openOn(map);

  return (
    <Marker
      position={[place.lat, place.lon]}
      onContextMenu={(event) => {
        event.preventDefault();
        console.log;
        console.log("마커");
      }}
      eventHandlers={{
        contextmenu: (e) => {
          event.preventDefault();
          if (confirm("마커로 등록 하시겠습니까?")) {
            console
            infoPopup.closePopup();
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
            setPlace(null);

            if (
              sidebarEl.style.transform == `translateX(0%)` &&
              asideEl.style.transform == `translateX(0%)`
            ) {
              asideEl.style.transform = `translateX(-100%)`;
              buttonEl.querySelector(
                "span"
              ).style.transform = `translate(40%,-50%) rotate(-135deg)`;
              buttonEl.setAttribute("aria-controls", "true");
              return;
            }

            if (
              sidebarEl.style.transform == `translateX(0%)` &&
              asideEl.style.transform == `translateX(-100%)`
            ) {
              asideEl.style.transform = `translateX(0%)`;
              // buttonEl.querySelector("span").style.transform = `translate(40%,-50%) rotate(-135deg)`;
              // sidebarEl.style.transform = `translateX(100%)`
            }

            if (
              sidebarEl.style.transform == `translateX(-100%)` &&
              asideEl.style.transform == `translateX(0%)`
            ) {
              asideEl.style.transform = `translateX(-100%)`;
              buttonEl.querySelector(
                "span"
              ).style.transform = `translateY(-60%) rotate(45deg)`;
              buttonEl.setAttribute("aria-controls", "true");
              return;
            }

            if (
              sidebarEl.style.transform == `translateX(-100%)` &&
              asideEl.style.transform == `translateX(-100%)`
            ) {
              asideEl.style.transform = `translateX(0%)`;
              // buttonEl.querySelector("span").style.transform = `translate(40%,-50%) rotate(-135deg)`;
              // sidebarEl.style.transform = `translateX(100%)`
            }

            // asideEl.style.transform = `translateX(-100%)`;
            // asideEl.style.transition = `0.4s`

            buttonEl.querySelector(
              "span"
            ).style.transform = `translate(40%,-50%) rotate(-135deg)`;
            buttonEl.setAttribute("aria-controls", "true");
          }
        },
        mouseover: (e) => {
          // console.log("over", e.target.openPopup);
          e.target.openPopup();
        },
      }}
    >
      <Popup>{place.display_name}</Popup>
    </Marker>
  );
}

// export {NewMarker as default}; 

export default NewMarker;