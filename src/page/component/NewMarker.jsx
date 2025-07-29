
  import { Marker, Popup,  uuidv4 } from "./index.js";
  
  function NewMarker({ newMarker, useMap, setMarkers, setValue, sidebarEl, asideEl, buttonEl, setPlace,}) {

    if (!newMarker) {
      return;
    }
    
    const map = useMap();

    map.setView([newMarker.lat, newMarker.lon], 13);
    console.log(map.getZoom());

    return (
      <Marker
        position={[newMarker.lat, newMarker.lon]}
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
        }}
      >
        <Popup>{newMarker.display_name}</Popup>
      </Marker>
    );
  }

export {NewMarker as default}