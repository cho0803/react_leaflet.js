import axios from "axios";

import { Marker, Popup, useMap, uuidv4, styled, } from "..";

import { Box, Button, RefreshIcon, Menu, MenuItem } from "../index.js";

import {Modal, Paper} from "../../maps"
//전역 데이터 받아오기
import { MapsContext, useContext, useState } from "..";

import {AppBar,Toolbar, IconButton, InputBase, Typography, List, } from '..';

// import {Menu as MenuIcon, Search as SearchIcon, Directions as DirectionsIcon  } from '@mui/icons-material';
// 속도 저하로 import 방식 변경 이유 확인필요
import {MenuIcon} from '..';
import {SearchIcon}  from'..';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon  from'@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';

import CustomModal from "../CustomModal.jsx";
import MapsList from "../MapsList.jsx"

export default function Sidebar(){
  const {setPosition , markers, setMarkers, setValue, getValues, reset, register, errors, handleSubmit, refreshFn, placeList, setPlaceList, setPlace,  sidebarEl, asideEl, buttonEl,} = useContext(MapsContext)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalListOpen, setIsModalListOpen] = useState(false);

  return (
            <div
              className="sidebar"
              style={{
                /*transform: "translateX(-100%)", display: 'flex', */
                width: "13em",
                boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 8px 0px",
                display: "flex",
                transform: "translateX(-100%)",
                transition: "0.4s",
                position: "absolute",
                top: "0",
                bottom: "0",
                zIndex: 1,
              }}
            >
              <div
                className="search"
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
                  boxShadow: "inherit",
                  // border: "1px solid rgb(217, 217, 217)",
                  textAlign: "center",
                }}
              >
                <div style={{ padding: "15px 0px" }}>
                  <input
                    type="text"
                    placeholder="장소 검색"
                    style={{ height: "32px" }}
                    // value="북한산"
                    onKeyDown={(e) => {
                      if (e.keyCode == 13) {
                        MapApi(e,setPlaceList)
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
                  {PlaceList({placeList, setPlace})}
                </div>
              </div>
              <aside
                className="aside"
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
                  boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 8px 0px",
                  // border: "1px solid rgb(217, 217, 217)",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <div style={{ flexBasis: "100%" }}>
                  {" "}
                  <div style={{ padding: "15px 0px" }}>
                    <input
                      type="text"
                      style={{ ...input }}
                      placeholder="제목"
                      {...register("title", { required: "제목을 입력해주세요" })}
                      onKeyUp={() => {
                        // markers[getValues("id")].title = getValues("title");
                        // markers[getValues("id")].content = getValues("content");
                        if (!markers[getValues("id")]) {
                          alert("지도에서 좌표를 클릭해주세요");
                          return;
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
                    style={{ ...input, height: "60px" }}
                    placeholder="내용"
                    {...register("content", { required: "내용을 입력해주세요" })}
                    onKeyUp={(e) => {
                      // var keycode = e.keyCode;
                      // console.log(e.target.value);

                      // markers[getValues("id")].title = getValues("title");
                      // markers[getValues("id")].content = getValues("content");
                      if (!markers[getValues("id")]) {
                        alert("지도에서 좌표를 클릭해주세요");
                        return;
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
                  />{" "}
                  <span>{errors.content?.message}</span>
                  <br />
                  <input
                    type="text"
                    hidden
                    placeholder="id"
                    {...register("id")}
                  />
                  <input
                    type="text"
                    hidden
                    placeholder="lat"
                    {...register("lat")}
                  />
                  <input
                    type="text"
                    hidden
                    placeholder="lng"
                    {...register("lng")}
                  />
                  <div style={{ width: "7em", float: "right" }}>
                    {" "}
                    <button
                      className="btn btn-primary"
                      // style={button}
                      style={{
                        ...button,
                        borderRadius: 0,
                        padding: "1px 6px",
                        background: "#f0f0f0",
                        border: "1px solid rgb(0, 0, 0)",
                      }}
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

                                if (!Number(param.id) + 0) {
                                  // console.log(data, getValues("id"), "들어옴1");
                                  setMarkers((prev) => {
                                    const { [param.id]: $, ...rest } = prev;
                                    console.log(prev, param.id, rest, "rest");
                                    return rest;
                                  });

                                  refreshFn();
                                }

                                if (!Number(param.id) + 0) {
                                  // console.log(data, "데이타"); 
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
                      style={{
                        ...button,
                        borderRadius: 0,
                        padding: "1px 6px",
                        background: "#f0f0f0",
                        border: "1px solid rgb(0, 0, 0)",
                      }}
                      onClick={ async () => {
                        // console.log("삭제", getValues("id"));
                        if (Number(getValues("id")) + 0) {
                          // console.log("값있음");
                          axios.delete(`api/test/${getValues("id")}`)
                           
                           await setMarkers((prev) => {
                              const { [getValues("id")]: _, ...rest } = prev;
                            // console.log(rest, "rest");

                              return rest;
                            });
                            await refreshFn();
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
                    backgroundColor: "inherit",
                    border: "none",
                    outline: "none",
                    borderRadius: "0px 9px 9px 0px",
                    border: "1px solid rgba(0, 0, 0, 0.15)",
                    zIndex: "4",
                  }}
                  onClick={() => {
                    if (!buttonEl.getAttribute("aria-controls")) return;

                    // buttonEl.querySelector("span").style.transform = `translate(40%,-50%) rotate(-135deg)`;

                    if (
                      sidebarEl.style.transform == `translateX(-100%)` &&
                      asideEl.style.transform == `translateX(0%)`
                    ) {
                      asideEl.style.transform = `translateX(-100%)`;
                      buttonEl.querySelector(
                        "span"
                      ).style.transform = `translateY(-60%) rotate(45deg)`;
                      return;
                    }

                    if (
                      (sidebarEl.style.transform == `translateX(0%)` &&
                        asideEl.style.transform == `translateX(0%)`) ||
                      asideEl.style.transform == `translateX(-100%)`
                    ) {
                      // sidebarEl.style.transform = `translateX(0%)`
                      sidebarEl.style.transform = "translateX(-100%)";
                      asideEl.style.transform = "translateX(-100%)";
                      buttonEl.querySelector(
                        "span"
                      ).style.transform = `translateY(-60%) rotate(45deg)`;
                      return;
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
                    setIsModalListOpen(true);
                    }}
                  >
                    마커 리스트
                  </MenuBtn>
                </Li>
                <Li>
                  <MenuBtn
                    variant='contained'
                    // aria-expanded={'true'}
                    onClick={async(event) =>{
                      await setPosition([36.17, 127.83]);
                      setPosition('');
                    }}
                  >
                    <RefreshIcon />
                  </MenuBtn>
                </Li>
              </Ul>  
            </Nav>
            <CustomModal isOpen={isModalOpen} closeModal={() => {setIsModalOpen(false); setPlaceList([]) }}>
              <AppBar position="static" width="100%">
                <Toolbar>
                  {/*  display : flex 적용 되어 있으므로 justifyContent : 'center' css 추가  */}
                  <Box sx={{ width: '5em', textAlign: 'center', justifyContent : 'center'}}>장소 찾기</Box>
                </Toolbar>
              </AppBar>
              <Paper
                // component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '29.5em' }}
              >
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Leflet Maps"
                  inputProps={{ 'aria-label': 'search google maps' }}
                  onKeyDown={ (e) => {
                    if (e.keyCode == 13) {
                      MapApi(e,setPlaceList)
                    }
                  }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon  onClick={(e) =>{
                      e.target.value = document.querySelector(".MuiInputBase-input").value
                    MapApi(e,setPlaceList)
                  }}/>
                </IconButton>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                </Typography>
              
              </Paper>
              {placeList.length > 0 &&  <Box sx={{  maxWidth: 752 ,textAlign: 'center' }}>
                  <List dense={false}>
                    {PlaceList({placeList, setPlace,setIsModalOpen ,setPlaceList})}
                  </List>
                      
              </Box>}
            </CustomModal>
             <MapsList isModalListOpen = {isModalListOpen} setIsModalListOpen={setIsModalListOpen}/>

              </aside>
            </div>
  )
}

export const MapApi = function(e ,setPlaceList) {
  console.log(e.target.value);
  axios.get("https://nominatim.openstreetmap.org/search", {
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
      setPlaceList(
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

export const PlaceList = function ({placeList, setPlace, setIsModalOpen, setPlaceList}) {
  // console.log(placeList)
  return (
    <>
      {placeList?.map((item, index) => (
        <ul key={index} style={ul}>
          <li style={li}>
            <button
              style={button}
              data-lat={item.lat}
              data-lon={item.lon}
              onClick={() => {
                setPlace(item);
                setIsModalOpen(false);
                setPlaceList([])
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
    </>
  )
}
const h1 = {
  listStyle: "none",
  /* margin: 0; */
  padding: 0,
  borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
  fontSize: "2em",

  lineHeight: 1,
};

const button = {
  padding: 0,
  margin: 0,

  border: "none",
  outline: "none",

  //  backgroundColor: 'transparent',

  /* 마우스 올렸을 때 마우스 스타일 지정 -> 손모양 */
  cursor: "pointer",
  backgroundColor: "inherit",
  fontSize: "0.8333em",
};

const ul = {
  padding: 0,
};

const li = {
  listStyle: "none",
  // padding: 0,
};

const input = {
  width: "13em",
  height: "32px",
  // padding: 0,
};

const Nav = styled.div`
  width: calc(100vw - 4em - 2.8em);
  height: 2em;
  position: absolute;
  top: 0;
  bottom: 0;
  // left: 0;
  z-index: 999;
  position: absolute;
  left: 100%;
`;

const Ul = styled.ul`
  text-align: center;
  display: ruby-text;
`

const Li = styled.li`
  display: inline-block;
  position: relative;
  margin: 0 1%;
`;
const MenuBtn = styled(Button)`
 width: 8em
 margin: 0 1% !important;
 background-color: #90caf9 !important;
 &:hover {
  background-color: #ce93d8 !important;
  }
`;

const SearchInput = styled(InputBase)`
color: inherit;
& .MuiInputBase-input {
  padding : 1, 1, 0 !important;
}
`
