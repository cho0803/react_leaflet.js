import React, { useState, useMemo } from 'react';

import { createContext } from "react";

// 기본값으로는 null을 넣어준다.
export const ProfileContext = createContext(null);

export default ({children}) =>{
        
    const [modalOpen, setModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState('list'); 
    const [mapOpen,setMapOpen] = useState(false); 

    const value = useMemo(() => ({ 
        modalOpen, setModalOpen, 
        viewMode, setViewMode,
        mapOpen, setMapOpen 
    }), [modalOpen,  viewMode, mapOpen]);
    
    return (
        <ProfileContext value={value}>
            {children}
        </ProfileContext>
    )
}