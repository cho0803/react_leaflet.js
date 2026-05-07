
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, CssBaseline, Divider, Typography, Paper, useTheme, useMediaQuery, Dialog, DialogContent, AppBar, Toolbar, InputBase } from '@mui/material';
import { Menu, ChevronLeft, RestartAlt, Search, Map, Home, List as ListIcon, Add, Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material';
import 'leaflet/dist/leaflet.css';


//전역 데이터 받아오기
import { MapsContext, useContext, useState } from "../../app/components/maps";
import { MapsProvider } from '../../app/context/MapsContext';

import MarkerList,{ MapModal,  } from "../../app/components/maps/content/comModal"
import { Leaflet } from '../../app/components/maps';

export default () =>{
  return(
    <MapsProvider>
      <Maps />
    </MapsProvider>
  )
}

export const Maps = () => {
  const {isMobile ,setIsMapOpen ,isMarkerListOpen, setIsMarkerListOpen, setPosition , markers, setMarkers, setValue, getValues, reset, register, errors, handleSubmit, refreshFn, placeList, setPlaceList, place, setPlace,  sidebarEl, asideEl, buttonEl,} = useContext(MapsContext)

  // const theme = useTheme();
  // 모바일(sm 미만) 여부 체크
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <CssBaseline />

      {/* 1. 사이드바 */}
<Box
  sx={{
    position: 'relative',
    width: { xs: '64px', md: isExpanded ? '240px' : '64px' },
    height: '100%',
    backgroundColor: 'background.paper',
    borderRight: '1px solid',
    borderColor: 'divider',
    transition: (theme) => theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }),
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1001,
    overflowX: 'hidden', // 글자가 넘칠 때 사이드바 밖으로 튀어나오는 것 방지
  }}
>
<Box
  sx={{
    position: 'relative',
    // transition 대상에 width 추가
    width: { xs: '64px', md: isExpanded ? '240px' : '64px' },
    height: '100%',
    backgroundColor: 'background.paper',
    borderRight: '1px solid',
    borderColor: 'divider',
    transition: (theme) => theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1001,
    overflowX: 'hidden', // 확장 시 텍스트 삐져나옴 방지
  }}
>
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      height: 64,
      px: 2,
      cursor: isMobile ? 'default' : 'pointer',
      // justifyContent를 고정하고 내부 요소 간격으로 조절
      justifyContent: 'flex-start', 
    }}
    onClick={() => { if (!isMobile) setIsExpanded(!isExpanded); }}
  >
    {/* 아이콘을 먼저 배치 (위치 고정) */}
    <IconButton 
      disableRipple 
      disabled={isMobile}
      sx={{ p: 0, mr: isExpanded ? 2 : 0, transition: 'margin 0.2s' }}
    >
      {isExpanded ? <ChevronLeft /> : <Menu />}
    </IconButton>

    {/* 텍스트: display를 쓰지 않고 너비와 투명도로만 조절 */}
    <Typography
      variant="h6"
      sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        transition: (theme) => theme.transitions.create(['width', 'opacity']),
        width: isExpanded ? 'auto' : 0,
        opacity: isExpanded ? 1 : 0,
        display: { xs: 'none', md: 'block' }
      }}
    >
      Leaflet Map
    </Typography>
  </Box>
  <Divider />
  <List>
    {/* 추가 버튼 */}
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton sx={{ minHeight: 48, px: 2.5, justifyContent: 'flex-start' }}>
        <ListItemIcon sx={{ minWidth: 0, mr: isExpanded ? 3 : 0, justifyContent: 'center', color: 'primary.main', transition: 'margin 0.2s' }}>
          <Add />
        </ListItemIcon>
        <ListItemText 
          primary="추가" 
          sx={{ 
            m: 0,
            transition: 'all 0.2s',
            opacity: isExpanded ? 1 : 0,
            width: isExpanded ? 'auto' : 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }} 
        />
      </ListItemButton>
    </ListItem>

    {/* 초기화 버튼 */}
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton sx={{ minHeight: 48, px: 2.5, justifyContent: 'flex-start' }}
        onClick={
          async (e)=>{
              if(place && !confirm("이 페이지를 벗어나면 저장되지 않은 정보가 사라집니다.")) return
              
              await setPosition([36.17, 127.83]);
              setPosition('');
              setPlace('')
              // 저장안한 marker 초기화
              setMarkers((prev) => {
              const rest = Object.keys(prev).reduce((acc, key) => {
                if (!isNaN(key)) {
                  acc[key] = prev[key];
                }
                return acc;
              }, {});
                return rest;
              }); 
          }
        }
      >
        <ListItemIcon sx={{ minWidth: 0, mr: isExpanded ? 3 : 0, justifyContent: 'center', color: 'primary.main', transition: 'margin 0.2s' }}>
          <RestartAlt />
        </ListItemIcon>
        <ListItemText 
          primary="초기화" 
          sx={{ 
            m: 0,
            transition: 'all 0.2s',
            opacity: isExpanded ? 1 : 0,
            width: isExpanded ? 'auto' : 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }} 
        />
      </ListItemButton>
    </ListItem>
  </List>
