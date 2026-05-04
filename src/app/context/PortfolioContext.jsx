import React, { useState, useMemo } from 'react';

import { createContext } from "react";

// 기본값으로는 null을 넣어준다.
export const ProfileContext = createContext(null);

export default ({children}) =>{
        
    const [modalOpen, setModalOpen] = useState(false);
    const value={ modalOpen, setModalOpen}
    
    return (
        <ProfileContext value={value}>
            {children}
        </ProfileContext>
    )
}