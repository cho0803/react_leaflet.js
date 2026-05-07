import React, { useState, useContext, useEffect, useMemo } from 'react';
import {
  Grid, Card, CardContent, Dialog, DialogContent, DialogActions, Zoom,
  Typography, Box, Button, Chip, IconButton, Stack, Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ProfileContext } from '../../app/context/PortfolioContext';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useTheme } from '@mui/material/styles';

export default () => {
  const {
    currentPage,
    setCurrentPage,
    projOpen,
    setProjOpen,
    viewMode,
    setViewMode,
    projectPages
  } = useContext(ProfileContext);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleClose = () => {
    setProjOpen(false);
    setTimeout(() => {
      setViewMode('list');
    }, 300);
  };

  const handleSelectProject = (index) => {
    setCurrentPage(index);
    setViewMode('detail');
  };

  useEffect(() => {
    let intervalId = "";
    if (projOpen && viewMode === 'detail') {
      intervalId = setInterval(() => {
        setCurrentPage((prev) => {
          return prev === projectPages.length - 1 ? 0 : prev + 1;
        });
      }, 3000);
    }
    return () => clearInterval(intervalId);
  }, [projOpen, viewMode, setCurrentPage, projectPages.length]);

  const currentData = projectPages[currentPage];

  return (
    <Dialog
      // [중요] key={viewMode}를 제거해야 transition 애니메이션이 작동합니다.
      open={projOpen}
      onClose={handleClose}
      fullWidth
      maxWidth={viewMode === 'list' ? 'lg' : 'sm'}
      disableRestoreFocus
      PaperProps={{
        sx: {
          border: theme.palette.mode === 'dark' ? `1px solid ${theme.palette.divider}` : 'none',
          boxShadow: theme.palette.mode === 'dark' ? '0px 8px 32px rgba(0, 0, 0, 0.8)' : theme.shadows[5],
          width: '70em',
          bgcolor: 'background.paper',
          height: viewMode === 'list' ? { xs: '85vh', sm: '650px' } : 'auto',
          minHeight: { xs: '70vh', sm: '500px' },
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'visible',
          // 전환 속도 조절 (1s = 1초)
          // transition: 'all 2s ease-in-out',
        }
      }}
    >
      {/* 상단 헤더 */}
      <Box sx={{
        p: 2,
        background: isDarkMode
          ? 'linear-gradient(45deg, #37474f 30%, #263238 90%)'
          : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative'
      }}>
        {viewMode === 'detail' && (
          <Button
            onClick={() => setViewMode('list')}
            sx={{ color: 'white', position: 'absolute', left: 16, fontWeight: 'bold', fontSize: { xs: '0.9rem', sm: '1.1rem' }, }}
          >
            목록보기
          </Button>
        )}
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '0.9rem', sm: '1.1rem' } }}>
          {viewMode === 'list' ? `프로젝트 목록 ` : '프로젝트 상세'}
        </Typography>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, color: 'white' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* 컨텐츠 영역 */}
      <DialogContent sx={{
        p: { xs: 2, sm: 3 },
        flex: 1,
        overflowY: 'auto',
        bgcolor: isDarkMode ? 'background.default' : '#f8f9fa'
      }}>
        {viewMode === 'list' ? (
          <Grid
            container
            spacing={2}
            sx={{
              width: '100%',
              m: 0,
              justifyContent: 'center',
              alignContent: 'flex-start'
            }}
          >
            {projectPages.map((project, index) => (
              <Grid
                item // size 대신 item으로 표기 (MUI 버전에 따라 다름)
                xs={6} sm={4} md={3}
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: '8px !important'
                }}
              >
                <Card
                  onClick={() => handleSelectProject(index)}
                  sx={{
                    width: { xs: '150px', sm: '200px' },
                    height: { xs: '150px', sm: '180px' },
                    flexShrink: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: isDarkMode ? '0 8px 20px rgba(0,0,0,0.4)' : 4
                    }
                  }}
                >
                  <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    '&:last-child': { pb: { xs: 1.5, sm: 2 } }
                  }}>
                    <Box sx={{ flex: 1, mt: 1, overflow: 'hidden' }}>
                      <Typography
                        sx={{
                          fontWeight: 'bold',
                          color: 'text.primary',
                          fontSize: { xs: '0.8rem', sm: '0.9rem' },
                          lineHeight: 1.3,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          wordBreak: 'keep-all'
                        }}
                      >
                        {project.title}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', mt: 'auto' }}>
                      {project.date}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          /* 상세 보기 모드 */
          <Box sx={{
            bgcolor: 'background.paper',
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
            color: 'text.primary'
          }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
              {currentData.title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              {currentData.date}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            {/* 이후 상세 내용 생략... */}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
