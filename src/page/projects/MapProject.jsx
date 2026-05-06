import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, CssBaseline, Divider, Typography, Paper, useTheme, useMediaQuery, Dialog, DialogTitle, DialogContent, styled } from '@mui/material';
import { Menu, ChevronLeft, RestartAlt, Search, Map, Home, List as ListIcon, Add, Close as CloseIcon, LocationOn as LocationOnIcon } from '@mui/icons-material';
import { MapsProvider } from '../../app/context/MapsContext';

//전역 데이터 받아오기
import { MapsContext, useContext, useState } from "../../app/components/maps";

import { ProfileContext } from '../../app/context/PortfolioContext'; 
import 'leaflet/dist/leaflet.css';

// import Maps from "../maps/Maps_bak2"
import Maps from "../maps/Maps"

export default () => (
  <MapsProvider>
    <MapProject />
  </MapsProvider>
);

export function MapProject() {
  const { mapOpen, setMapOpen } = useContext(ProfileContext);
   const {setPosition , markers, setMarkers, setValue, getValues, reset, register, errors, handleSubmit, refreshFn, placeList, setPlaceList, place, setPlace,  sidebarEl, asideEl, buttonEl,} = useContext(MapsContext)

  const handleClose = () => {
    setMapOpen(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isExpanded, setIsExpanded] = useState(false);

  const centerMenuItems = [
    { text: '탐색', icon: <Search /> },
    { text: '리스트', icon: <ListIcon /> },
    { text: '추가', icon: <Add /> },
    { text: '초기화', icon: <RestartAlt /> },
  ];

  return (
    <Dialog
      open={mapOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="md" 
      scroll="paper"
      PaperProps={{
        sx: {
          bgcolor: 'background.paper', // 다크모드 자동 대응
          backgroundImage: 'none',     // 다크모드 시 MUI 기본 elevation 효과 제거
          borderRadius: { xs: 0, sm: 3 }, // 모바일은 꽉 차게, 데스크탑은 둥글게
          position: 'relative',
          margin: { xs: 0, sm: 2 },
          border: theme.palette.mode === 'dark' ? `1px solid ${theme.palette.divider}` : 'none',
          boxShadow: theme.palette.mode === 'dark' ? '0px 8px 32px rgba(0, 0, 0, 0.8)' : theme.shadows[5],
          transition: 'width 0.3s ease-in-out', // 너비 변화 시 부드러운 전환
        }
      }}
      // fullScreen={isMobile}
    >
      {/* 헤더 영역 */}
      <DialogTitle sx={{ 
        m: 0, p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: `1px solid ${theme.palette.divider}` 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnIcon color="primary" />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {'Leaflet.js 프로젝트'}
          </Typography>
        </Box>
        <IconButton onClick={handleClose} aria-label="close" sx={{ color: theme.palette.grey[500] }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* 지도 컨텐츠 영역 */}
      <DialogContent sx={{ p: { xs: 1, sm: 3 }, mt: 2 }}>
      <Box
        sx={{
          // 기본 스타일 및 가로 세로 설정
          width: { xs: '25em', md: '100%' },
          height: { xs: '31em', md: 'auto' },
          aspectRatio: { md: '16 / 9' },
          
          // 배경색 (다크모드 분기)
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1e1e1e' : '#f0f0f0',
          
          // 기타 디자인 스타일
          borderRadius: 1,
          overflow: 'hidden',
          position: 'relative',
          
          // 다크모드일 때 지도 색감 조정 필터
          filter: (theme) => theme.palette.mode === 'dark' ? 'grayscale(0.2) contrast(1.1) brightness(0.8)' : 'none',
        }}
      >  
        <Maps />
        {/* 지도 컴포넌트 삽입 */}
      </Box>
        {/* 프로젝트 설명*/}
        <Box sx={{ mt: 3, px: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Leaflet.js 라이브러리 활용 프로젝트
          </Typography>
          <Typography variant="body2" color="text.secondary">
            기술스택 (백엔드: Docker, Spring Boot, express.js / DB: Postgresql  )
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

