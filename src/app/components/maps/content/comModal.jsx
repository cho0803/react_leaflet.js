import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, CssBaseline, Divider, Typography, Paper, useTheme, useMediaQuery, Dialog, DialogContent, AppBar, Toolbar, InputBase } from '@mui/material';
import { Menu, ChevronLeft, RestartAlt, Search, Map, Home, List as ListIcon, Add, Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material';

//전역 데이터 받아오기
import { MapsContext, useContext, useState } from ".."

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

// export default () => {
//   const {data,isMarkerListOpen, setIsMarkerListOpen} = useContext(MapsContext)
//   console.log(isMarkerListOpen,"isMarkerListOpen")
//   return (
//     <>
//     <CustomModal isOpen={isMarkerListOpen} closeModal={() => {setIsMarkerListOpen(false);}}>
//        <TableContainer >
//       <Table  sx={{ minWidth: 650 }}>
//         <TableHead>
//           <TableRow >
//             <TableCell >id</TableCell>
//             <TableCell >title</TableCell>
//             <TableCell >content</TableCell>
//             <TableCell >lat</TableCell>
//             <TableCell >lng</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data?.map((item,index) =>(
//             <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={item.id}>
//               <TableCell > {index }  </TableCell> 
//               <TableCell > {item.title}  </TableCell> 
//               <TableCell > {item.content }  </TableCell> 
//               <TableCell > {Number(item.lat).toFixed(2)}  </TableCell> 
//               <TableCell > {Number(item.lng).toFixed(2)}  </TableCell> 
//             </TableRow>
//           ))}

//         </TableBody>
//       </Table>
//     </TableContainer>

//   </CustomModal>

//     </>
//   )
// }
export default ({}) => {
  const { data, isMarkerListOpen, setIsMarkerListOpen } = useContext(MapsContext);
  console.log(data,isMarkerListOpen,"isMarkerListOpen")
  return (
    <Dialog
      open={isMarkerListOpen}
      // handleClose를 직접 타이핑하여 상태 변경
      onClose={() => setIsMarkerListOpen(false)}
      // MUI 브레이크포인트에 따른 반응형 너비 설정
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, md: 2 },
          bgcolor: 'background.paper',
          // 모바일(xs)에선 꽉 차게, PC(md)에선 여백 확보
          width: { xs: '100%', md: '35em' },
          margin: { xs: 0, md: 2 },
          backgroundImage: 'none',
        }
      }}
    >
      <DialogContent sx={{ p: { xs: 1, md: 3 } }}>
        <TableContainer component={Box} sx={{ maxHeight: '70vh' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {['ID', 'Title', 'Content', 'Lat', 'Lng'].map((head) => (
                  <TableCell 
                    key={head} 
                    sx={{ 
                      fontWeight: 'bold', 
                      bgcolor: 'background.paper', // stickyHeader 배경 유지
                      color: 'text.primary',
                      borderBottom: '2px solid',
                      borderColor: 'divider'
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length > 0 ? (
                data.map((item, index) => (
                  <TableRow 
                    key={item.id} 
                    hover 
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{ color: 'text.secondary' }}>{index}</TableCell>
                    <TableCell sx={{ fontWeight: 500, color: 'text.primary' }}>{item.title}</TableCell>
                    <TableCell sx={{ 
                      color: 'text.secondary', 
                      maxWidth: { xs: '80px', md: '200px' }, 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap' 
                    }}>
                      {item.content}
                    </TableCell>
                    <TableCell sx={{ color: 'primary.main', fontWeight: 'medium' }}>
                      {Number(item.lat).toFixed(2)}
                    </TableCell>
                    <TableCell sx={{ color: 'primary.main', fontWeight: 'medium' }}>
                      {Number(item.lng).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 5, color: 'text.disabled' }}>
                    표시할 데이터가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export  function CustomModal ({ isOpen, closeModal, children }) {
    // const {Modal, Paper} = useContext(MapsContext)
  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <Paper
        elevation={2}
        sx={{
          position: "relative",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: '45em',
          // height: '100%',
          overflowY: "auto",
          padding: "calc(3 * 8px)",
        }}
      >
        {children}
      </Paper>
    </Dialog>
  );
}


export function MapModal () {
  const {data,isMapOpen, setIsMapOpen, isModalListOpen, setIsModalListOpen, placeList,setPlace,setPlaceList, isMobile } = useContext(MapsContext)
  return(
      <Dialog 
        open={isMapOpen} 
        onClose={() => { setIsMapOpen(false); setPlaceList([]); }}
        fullScreen={isMobile}
        maxWidth="xs"
        fullWidth
        PaperProps={{
        sx: { 
          borderRadius: isMobile ? 0 : 3, 
          bgcolor: 'background.paper',
          // 데스크톱(isMobile=false)일 때만 위치를 상단으로 고정
          ...( !isMobile && {
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)", // 가로 중앙 정렬 유지 핵심
            margin: 0, // 기본 중앙 배치 여백 제거
          })
        }
        }}
      >
            {isMobile && (
        <AppBar position="static" elevation={0} sx={{ bgcolor: 'primary.main' }}>
          <Toolbar variant="dense">
              <IconButton edge="end" color="inherit" onClick={() => setIsMapOpen(false)}>
                <CloseIcon />
              </IconButton>
          </Toolbar>
        </AppBar>
            )}
        <DialogContent sx={{ p: 2 }}>
          <Paper
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 'none',
              mb: 2
            }}
          >
            <IconButton sx={{ p: '10px' }}><MenuIcon /></IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1, color: 'text.primary' }}
              placeholder="검색"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') MapApi(e, setPlaceList);
              }}
            />
            <IconButton onClick={(e) => {
              const val = document.querySelector(".MuiInputBase-input").value;
              MapApi({ ...e, target: { value: val } }, setPlaceList);
            }}>
              <Search />
            </IconButton>
          </Paper>

          {placeList.length > 0 && (
            <Box sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <List dense>
                {/* 기존의 PlaceList 컴포넌트 호출 */}
                {PlaceList({ placeList, setPlace, setIsMapOpen, setPlaceList })}
              </List>
            </Box>
          )}
        </DialogContent>
      </Dialog>
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

export const PlaceList = function ({placeList, setPlace, setIsMapOpen, setPlaceList}) {
  // console.log(placeList)
  return (
    <>
      {placeList?.map((item, index) => (
  <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            setPlace(item);
            setIsMapOpen(false);
            setPlaceList([]);
          }}
          sx={{
            // 반응형 패딩: 모바일(xs)은 1.5, 테블릿 이상(sm)은 2
            py: { xs: 1.5, sm: 2 }, 
            '&:hover': {
              bgcolor: 'action.hover', // 다크모드에 맞는 호버 효과
            },
          }}
        >
          <ListItemText
            primary={item.display_name}
            primaryTypographyProps={{
              variant: 'body2',
              color: 'text.primary', // 다크모드 시 자동으로 밝은 텍스트 적용
              sx: {
                wordBreak: 'break-all', // 긴 주소 줄바꿈 처리
                lineHeight: 1.4,
              }
            }}
          />
        </ListItemButton>
      </ListItem>
      ))}
    </>
  )
}
