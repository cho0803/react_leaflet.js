import React, { useState, useMemo, useContext } from 'react';
import { 
  Container, Typography, Box, Grid, Button, Stack, Chip, 
  Divider, IconButton, ThemeProvider, createTheme, CssBaseline, Paper 
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
  const {projectPages, currentPage, setProjOpen ,setMapOpen } = useContext(ProfileContext);
  const [mode, setMode] = useState('dark');
 const project = projectPages[currentPage];

 const [open, setOpen] = useState(false);

 const email = "cho0807s@naver.com";
 const skills = ["React", "ES6", "MUI", "Node.js", "Express.js","Git","SVN"];

  // [변수화] 인덱스 n을 받아 프로젝트를 렌더링하는 컴포넌트
  const ProjectItem = ({ n }) => {
    
    const project = projectPages[n];
    if (!project) return null;

    return (
      
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight="bold" color="text.primary">{project.title}</Typography>
            <Typography variant="body2" color="primary" fontWeight="600">{project.role}</Typography>
          </Box>
          <Typography variant="caption" sx={{ bgcolor: 'action.selected', px: 1, py: 0.5, borderRadius: 1, height: 'fit-content' }}>
            {project.date}
          </Typography>
        </Box>

        <Stack spacing={2.5}>
          <Box>
            <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ display: 'block', mb: 1 }}>TECH STACK</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {project.fe.map(t => <Chip key={t} label={t} size="small" variant="outlined" color="info" sx={{ fontWeight: 600 }} />)}
              <Box component="span" sx={{ color: 'text.secondary', mx: 0.5 }}>/</Box>
              {project.be.map(t => <Chip key={t} label={t} size="small" variant="outlined" color="success" sx={{ fontWeight: 600 }} />)}
            </Stack>
          </Box>
          <Box>
            <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ display: 'block', mb: 1 }}>MAIN WORK</Typography>
            <Stack spacing={0.5}>
              {project.work.map((w, i) => (
                <Typography key={i} variant="body2" color="text.secondary" sx={{ display: 'flex', gap: 1 }}>
                  {"*"} {w}
                </Typography>
              ))}
            </Stack>
          </Box>
        </Stack>


                
      </Box>
    );
  };
  
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: mode === 'light' ? '#1976d2' : '#90caf9' },
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
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
            <IconButton onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} color="inherit">
              {mode === 'dark' ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Box>

          <Grid container spacing={4} sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
            
            {/* [왼쪽 영역] */}
            <Grid item xs={12} md={4.2} sx={{ width: '100%' }}>
              <Stack spacing={3} sx={{ position: { md: 'sticky' }, top: '40px', maxHeight: { md: 'calc(100vh - 100px)' }, overflowY: 'auto', pr: { md: 1 }, '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: '4px' } }}>
                
                <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
                  <Typography variant="h4" fontWeight="900" color="primary" sx={{ mb: 1.5 }}>리액트 개발자 조현우</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>사용자 중심의 가치를 실현하는 프론트엔드 개발자입니다. </Typography>
                  <Divider sx={{ mb: 2.5 }} />
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><PersonIcon fontSize="small" color="primary" /><Typography variant="body2">조현우 </Typography></Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><LocationOnIcon fontSize="small" color="primary" /><Typography variant="body2">서울시 성동구</Typography></Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><Email fontSize="small" color="primary" /><Typography variant="body2">{email}</Typography></Box>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                    <Button fullWidth variant="outlined" size="small" startIcon={<Email />}>Email</Button>
                    <Button fullWidth variant="outlined" size="small" startIcon={<GitHub />}>GitHub</Button>
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
                    <Box onClick={() => setProjOpen(true)} sx={hover}>
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
                  {/* n 변수를 활용한 프로젝트 호출 */}
                  {/* <ProjectItem n={0} /> */}
                  {/* <Divider sx={{ my: 4, borderStyle: 'dashed' }} /> */}
                  
                </Paper>

                <Paper sx={{ p: 4, borderRadius: 3 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}><AccountTreeIcon color="primary" /> 
                  <Box onClick={() => {setMapOpen(true)}} sx={hover}>
                    개인 프로젝트
                  </Box>
                  {/* <Button variant='contained' sx={hover} onClick={() => {setMapOpen(true)}}>개인 프로젝트</Button> */}
                  <MapProject/>
                  </Typography>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">Leaflet.js 프로젝트</Typography>
                    <Typography variant="body2" color="text.secondary">React, Leaflet 활용 위치 기반 서비스</Typography>
                  </Box>
                </Paper>

                <Paper sx={{ p: 4, borderRadius: 3 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}><SchoolIcon color="primary" /> 교육</Typography>
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
