import { Dialog, DialogTitle, DialogContent, DialogActions, Zoom } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Container, Typography, Box, Grid, Card, CardContent, Avatar, Button, Stack, Chip, Divider, IconButton, ThemeProvider, createTheme, CssBaseline, Snackbar } from '@mui/material';

//전역 데이터 받아오기
import { ProfileContext } from '../../app/context/PortfolioContext'
import { useContext } from "react";

export default () =>{
    const { modalOpen, setModalOpen}  = useContext(ProfileContext) 
    // console.log(modalOpen)
    // if(!modalOpen) return
    return (
        <>
            <Dialog 
                open={modalOpen} 
                onClose={() => setModalOpen(false)}
                TransitionComponent={Zoom} // 나타날 때 애니메이션 효과
                fullWidth
                PaperProps={{ sx: { maxWidth: '40em',borderRadius: 4, overflow: 'hidden', bgcolor: 'background.paper' }}}
            >
                {/* 상단 이미지/배너 영역 (MUI CSS) */}
                <Box sx={{ 
                    height: '4em', 
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <IconButton 
                    onClick={() => setModalOpen(false)}
                    sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}
                    >
                    <CloseIcon />
                    </IconButton>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                    Project View
                    </Typography>
                </Box>

                <DialogContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    반응형 포트폴리오 웹사이트
                    </Typography>
                    <Typography variant="subtitle2" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>
                    2026.04 ~ 현재
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                    이 프로젝트는 사용자 중심의 UI/UX를 목표로 제작되었습니다. 
                    다크모드 테마 시스템과 MUI Grid를 이용한 반응형 레이아웃을 구현한 것이 특징입니다.
                    </Typography>

                    <Typography sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.9rem' }}>주요 기술</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {["React", "MUI", "Vite", "JavaScript"].map((tech) => (
                        <Chip key={tech} label={tech} size="small" variant="outlined" />
                    ))}
                    </Box>
                </DialogContent>

                <DialogContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    반응형 포트폴리오 웹사이트
                    </Typography>
                    <Typography variant="subtitle2" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>
                    2026.04 ~ 현재
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                    이 프로젝트는 사용자 중심의 UI/UX를 목표로 제작되었습니다. 
                    다크모드 테마 시스템과 MUI Grid를 이용한 반응형 레이아웃을 구현한 것이 특징입니다.
                    </Typography>

                    <Typography sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.9rem' }}>주요 기술</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {["React", "MUI", "Vite", "JavaScript"].map((tech) => (
                        <Chip key={tech} label={tech} size="small" variant="outlined" />
                    ))}
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 3, bgcolor: 'action.hover' }}>
                    <Button onClick={() => setModalOpen(false)} 
                    variant='outlined'
                    >닫기</Button>
                    <Button 
                    variant="contained" 
                    // startIcon={<Language />} 
                    href="#" 
                    sx={{ borderRadius: 2, px: 3, fontWeight: 'bold' }}
                    >
                    사이트 방문
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}