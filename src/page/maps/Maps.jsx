import React, { useState } from 'react';
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, CssBaseline, Divider, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { Menu, ChevronLeft, RestartAlt, Search, Map, Home, List as ListIcon, Add } from '@mui/icons-material';
import 'leaflet/dist/leaflet.css';

import { MapsProvider } from '../../app/context/MapsContext';
import { Leaflet } from '../../app/components/maps';

export default () => {
  const theme = useTheme();
  // 모바일(sm 미만) 여부 체크
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(isMobile,"isMobile")
  const [isExpanded, setIsExpanded] = useState(false);

  const centerMenuItems = [
    { text: '탐색', icon: <Search /> },
    { text: '리스트', icon: <ListIcon /> },
    { text: '추가', icon: <Add /> },
    { text: '초기화', icon: <RestartAlt /> },
  ];

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
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1001,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 64,
            px: 2,
            cursor: isMobile ? 'default' : 'pointer',
            justifyContent: { xs: 'center', md: isExpanded ? 'space-between' : 'center' },
          }}
          onClick={() => { if (!isMobile) setIsExpanded(!isExpanded);}}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.1rem',
              display: { xs: 'none', md: isExpanded ? 'block' : 'none' },
              whiteSpace: 'nowrap',
            }}
          >
            Leaflet Map
          </Typography>
          <IconButton 
            disableRipple 
            disabled={isMobile} // 모바일 버튼 비활성화
            sx={{ p: 0, '&:focus': { outline: 'none' }, '&.Mui-disabled': { color: 'inherit', opacity: 1 } }}
          >
            {isExpanded ? <ChevronLeft /> : <Menu />}
          </IconButton>
        </Box>
        <Divider />
        <List>
          {[
            { text: '홈', icon: <Home /> },
            { text: '전체지도', icon: <Map /> },
          ].map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: isExpanded ? 'initial' : 'center',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isExpanded ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'primary.main',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {isExpanded && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}
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
            maxWidth: { md: isExpanded ? '604px' : '780px' },
            display: 'flex',
            justifyContent: 'center',
            zIndex: 1000,
            pointerEvents: 'none',
            transition: (theme) =>
              theme.transitions.create('max-width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }}
        >
          <Paper
            elevation={2}
            sx={{
              display: 'flex',
              pointerEvents: 'auto',
              borderRadius: '24px',
              width: 'auto',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
              border: '1px solid',
              borderColor: 'divider',
              p: 0.3,
            }}
          >
            {centerMenuItems.map((menu) => (
              <ListItemButton
                key={menu.text}
                sx={{
                  py: 0.5,
                  px: isExpanded ? 1.2 : 2, // 사이드바 확장 시 패딩 축소
                  gap: isExpanded ? 0 : 1, // 사이드바 확장 시 간격 제거
                  borderRadius: '20px',
                  justifyContent: 'center',
                  minWidth: isExpanded ? '40px' : '80px',
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    color: 'primary.main',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {React.cloneElement(menu.icon, { sx: { fontSize: 20 } })}
                </ListItemIcon>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '0.7rem',
                    whiteSpace: 'nowrap',
                    color: 'text.primary',
                    // 모바일이거나 사이드바가 열려 지도가 좁아지면 글자 숨김 (반응형 복구)
                    display: { xs: 'none', sm: isExpanded ? 'none' : 'block' },
                  }}
                >
                  {menu.text}
                </Typography>
              </ListItemButton>
            ))}
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
          <MapsProvider>
            <Leaflet />
          </MapsProvider>
        </Box>
      </Box>
    </Box>
  );
}
