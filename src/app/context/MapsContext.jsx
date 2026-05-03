import { createContext } from "react";

// 기본값으로는 null을 넣어준다.
export const MapsContext = createContext(null);

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMapEvent, useMap, ZoomControl, } from "react-leaflet";
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

export const MapsProvider = ({ children }) => {

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
  // const { data, isLoading, error, refetch } = useQuery({
  //   queryKey: ["dataMap"],
  //   queryFn: () =>
  //     axios.get("api/test").then(
  //       (res) =>
  //         // res
  //         updateMarkers(res.data)
  //       // console.log(res.data, "usequery"),
  //       // setMarkers(res.data)
  //     ),
  // });
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

  const sidebarEl = document.querySelector(".sidebar");
  const asideEl = document.querySelector(".aside");
  const buttonEl = document.querySelector("button[aria-expanded]");

  const [placeList, setPlaceList] = useState([]);

  const [place, setPlace] = useState();

  const [position, setPosition] = useState();
  
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

  // 하위 컴포넌트에 전달할 값 (상태와 함수들)
  const value={L, position, setPosition, useMap, data, markers, setMarkers, setValue, getValues, reset, register, errors, handleSubmit, refreshFn, placeList, setPlaceList, place, setPlace,  sidebarEl, asideEl, buttonEl,}

  return (
    <MapsContext value={value}>
        { children }    
    </MapsContext>
  );

  function  updateMarkers(data) {
    // markers에 set을 하는 순간 전체적으로 리렌더링
    console.log(data, "데이타");
    // console.log(data, "update");

    setMarkers((markers) => {
      // console.log(markers,data.length !=0);

      if ( getValues("id") ? !Number(getValues("id")) + 0  : getValues("id")  && markers && data.length != 0) {
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

