import React, { useState, useMemo } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Avatar, Button, Stack, Chip, Divider, IconButton, ThemeProvider, createTheme, CssBaseline, Snackbar } from '@mui/material';

import GitHub from '@mui/icons-material/GitHub';
import Email from '@mui/icons-material/Email';
import DarkMode from '@mui/icons-material/DarkMode';

import Project from './Project.jsx';
import MapProject from './MapProject.jsx';

//전역 데이터 받아오기
import ProfileProvider,{ProfileContext,} from '../../app/context/PortfolioContext.jsx'
import { useContext } from "react";


export default () =>{
    return(
        <ProfileProvider>
            <Portfolio/>
        </ProfileProvider>
    )
    
};
const Portfolio = () => {
 const { setModalOpen, setViewMode, setMapOpen}  = useContext(ProfileContext)   

 // 1. 다크모드 상태 관리
 const [mode, setMode] = useState('light');

 const [open, setOpen] = useState(false);
 const email = "cho0807s@naver.com";

 // 2. 테마 설정 (모드가 바뀔 때마다 테마 객체 재생성)
 const theme = useMemo(
   () =>
     createTheme({
       palette: {
         mode,
         ...(mode === 'light'
           ? {
               // 라이트 모드 커스텀 색상 (선택사항)
               primary: { main: '#1976d2' },
               background: { default: '#f5f5f5', paper: '#ffffff' },
             }
           : {
               // 다크 모드 커스텀 색상 (선택사항)
               primary: { main: '#90caf9' },
               background: { default: '#121212', paper: '#1e1e1e' },
             }),
       },
     }),
   [mode]
 );

 const toggleColorMode = () => {
   setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
 };

 const skills = ["React", "ES6", "MUI", "Node.js", "Express.js","Git","SVN"];

 return (
   <>
       <ThemeProvider theme={theme}>
       {/* CssBaseline은 다크모드 배경색을 브라우저에 바로 적용해줍니다 */}
       <CssBaseline />
       <Box sx={{ 
           width: '100vw',
       }}>
           
       <Container maxWidth="md" >
           {/* 상단 테마 토글 버튼 */}
           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
           <IconButton onClick={toggleColorMode} color="inherit">
               <DarkMode sx={{ color: '#f1c40f' }} /> 
           </IconButton>
           <Typography sx={{ alignSelf: 'center', ml: 1 }}>
               {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
           </Typography>
           </Box>

           {/* 히어로 섹션 */}
           <Box sx={{ textAlign: 'center', mb: 6 }}>
           {/* <Avatar
               src="https://placeholder.com"
               sx={{ 
               width: 120, height: 120, mx: 'auto', mb: 2, 
               border: `4px solid ${theme.palette.primary.main}` 
               }}
           /> */}
           <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
               안녕하세요, 조현우 개발자입니다
           </Typography>
           <Typography variant="h6" color="text.secondary" gutterBottom>
               성장을 즐기며 사용자 중심의 가치를 만드는 개발자입니다.
           </Typography>
           
           <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
               <Button variant='contained' onClick={() => {
                setModalOpen(true),setViewMode('list')
               } }>수행 프로젝트</Button>
               <Project/>
               <Button variant='contained' onClick={() => {setMapOpen(true)}}>개인 프로젝트</Button>
               <MapProject/>
               <Button variant="outlined" startIcon={<GitHub />}   >Github</Button>
               <Button variant="outlined" startIcon={<Email />} onClick={() =>{
                   navigator.clipboard.writeText(email);
                   setOpen(true); // 복사 성공 시 알림 표시

               }}>Contact Me</Button>

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
                       transform: 'translate(-50%, -90%) !important' 
                   }}
               />
           </Stack>
           </Box>

           <Grid container spacing={4}>
           <Grid container spacing={2}>
               <Grid  size={{ xs: 12, md: 6 }}>
                   <Card variant="outlined" sx={{ width: '25em',p: 3, height: '100%', borderRadius: 3 }}>
                   <Typography variant="h5" sx={{ mb: 2, fontWeight: 'medium' }}>About Me</Typography>
                   <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                       새로운 기술을 배우고 적용하는 과정에서 즐거움을 느낍니다. 
                       MUI와 같은 UI 라이브러리를 활용해 반응형 웹을 구축할 수 있습니다.
                   </Typography>
                   </Card>
                   
               </Grid>

               <Grid size={{ xs: 12, md: 6 }}>
                   <Card variant="outlined" sx={{  width: '25em', p: 3, height: '100%', borderRadius: 3 }}>
                   <Typography variant="h5" sx={{ mb: 2, fontWeight: 'medium' }}>Skills</Typography>
                   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                       {skills.map((skill) => (
                       <Chip key={skill} label={skill} color="primary" variant="filled" />
                       ))}
                   </Box>
                   </Card>
               </Grid>
           
           </Grid>  

           <Grid size={{xs: 12}}>
               <Divider sx={{ my: 4 }} />
               <Typography variant="h5" sx={{ mb: 3, fontWeight: 'medium' }}>개인 프로젝트</Typography>
               <Card elevation={mode === 'dark' ? 8 : 2} sx={{ borderRadius: 4, overflow: 'hidden' }}>
               <Grid container>
                   {/* <Grid size={{ xs: 12, md: 4 }}>
                   <Box 
                       component="img"
                       src="https://placeholder.com"
                       sx={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 200 }}
                   />
                   </Grid> */}
                   <Grid size={{ xs: 12, md: 12 }}>
                   <CardContent>
                       <Typography variant="h5"> Leaflet.js 프로젝트</Typography>
                       <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 , whiteSpace: 'pre-line', wordBreak: 'keep-all'  }}>
                            <Box component="span" sx={{ fontWeight: 'bold' }}>Props Drilling 해결 :</Box> 부모에서 자식의 자식까지 데이터를 전달해야 하는 Props Drilling 문제를 Context API로 해결해 코드 가독성을 높임{"\n"}
                            <Box component="span" sx={{ fontWeight: 'bold' }}>관심사 분리 :</Box> API 호출 로직과 상태 업데이트 로직을 별도의 Provider 컴포넌트로 분리하여 UI 컴포넌트의 복잡도를 낮춤{"\n"}
                            <Box component="span" sx={{ fontWeight: 'bold' }}>최적화 경험 :</Box> Context 값이 바뀔 때마다 하위 컴포넌트가 불필요하게 리렌더링되는 문제를 방지하기 위해 useMemo 활용
                       </Typography>
                   </CardContent>
                   </Grid>
               </Grid>
               </Card>
           </Grid>
           </Grid>

           <Box sx={{ mt: 10, textAlign: 'center', color: 'text.disabled' }}>
           <Typography variant="caption">© 2026 My Portfolio. Built with React & MUI.</Typography>
           </Box>
       </Container>
       </Box>
       </ThemeProvider>
   </>
 );
};
