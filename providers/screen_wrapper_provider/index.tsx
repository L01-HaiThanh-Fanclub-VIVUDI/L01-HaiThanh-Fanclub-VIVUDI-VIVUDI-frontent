/*****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                     *
 *****************************************************************************
 *  File        : Cung cấp context và provider cho ScreenWrapper             *
 *  Author      : Minh Nhat                                                  *
 *  Created     : 02/06/2025                                                 *
 *  Updated by  :                                                            *
 *  Modified    :                                                            *
\*****************************************************************************/

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
    const [config, setConfig] = useState<ScreenWrapperConfig>({});

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