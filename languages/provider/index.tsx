/*****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : Cung cấp context và provider cho đa ngôn ngữ (i18n)         *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 29/05/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import React, { createContext, useContext, useMemo, useState } from 'react';
import en, { enMessages } from '../en';
import vi, { viMessages } from '../vi';
import { AppLanguage, AppLanguageContextType, MSG_ID, TranslationKey } from './types';

/******************************************************************************
 * Object chứa các bản dịch cho từng ngôn ngữ.                                *
 ******************************************************************************/
const translations = { en, vi };
const messages = { en: enMessages, vi: viMessages };

/******************************************************************************
 * Context lưu trữ ngôn ngữ hiện tại và các hàm dịch.                         *
 ******************************************************************************/
const AppLanguageContext = createContext<AppLanguageContextType>({
    lang: 'vi',
    setLang: () => { },
    t: (key) => key,
    getMessage: (messageId) => String(messageId),
});

/******************************************************************************
 * Provider cho context ngôn ngữ, bọc quanh ứng dụng.                         *
 * Sử dụng useState để lưu ngôn ngữ hiện tại.                                 *
 * Cung cấp các hàm dịch (t, getMessage) cho toàn bộ app.                     *
 ******************************************************************************/
export const AppLanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [lang, setLang] = useState<AppLanguage>('vi');

    const contextValue = useMemo(() => {
        /**************************************************************************
         * Hàm dịch theo key dạng 'a.b.c'.                                        *
         **************************************************************************/
        const t = (key: TranslationKey): string => {
            const keys = key.split('.');
            let result: unknown = translations[lang];

            for (const k of keys) {
                if (typeof result === 'object' && result !== null && k in result) {
                    result = (result as Record<string, unknown>)[k];
                } else {
                    return key; // Key không hợp lệ
                };
            };

            return typeof result === 'string' ? result : key;
        };

        /**************************************************************************
         * Hàm format message với tham số động.                                   *
         **************************************************************************/
        const formatMessage = (template: string, args: (string | number)[]): string => {
            return template
                .split(',')
                .map((segment) => {
                    return segment.replace(/{(\d+)}/g, (_, index) => {
                        const value = args[Number(index)];
                        return typeof value !== 'undefined' ? String(value) : '';
                    });
                })
                .filter((segment) => segment.match(/[a-zA-Z0-9]/))
                .join(',');
        };

        /**************************************************************************
         * Hàm lấy message theo MSG_ID và truyền tham số động.                    *
         **************************************************************************/
        const getMessage = (messageId: MSG_ID, ...params: (string | number)[]): string => {
            const msg = messages[lang]?.[messageId];
            return msg ? formatMessage(msg, params) : messageId.toString();
        };

        return { lang, setLang, t, getMessage };
    }, [lang]);

    return (
        <AppLanguageContext.Provider value={contextValue}>
            {children}
        </AppLanguageContext.Provider>
    );
};

/******************************************************************************
 * PHook tiện ích để sử dụng context ngôn ngữ trong component.                *
 ******************************************************************************/
export const useLanguage = (): AppLanguageContextType => {
    const context = useContext(AppLanguageContext);

    if (!context || context.t === ((key: string) => key)) {
        throw new Error('useLanguage must be used within an AppLanguageProvider');
    };

    return context;
};