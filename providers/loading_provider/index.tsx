/******************************************************************************
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : loading_provider/index.tsx                                  *
 *  Purpose     : Cung cấp context và provider cho global loading             *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 14/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
 ******************************************************************************/

import LoadingScreen from '@/components/ui/loading_screen';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { LoadingContextType } from './types';

/******************************************************************************
 * Context lưu trạng thái loading toàn cục và cung cấp hook sử dụng.          *
 ******************************************************************************/
const defaultContext: LoadingContextType = {
    show: () => { },
    hide: () => { },
    isLoading: false,
};
const LoadingContext = createContext<LoadingContextType>(defaultContext);

/******************************************************************************
 * Provider cho context Loading, bọc quanh ứng dụng.                          *
 * Sử dụng useState để lưu trạng thái loading hiện tại.                       *
 ******************************************************************************/
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const show = () => setIsLoading(true);
    const hide = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ show, hide, isLoading }}>
            {children}
            {isLoading && <LoadingScreen />}
        </LoadingContext.Provider>
    );
};

/******************************************************************************
 * Hook tiện ích để sử dụng context Loading trong component.                  *
 ******************************************************************************/
export const useLoading = (): LoadingContextType => {
    const context = useContext(LoadingContext);

    if (!context || typeof context.show !== 'function' || typeof context.hide !== 'function') {
        throw new Error('useLoading must be used within LoadingProvider');
    };

    return context;
};
