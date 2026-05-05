import React, { useState, useMemo } from 'react';

import { createContext } from "react";

// 기본값으로는 null을 넣어준다.
export const ProfileContext = createContext(null);



export default ({children}) =>{
        
    const [projOpen, setProjOpen] = useState(false);
    const [viewMode, setViewMode] = useState('list'); 
    const [mapOpen,setMapOpen] = useState(false); 
    const [currentPage, setCurrentPage] = useState(1);

    const value = useMemo(() => ({ 
        projOpen, setProjOpen, 
        viewMode, setViewMode,
        mapOpen, setMapOpen, 
        currentPage, setCurrentPage, projectPages
    }), [projOpen,  viewMode, mapOpen, currentPage]);
    
    return (
        <ProfileContext value={value}>
            {children}
        </ProfileContext>
    )
}

const projectPages = [
    {
        title: "현대캐피탈 차세대 전환 프로젝트",
        date: "2026.01 ~ 2026.04",
        role: "개발",
        // tech를 fe와 be로 분리
        fe: ["Idesigner", "IBKS 프레임워크"],
        be: ["Spring Boot", "Gradle", "Oracle"],
        work: [
            "채널계 (Online, Manager, AG, 카드 홈페이지)",
            "계정계 (리테일 금융)",
            "OZ, EIMS "
        ]
    },
    {
        title: "라이나생명 TMUI 플랫폼 전환 프로젝트",
        date: "2025.09 ~ 2025.12",
        role: "개발",
        fe: ["Miplatform", "Exbuilder6"],
        be: ["Ibatis", "DB2"],
        work: [
            "채널계 (보험 상품, 계약관리, 상담, 시스템공통, 권한 )",
        ]
    },
    {
        title: "국립 중앙 과학관 프로젝트",
        date: "2025.01 ~ 2025.07",
        role: "개발 및 운영",
        fe: ["JSP", ],
        be: ["전자정부 프레임워크", "Maven", "Ibatis", "Oracle",],
        work: [
            "권한, 메인페이지,  엑셀, 통계, 계정, 통합예약, 사용자 UI,UX 개선",
        ]
    },
    {
        title: "Naris 프로젝트",
        date: "2025.01 ~ 2025.07",
        role: "개발 및 운영",
        fe: ["JSP",],
        be: ["전자정부 프레임워크", "Maven", "Ibatis", "Oracle", "PostgreSQL"],
        work: [
            "권한, 메인페이지, Elasticsearch 검색 시스템",
        ]
    },
    {
        title: "SK하이이엔지 고도화 프로젝트",
        date: "2023.08 ~ 2024.12",
        role: "개발 및 운영",
        fe: ["Thymeleaf", "Billboard.js", "Handlebars.js", "Inpsect.js"],
        be: ["Spring Boot", "Gradle", "JPA", "Oracle"],
        work: [
            "계정, 배치, 권한, 시스템공통, 협력사 , 보고서",
            "사용자 UI/UX 개선 및 협력사 ERP 시스템 개발",
        ]
    },
    {
        title: "System ic (Wuxi) 프로젝트",
        date: "2024.01 ~ 2024.06",
        role: "보안 로직 개발 및 운영",
        fe: ["FTL 템플릿 엔진"],
        be: ["Spring Boot", "Gradle", "Oracle"],
        work: [
            "보안 취약점 분석 및 대응 로직 개발",
            "OWASP 기준 시큐어 코딩 적용 및 보안 고도화"
        ]
    },
    {
        title: "Skhwaks 전환 프로젝트",
        date: "2023.08 ~ 2024.12",
        role: "컨버징 및 보안 적용",
        fe: ["Mustache 탬플릿 엔진", "Thymeleaf", "Handlebars.js", "Inpsect.js"],
        be: ["Spring", "Maven", "MSSQL", "Spring Boot", "Gradle", "Oracle"],
        work: [
            "기존 레거시 프로젝트 FE,BE 컨버징",
            "FE/BE 영역에 OWASP 기준 시큐어 코딩 적용"
        ]
    },
    {
        title: "Wellness 프로젝트",
        date: "2023.08 ~ 2024.12",
        role: "개발 및 운영",
        fe: ["Thymeleaf", "Billboard.js", "Handlebars.js", "Inpsect.js"],
        be: ["Spring Boot", "Gradle", "JPA", "Oracle"],
        work: [
            "로그인, 권한 관리 및 예약 시스템 개발",
            "상담, 여행상품 관리 및 이메일 "
        ]
    }
];