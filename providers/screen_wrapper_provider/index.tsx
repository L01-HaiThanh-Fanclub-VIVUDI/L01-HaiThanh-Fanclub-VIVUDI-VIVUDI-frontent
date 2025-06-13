/*****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                     *
 *****************************************************************************
 *  File        : Cung cấp context và provider cho ScreenWrapper             *
 *  Author      : Minh Nhat                                                  *
 *  Created     : 02/06/2025                                                 *
 *  Updated by  :                                                            *
 *  Modified    :                                                            *
\*****************************************************************************/

import { PAGE_ID } from '@/settings/navigation/page';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { ScreenWrapperConfig, ScreenWrapperContextValue } from './types';

/******************************************************************************
 * Context lưu trữ cấu hình ScreenWrapper và cung cấp hook sử dụng.           *
 ******************************************************************************/
const defaultContext: ScreenWrapperContextValue = {
    config: {},
    setConfig: () => { },
};
const ScreenWrapperContext = createContext<ScreenWrapperContextValue>(defaultContext);

/******************************************************************************
 * Provider cho context ScreenWrapper, bọc quanh ứng dụng.                    *
 * Sử dụng useState để lưu cấu hình hiện tại.                                 *
 ******************************************************************************/
export const ScreenWrapperProvider = ({ children }: { children: ReactNode }) => {
    // Sử dụng map PAGE_ID với config tương ứng
    const [configs, setConfigs] = useState<Record<PAGE_ID, ScreenWrapperConfig>>({} as Record<PAGE_ID, ScreenWrapperConfig>);
    const [screenId, setScreenId] = useState<PAGE_ID>(PAGE_ID.GENERAL);

    const config = configs[screenId] || {};

    const setConfig = (newConfig: ScreenWrapperConfig, screenId: PAGE_ID) => {
        setConfigs(prev => ({
            ...prev,
            [screenId]: {
                ...prev[screenId],
                ...newConfig,
            },
        }));
        setScreenId(screenId);
    };

    return (
        <ScreenWrapperContext.Provider value={{ config, setConfig }}>
            {children}
        </ScreenWrapperContext.Provider>
    );
};

/******************************************************************************
 * Hook tiện ích để sử dụng context ScreenWrapper trong component.            *
 ******************************************************************************/
export const useScreenWrapper = (): ScreenWrapperContextValue => {
    const context = useContext(ScreenWrapperContext);

    if (!context || typeof context.setConfig !== 'function') {
        throw new Error('useScreenWrapper must be used within ScreenWrapperProvider');
    };

    return context;
};