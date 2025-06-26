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
import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);

    /*****************************************************************************
     * show: Bật visible và entry animation                                      *
     ******************************************************************************/
    const show = useCallback(() => {
        setVisible(true);         // Render LoadingScreen
        setIsLoading(true);       // Bắt đầu entry
    }, []);

    /*****************************************************************************
     * hide: Chỉ tắt entry, chờ exit trong LoadingScreen                         *
     ******************************************************************************/
    const hide = useCallback(() => {
        setIsLoading(false);      // Kích hoạt exit animation
    }, []);

    /*****************************************************************************
     * handleHidden: Khi exit animation hoàn thành, unmount LoadingScreen         *
     ******************************************************************************/
    const handleHidden = useCallback(() => {
        setVisible(false);        // Unmount component để dọn dẹp
    }, []);

    return (
        <LoadingContext.Provider value={{ show, hide, isLoading }}>
            {children}
            {/* Render LoadingScreen khi visible=true và truyền props */}
            {visible && <LoadingScreen isVisible={isLoading} onHidden={handleHidden} />}
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