</Box>
  <Divider />
  <List>
    {/* 추가 버튼 */}
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton sx={{ minHeight: 48, px: 2.5, justifyContent: isExpanded ? 'initial' : 'center' }}>
        <ListItemIcon sx={{ minWidth: 0, mr: isExpanded ? 3 : 'auto', justifyContent: 'center', color: 'primary.main' }}>
          <Add />
        </ListItemIcon>
        <ListItemText 
          primary="추가" 
          sx={{ 
            opacity: isExpanded ? 1 : 0, 
            transition: 'opacity 0.2s',
            display: isExpanded ? 'block' : 'none' // 텍스트 영역 깜빡임 방지
          }} 
        />
      </ListItemButton>
    </ListItem>

    {/* 초기화 버튼 */}
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton sx={{ minHeight: 48, px: 2.5, justifyContent: isExpanded ? 'initial' : 'center' }}>
        <ListItemIcon sx={{ minWidth: 0, mr: isExpanded ? 3 : 'auto', justifyContent: 'center', color: 'primary.main' }}>
          <RestartAlt />
        </ListItemIcon>
        <ListItemText 
          primary="초기화" 
          sx={{ 
            opacity: isExpanded ? 1 : 0, 
            transition: 'opacity 0.2s',
            display: isExpanded ? 'block' : 'none' 
          }} 
        />
      </ListItemButton>
    </ListItem>
  </List>
</Box>

      {/* 2. 메인 영역 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 상단 네비게이션: 지도가 좁아지면 자동으로 메뉴 크기를 압축함 */}
  <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 0,
            width: '100%',
            // 사이드바 확장에 따른 가변 최대 너비 적용
            maxWidth: { md: isExpanded ? '604px' : '780px' },
            display: 'flex',
            justifyContent: 'center', // 가로 중앙 정렬 핵심
            zIndex: 1000,
            pointerEvents: 'none',
            transition: (theme) => theme.transitions.create('max-width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }),
          }}
        >
          <Paper
            elevation={2}
            sx={{
              display: 'flex',
              pointerEvents: 'auto',
              borderRadius: '24px',
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
              border: '1px solid',
              borderColor: 'divider',
              p: 0.3,
            }}
          >
            {/* 탐색 버튼 */}
            <ListItemButton
              onClick={(e) => { e.stopPropagation(); setIsMapOpen(true); }}
              sx={{
                py: 0.5,
                px: isExpanded ? 1.2 : 2,
                gap: isExpanded ? 0 : 1,
                borderRadius: '20px',
                justifyContent: 'center',
                minWidth: isExpanded ? '40px' : '80px',
                transition: 'all 0.2s ease',
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, color: 'primary.main', display: 'flex', justifyContent: 'center' }}>
                <Search sx={{ fontSize: 20 }} />
              </ListItemIcon>
              <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.7rem', color: 'text.primary', display: { xs: 'none', sm: isExpanded ? 'none' : 'block' } }}>
                검색
              </Typography>
            </ListItemButton>

            {/* 리스트 버튼 */}
            <ListItemButton
              sx={{
                py: 0.5,
                px: isExpanded ? 1.2 : 2,
                gap: isExpanded ? 0 : 1,
                borderRadius: '20px',
                justifyContent: 'center',
                minWidth: isExpanded ? '40px' : '80px',
                transition: 'all 0.2s ease',
              }}
              onClick={(e)=>{
                e.stopPropagation();
                setIsMarkerListOpen(true);
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, color: 'primary.main', display: 'flex', justifyContent: 'center' }}>
                <ListIcon sx={{ fontSize: 20 }} />
              </ListItemIcon>
              <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.7rem', color: 'text.primary', display: { xs: 'none', sm: isExpanded ? 'none' : 'block' } }}>
                리스트
              </Typography>
            </ListItemButton>
          </Paper>
        </Box>
        {/* 3. 지도 컨테이너 */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            width: { xs: '25em', md: '100%' },
            maxWidth: { md: isExpanded ? '604px' : '780px' },
            height: { xs: '31em', sm: '60vh', md: '100%' },
            maxHeight: { md: '30em' },
            borderRadius: 0,
            transition: (theme) =>
              theme.transitions.create('max-width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }}
        >
            <Leaflet />
        </Box>
      </Box>
            {/* 4. 장소 찾기 Dialog */}
            <MapModal/> <MarkerList/>

    </Box>
  );
}
