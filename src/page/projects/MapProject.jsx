import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import React, { useState, useContext } from 'react';
import { ProfileContext } from '../../app/context/PortfolioContext';

// 지도 영역을 위한 Styled Component (다크모드 시 필터 적용 가능)
const MapContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f0f0f0',
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  position: 'relative',
  // 반응형 높이 설정 (모바일은 1:1에 가깝게, 데스크탑은 16:9 비율)
  aspectRatio: '16 / 9',
  [theme.breakpoints.down('sm')]: {
    aspectRatio: '1 / 1',
  },
  // 다크모드일 때 지도 색감을 어둡게 조정하고 싶다면 필터 추가
  filter: theme.palette.mode === 'dark' ? 'grayscale(0.2) contrast(1.1) brightness(0.8)' : 'none',
}));


import Maps from "../maps/Maps.jsx";

export default  ({  locationName }) => {
     const { mapOpen, setMapOpen } = useContext(ProfileContext);

 
    const handleClose = () => {
        setMapOpen(false);
    };

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={mapOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="md" // 지도는 넓게 보는 것이 좋으므로 md 권장
      scroll="paper"
      PaperProps={{
        sx: {
          bgcolor: 'background.paper', // 다크모드 자동 대응
          backgroundImage: 'none',     // 다크모드 시 MUI 기본 elevation 효과 제거
          borderRadius: { xs: 0, sm: 3 }, // 모바일은 꽉 차게, 데스크탑은 둥글게
          position: 'relative',
          margin: { xs: 0, sm: 2 },      // 모바일 여백 제거
          border: theme.palette.mode === 'dark' ? `1px solid ${theme.palette.divider}` : 'none',
          boxShadow: theme.palette.mode === 'dark' ? '0px 8px 32px rgba(0, 0, 0, 0.8)' : theme.shadows[5],
        }
      }}
      fullScreen={isMobile} // 모바일에서는 전체화면으로 전환하여 사용성 향상
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
            {locationName || 'Leaflet.js 프로젝트'}
          </Typography>
        </Box>
        <IconButton onClick={handleClose} aria-label="close" sx={{ color: theme.palette.grey[500] }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* 지도 컨텐츠 영역 */}
      <DialogContent sx={{ p: { xs: 1, sm: 3 }, mt: 2 }}>
        <MapContainer>
            <Maps/>
          {/* <Box 
            id="map" 
            sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Typography variant="body2" color="text.secondary">
               지도를 불러오는 중입니다...
            </Typography>
          </Box> */}
        </MapContainer>

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

