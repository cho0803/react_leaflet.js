import React, { useState, useMemo, useContext, useRef } from 'react';
import { 
  Container, Typography, Box, Grid, Button, Stack, Chip, 
  Divider, IconButton, ThemeProvider, createTheme, CssBaseline, Paper, Snackbar 
} from '@mui/material';

import GitHub from '@mui/icons-material/GitHub';
import Email from '@mui/icons-material/Email';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import SchoolIcon from '@mui/icons-material/School';
import VerifiedIcon from '@mui/icons-material/Verified';
import CodeIcon from '@mui/icons-material/Code';
import StarsIcon from '@mui/icons-material/Stars';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';

import ProfileProvider, { ProfileContext } from '../../app/context/PortfolioContext';

import Project from './Project';
import MapProject from './MapProject';

const Portfolio = () => {
  const {projectPages, currentPage, projOpen, setProjOpen ,setMapOpen } = useContext(ProfileContext);
  const [mode, setMode] = useState('dark');

  const projectRef = useRef(null);
  
  projectRef.current  =  projOpen ?  projectRef.current : currentPage

  const project = projOpen ? projectPages[projectRef.current]: projectPages[currentPage];
 
  const [open, setOpen] = useState(false);

  const email = "cho0807s@naver.com";
  const skills = ["React", "ES6", "MUI", "Node.js", "Express.js","Git","SVN"];

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: mode === 'light' ? '#1976d2' : '#60a5fa' },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#0a1929',
        paper: mode === 'light' ? '#ffffff' : '#132f4c',
      },
    },
    typography: { fontFamily: '"Pretendard", "Roboto", sans-serif' },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* 전전 코드 기준 최상단 Box CSS 적용 */}
      <Box sx={{ 
        width: '100%',
        minWidth: '100vw',
        minHeight: '100vh', 
        bgcolor: 'background.default',
        p: { xs: 2, sm: 3, md: 5 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}>
        
        <Container maxWidth="lg" disableGutters sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', mb: 4, gap: 1 }}>
          <Box sx={{ flexGrow: 1, p: 2, borderRadius: '8px', backgroundColor: 'rgb(0 141 255 / 10%)', display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: '16px', fontWeight: 600, color: (theme) => theme.palette.mode === 'dark' ? 'primary.main' : '#0d47a1' }}>
          * 수행 프로젝트를 클릭하시면 <Box component="br" sx={{ display: { xs: 'block', sm: 'none' } }} /> 프로젝트 변경 할 수 있습니다.<br />
          * 개인 프로젝트를 클릭하시면 <Box component="br" sx={{ display: { xs: 'block', sm: 'none' } }} /> 개인 프로젝트 확인 할 수 있습니다.
        </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ flexShrink: 0 }} onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} color="inherit">
              {mode === 'dark' ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Box>
        </Box>

          <Grid container spacing={4} sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
            
            {/* [왼쪽 영역] */}
            <Grid item xs={12} md={4.2} sx={{ width: '100%' }}>
              <Stack spacing={3} sx={{ position: { md: 'sticky' }, top: '40px', maxHeight: { md: 'calc(100vh - 100px)' }, overflowY: 'auto', pr: { md: 1 }, '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: '4px' } }}>
                
                <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
                  <Typography variant="h4" fontWeight="900" color="primary" sx={{ mb: 1.5 }}>리액트 포트폴리오</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>사용자 중심의 가치를 실현하는 프론트엔드 개발자입니다. </Typography>
                  <Divider sx={{ mb: 2.5 }} />
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><PersonIcon fontSize="small" color="primary" /><Typography variant="body2">조현우 </Typography></Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><LocationOnIcon fontSize="small" color="primary" /><Typography variant="body2">서울시 성동구 상왕십리동</Typography></Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><Email fontSize="small" color="primary" /><Typography variant="body2">{email}</Typography></Box>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                    <Button fullWidth variant="outlined" size="small" startIcon={<Email />}
                      onClick={() =>{
                        navigator.clipboard.writeText(email);
                        setOpen(true); // 복사 성공 시 알림 표시
                      }} >Email
                    </Button>
                    {/* 복사 완료 알림 메시지 */}
                    <Snackbar
                      open={open}
                      autoHideDuration={2000}
                      onClose={() => setOpen(false)}
                      message="이메일 주소가 복사되었습니다!"
                      anchorOrigin={{ vertical: 'middle', horizontal: 'center' }}
                      sx={{ 
                        top: '50% !important', 
                        left: '50% !important', 
                        transform: 'translate(-50%, -90%) !important',
                        '& .MuiSnackbarContent-root': {
                          // 배경색: 더 밝은 네이비 블루로 조정하여 답답함을 해소
                          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1a3a5a' : '#f0f7ff',
                          // 글자색: 가장 밝은 스카이 블루(#e3f2fd)와 진한 파랑으로 대비 극대화
                          color: (theme) => theme.palette.mode === 'dark' ? '#e3f2fd' : '#0d47a1',
                          // 테두리: 더 선명한 스카이 블루 빛으로 강조
                          border: (theme) => theme.palette.mode === 'dark' ? '1px solid #90caf9' : '1px solid #1976d2',
                          fontWeight: 'bold',
                          borderRadius: '24px',
                          fontSize: '0.85rem',
                          justifyContent: 'center',
                          // 광채 효과 추가 (Glow)
                          boxShadow: (theme) => theme.palette.mode === 'dark' 
                            ? '0 0 15px rgba(144, 202, 249, 0.4)' 
                            : '0 4px 12px rgba(25, 118, 210, 0.2)',
                          minWidth: '220px'
                        }
                      }}
                    />
                    <Button component="a" href="https://github.com/cho0803/react_leaflet.js" fullWidth variant="outlined" size="small" startIcon={<GitHub />}>GitHub</Button>
                  </Stack>
                </Paper>

                <Paper sx={{ p: 4, borderRadius: 3 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}><CodeIcon color="primary" /> 전문 기술 스택</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skills.map(s => <Chip key={s} label={s} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />)}
                  </Box>
                </Paper>

                <Paper sx={{ p: 4, borderRadius: 3 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}><VerifiedIcon color="primary" /> 자격증</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    <Box sx={{ flex: '1 1 calc(50% - 12px)', minWidth: '130px', p: 1.5, bgcolor: 'action.hover', borderRadius: 2, borderLeft: '4px solid', borderColor: 'primary.main' }}>
                      <Typography variant="body2" fontWeight="bold">정보처리기사</Typography>
                    </Box>
                    <Box sx={{ flex: '1 1 calc(50% - 12px)', minWidth: '130px', p: 1.5, bgcolor: 'action.hover', borderRadius: 2, borderLeft: '4px solid', borderColor: 'primary.main' }}>
                      <Typography variant="body2" fontWeight="bold">SQLD</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Stack>
            </Grid>

            {/* [오른쪽 영역] */}
            <Grid item xs={12} md={7.8} sx={{ width: '100%' }}>
              <Stack spacing={3}>
                
                <Paper sx={{ p: 4, borderRadius: 3 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
                    <StarsIcon color="primary" /> 
                    <Box sx={{...blink, ...hover}} onClick={() => setProjOpen(true)}>
                      수행 프로젝트
                    </Box>
                    <Project/>
                  </Typography>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">{project.title}</Typography>
                      <Typography variant="caption" color="primary" fontWeight="bold">{project.date}</Typography>
                    </Box>
                    <Stack variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                      {project.work.map((w, i) => (
                        <Typography key={i} variant="body2" color="text.secondary" sx={{ display: 'flex', gap: 1 }}>
                          {"*"} {w}
                        </Typography>
                      ))}
                    </Stack>
                    {project.fe.map(t => <Chip key={t} label={t} size="small" variant="outlined" color="info" sx={{ fontWeight: 600 }} />)}
                    <Box component="span" sx={{ color: 'text.secondary', mx: 0.5 }}>/</Box>
                    {project.be.map(t => <Chip key={t} label={t} size="small" variant="outlined" color="success" sx={{ fontWeight: 600 }} />)}
                  </Box>
                </Paper>

                <Paper sx={{ p: 4, borderRadius: 3 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}><AccountTreeIcon color="primary" /> 
                    <Box  sx={{...blink, ...hover}} onClick={() => {setMapOpen(true)}}>
                      개인 프로젝트
                    </Box>
                    <MapProject/>
                  </Typography>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">Leaflet.js 프로젝트</Typography>
                    <Typography variant="body2" color="text.secondary">React, Leaflet.js 활용 위치 기반 서비스</Typography>
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mt: 1.5 }}>
                        {["React", "MUI CSS"].map((t, i) => <Chip key={`f-${i}`} label={t} size="small" variant="outlined" color="info" sx={{ fontWeight: 600 }} />)}
                        <Box component="span" sx={{ color: 'text.secondary', mx: 0.5 }}>/</Box>
                        {["Springboot", "Express.js", "Docker", "PostgreSQL"].map((t, i) => <Chip key={`b-${i}`} label={t} size="small" variant="outlined" color="success" sx={{ fontWeight: 600 }} />)}
                      </Box>
                    </Box>
                  </Box>
                </Paper>

                <Paper sx={{ p: 4, borderRadius: 3 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}><SchoolIcon color="primary" /> 학력</Typography>
                  <Typography variant="subtitle1" fontWeight="bold">오산대학교 - 컴퓨터공학 전공</Typography>
                  <Typography variant="body2" color="text.secondary">2015.03 ~ 2020.02 졸업</Typography>
                </Paper>

              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default () => (
  <ProfileProvider>
    <Portfolio />
  </ProfileProvider>
);

const hover = { cursor: 'pointer', px: 1.5, py: 0.5, borderRadius: 1, border: '1px solid transparent', transition: '0.2s', '&:hover': { bgcolor: 'rgba(144, 202, 249, 0.08)', border: '1px solid #90caf9', color: '#90caf9' }}

const blink = { fontSize: '20px', fontWeight: 800, color: (theme) => theme.palette.mode === 'dark' ? '#90caf9' : '#0d47a1', '@keyframes blink': { '0%': { filter: 'brightness(1)', opacity: (theme) => theme.palette.mode === 'dark' ? 0.4 : 0.6 }, '100%': { filter: 'brightness(1.5)', opacity: 1 } }, animation: 'blink 1s infinite alternate ease-in-out' };
