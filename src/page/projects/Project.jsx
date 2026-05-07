import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Grid, Card, CardContent, Dialog, DialogContent, DialogActions, Zoom, Typography, Box, Button, Chip, IconButton, Stack, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ProfileContext } from '../../app/context/PortfolioContext';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useTheme } from '@mui/material/styles'; 


export default () => {
    const { currentPage, setCurrentPage, projOpen, setProjOpen, viewMode, setViewMode, projectPages } = useContext(ProfileContext);

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const handleClose = () => {
        setProjOpen(false);
        setTimeout(() => {
            setViewMode('list');
            // setCurrentPage(0);
        }, 300);
    };

    const handleSelectProject = (index) => {
        setCurrentPage(index);
        setViewMode('detail');
    };
    useEffect(() =>{
        var intervalId = ""
         if (projOpen && viewMode === 'detail') {
         intervalId = setInterval(() => {
                setCurrentPage((prev) => {
                    // 마지막 페이지면 다시 0번(처음)으로, 아니면 다음 페이지로
                    return prev === projectPages.length - 1 ? 0 : prev + 1;
                });
            }, 3000); // 5초마다 자동 넘김 (시간 조절 가능)
        }
        return () => clearInterval(intervalId);
    },[projOpen, viewMode, setCurrentPage])
    const currentData = projectPages[currentPage];

    return (
<Dialog 
    // viewMode가 변경시 Dialog를 새로  랜더링
    key={viewMode}
    open={projOpen} 
    onClose={handleClose}
    TransitionComponent={Zoom}
    fullWidth
    // 모드에 따라 최대 너비 유동적 조절
    maxWidth={viewMode === 'list' ? 'lg' : 'sm'} 
    disableRestoreFocus 
    PaperProps={{ 
        sx: { 
             border: theme.palette.mode === 'dark' ? `1px solid ${theme.palette.divider}` : 'none',
            boxShadow: theme.palette.mode === 'dark' ? '0px 8px 32px rgba(0, 0, 0, 0.8)' : theme.shadows[5],
            width: '70em',
            bgcolor: 'background.paper',
            // 높이 설정: auto를 쓰되 최소/최대치를 잡아주어 화면 밖 이탈 방지
            height: viewMode === 'list' ? { xs: '85vh', sm: '650px' } : 'auto', 
            minHeight: { xs: '70vh', sm: '500px' }, 
            maxHeight: '90vh', 
            
            display: 'flex',
            flexDirection: 'column',
            // 창 크기 조절 시 부드럽게 반응하도록 설정
            transition: 'all 3s ease-in-out',
            overflow: 'visible' // 화살표 버튼을 위해 보임 유지
        } 
    }}
>
    {/* 상단 헤더 (고정) */}
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
                sx={{ color: 'white', position: 'absolute', left: 16, fontWeight: 'bold',  fontSize: { xs: '0.9rem', sm: '1.1rem' }, }}
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

    {/* 컨텐츠 영역: flex: 1과 overflowY: 'auto'가 있어야 창 크기 조절 시 크기 유지 */}
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
            // 개별 prop 대신 size 객체로 통합
            size={{ 
                xs: 6,  // 모바일: 한 줄에 2개
                sm: 4,  // 태블릿: 한 줄에 3개
                md: 3   // 데스크탑: 한 줄에 4개 (12 / 3 = 4이므로 3으로 수정)
            }}
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
                    // [핵심] 너비와 높이를 px 단위로 완전히 고정 (반응형 수치 적용)
                    width: { xs: '150px', sm: '200px' }, 
                    height: { xs: '150px', sm: '180px' },
                    
                    flexShrink: 0,
                    flexGrow: 0,

                    cursor: 'pointer', 
                    display: 'flex', 
                    flexDirection: 'column',
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
                    transition: 'transform 3s, box-shadow s', 
                    '&:hover': { 
                        transform: 'translateY(-5px)', 
                        boxShadow: isDarkMode ? '0 8px 20px rgba(0,0,0,0.4)' : 4 
                    }
                }}
            >
                <CardContent sx={{ 
                    // p: { xs: 1.5, sm: 2 }, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100%',
                    '&:last-child': { pb: { xs: 1.5, sm: 2 } }
                }}>
                    <Typography variant="caption" color="primary" sx={{ fontWeight: 'bold', fontSize: '0.7rem' }}>
                        {/* PROJECT {index + 1} */}
                    </Typography>
                    
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
           /* ---  상세 보기 모드 --- */
            <Box sx={{ 
                bgcolor: 'background.paper', 
                p: { xs: 2, sm: 3 }, 
                borderRadius: 2,
                boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
                color: 'text.primary'
            }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>{currentData.title}</Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>{currentData.date}</Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 1.5, color: 'primary.main' }}>역할</Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>{currentData.role}</Typography>

                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 1.5, color: 'primary.main' }}>기술스택</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {currentData.fe.map(t => <Chip key={t} label={t} size="small" color="primary" variant="outlined" />)}
                    {currentData.be.map(t => <Chip key={t} label={t} size="small" color="info" variant="outlined" />)}
                </Box>

                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 1.5, color: 'primary.main' }}>주요업무</Typography>
                <Stack spacing={1}>
                    {currentData.work.map((w, i) => (
                        <Box key={i} sx={{ p: 1.5, bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'grey.50', borderRadius: 2, border: '1px solid', borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#eee' }}>
                            <Typography variant="body2" color="text.secondary">{w}</Typography>
                        </Box>
                    ))}
                </Stack>
            </Box>
        )}

        {/* 상세 모드 화살표 버튼 */}
        {viewMode === 'detail' && (
            <>
                {currentPage > 0 && (
                    <IconButton 
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        sx={{ position: 'absolute', left: { xs: 5, sm: -50 }, top: '50%', transform: 'translateY(-50%)', bgcolor: 'background.paper', boxShadow: 3, zIndex: 10, '&:hover': { bgcolor: isDarkMode ? 'grey.800' : 'grey.100' } }}
                    >
                        <ArrowBackIosNewIcon fontSize="small" />
                    </IconButton>
                )}
                {currentPage < projectPages.length - 1 && (
                    <IconButton 
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        sx={{ position: 'absolute', right: { xs: 5, sm: -50 }, top: '50%', transform: 'translateY(-50%)', bgcolor: 'background.paper', boxShadow: 3, zIndex: 10, '&:hover': { bgcolor: isDarkMode ? 'grey.800' : 'grey.100' } }}
                    >
                        <ArrowForwardIosIcon fontSize="small" />
                    </IconButton>
                )}
            </>
        )}
    </DialogContent>

    <DialogActions sx={{ p: 2, bgcolor: isDarkMode ? 'background.paper' : 'grey.50', flexShrink: 0 }}>
        <Button onClick={handleClose} variant="outlined" color="inherit">닫기</Button>
    </DialogActions>
</Dialog>
    );
}