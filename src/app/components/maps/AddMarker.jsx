import { Marker, Popup, useMapEvents, uuidv4 } from ".";

  function AddMarker({markers, setMarkers, reset, setValue, getValues, sidebarEl, asideEl, buttonEl, setPlace,}) {
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
        reset();
        setValue("id", uuid),
          setValue("title", ""),
          setValue("content", ""),
          setValue("lat", e.latlng.lat);
        setValue("lng", e.latlng.lng);

        console.log("add");
        // map.setView(e.latlng, 13);
        setPlace(null);
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

                  if (
                    sidebarEl.style.transform == `translateX(0%)` &&
                    asideEl.style.transform == `translateX(0%)`
                  ) { 
                    if (uuid != getValues("id")) {
                      console.log(
                        uuid != getValues("id"),
                        "두개다 오픈",
                        uuid,
                        getValues("id")
                      );
                      setValue("id", uuid);
                      return;
                    }

                    setValue("id", uuid);

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
                    setValue("id", uuid); 
                    asideEl.style.transform = `translateX(0%)`;
                    // buttonEl.querySelector("span").style.transform = `translate(40%,-50%) rotate(-135deg)`;
                    // sidebarEl.style.transform = `translateX(100%)`
                  }

                  if (
                    sidebarEl.style.transform == `translateX(-100%)` &&
                    asideEl.style.transform == `translateX(0%)`
                  ) {
                    if (uuid != getValues("id")) {
                      console.log(
                        uuid != getValues("id"),
                        "마커만클릭",
                        uuid,
                        getValues("id")
                      );
                      setValue("id", uuid);
                      return;
                    }

                    setValue("id", uuid);
                    asideEl.style.transform = `translateX(-100%)`;
                    buttonEl.querySelector(
                      "span"
                    ).style.transform = `translateY(-60%) rotate(45deg)`;
                    buttonEl.setAttribute("aria-controls", "true");
                    return;
                  }

                  // 새로운 마커 추가
                  if (
                    sidebarEl.style.transform == `translateX(-100%)` &&
                    asideEl.style.transform == `translateX(-100%)`
                  ) {
                    setValue("id", uuid);
                    asideEl.style.transform = `translateX(0%)`;
                    console.log(uuid)

                    // buttonEl.querySelector("span").style.transform = `translate(40%,-50%) rotate(-135deg)`;
                    // sidebarEl.style.transform = `translateX(100%)`
                  }

                  // asideEl.style.transform = `translateX(-100%)`;
                  // asideEl.style.transition = `0.4s`

                  buttonEl.querySelector(
                    "span"
                  ).style.transform = `translate(40%,-50%) rotate(-135deg)`;
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

export { AddMarker as default };

