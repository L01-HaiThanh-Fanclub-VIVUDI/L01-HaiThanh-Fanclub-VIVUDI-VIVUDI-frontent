/*****************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : Cung cấp context và provider cho đa ngôn ngữ (i18n)         *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 29/05/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import getDeviceLanguage from '@/utils/getDeviceLanguage';
import React, { createContext, useContext, useMemo, useState } from 'react';
import en, { enMessages } from '../en';
import vi, { viMessages } from '../vi';
import { AppLanguage, AppLanguageContextType, MSG_API_ID, MSG_ID, TranslationKey } from './types';

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
    getAPIMessage: (messageId, apiMessageId) => String(messageId) + String(apiMessageId),
});

/******************************************************************************
 * Provider cho context ngôn ngữ, bọc quanh ứng dụng.                         *
 * Sử dụng useState để lưu ngôn ngữ hiện tại.                                 *
 * Cung cấp các hàm dịch (t, getMessage) cho toàn bộ app.                     *
 ******************************************************************************/
export const AppLanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const initialLang: AppLanguage = getDeviceLanguage();
    const [lang, setLang] = useState<AppLanguage>(initialLang);

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
         * Hàm format message với tham số động, ưu tiên {n} là danh sách cuối.    *
         * {0}, {1}, ... là các tham số tương ứng.                                *
         * {n} là danh sách các tham số còn lại.                                  *
         * {n} sẽ được viết hoa chữ cái đầu nếu là đầu câu, còn lại viết thường.  *
         **************************************************************************/
        const formatMessage = (template: string, args: (string | number)[]): string => {
            // Helper: Viết hoa chữ cái đầu nếu là đầu câu, còn lại viết thường
            const smartCase = (str: string, isFirst: boolean) => {
                if (!str) return '';
                return isFirst
                    ? str.charAt(0).toUpperCase() + str.slice(1)
                    : str.toLowerCase();
            };

            // Regex tìm tất cả placeholder dạng {n} hoặc {0}, {1}, ...
            const placeholderRegex = /{(n|\d+)}/g;
            let match: RegExpExecArray | null;
            let lastIndex = 0;
            let result = '';
            let isFirst = true;

            // Duyệt từng placeholder và thay thế
            while ((match = placeholderRegex.exec(template)) !== null) {
                const [placeholder, key] = match;
                const before = template.slice(lastIndex, match.index);

                // Kiểm tra nếu trước đó là đầu câu hoặc sau dấu chấm
                const trimmedBefore = before.trimEnd();
                if (
                    trimmedBefore.length === 0 ||
                    /[.?!]\s*$/.test(trimmedBefore)
                ) {
                    isFirst = true;
                } else {
                    isFirst = false;
                };

                result += before;

                let value = '';
                if (key === 'n') {
                    // Xử lý {n}: lấy các tham số còn lại sau các {0}, {1}, ...
                    const indexedPlaceholders = Array.from(template.matchAll(/{(\d+)}/g)).map(m => Number(m[1]));
                    const maxIndex = indexedPlaceholders.length > 0 ? Math.max(...indexedPlaceholders) : -1;
                    const nArgs = args.slice(maxIndex + 1).map((v, i) =>
                        smartCase(String(v), i === 0 && isFirst)
                    );
                    value = nArgs.join(', ');
                } else {
                    // Xử lý {0}, {1}, ...
                    const idx = Number(key);
                    value = smartCase(
                        typeof args[idx] !== 'undefined' ? String(args[idx]) : '',
                        isFirst
                    );
                };

                result += value;
                lastIndex = match.index + placeholder.length;
            };

            // Thêm phần còn lại của template
            result += template.slice(lastIndex);

            return result;
        };

        /**************************************************************************
         * Hàm lấy message theo MSG_ID và truyền tham số động.                    *
         **************************************************************************/
        const getMessage = (messageId: MSG_ID, ...params: (string | number)[]): string => {
            const msg = messages[lang]?.[messageId];
            if (typeof msg !== 'string') {
                // Nếu không phải là string, throw lỗi
                throw new Error(`Sử dụng getAPIMessage để làm việc với MSG_ID ứng với MSG_API_ID tương ứng`);
            };

            if (!msg) {
                // Nếu không có message, throw lỗi
                throw new Error(`Không tìm thấy message cho MSG_ID ${messageId} trong ngôn ngữ ${lang}`);
            };

            return formatMessage(msg, params);
        };

        /**************************************************************************
         * Hàm lấy message theo MSG_ID và MSG_API_ID, hỗ trợ tham số động.        *
         * Sử dụng để lấy các message dạng object với nhiều API ID khác nhau.    *
         **************************************************************************/
        const getAPIMessage = (messageId: MSG_ID, apiMessageId: MSG_API_ID, ...params: (string | number)[]): string => {
            const msg = messages[lang]?.[messageId];
            if (typeof msg !== 'object' || !msg || !(apiMessageId in msg)) {
                // Nếu không phải là object hoặc không có apiMessageId, throw lỗi
                throw new Error(`MSG_ID ${messageId} không chứa API message với ID ${apiMessageId}`);
            };

            const template = msg[apiMessageId];

            if (!template) {
                // Nếu không có message, throw lỗi
                throw new Error(`Không tìm thấy message cho MSG_ID ${messageId} và API ID ${apiMessageId} trong ngôn ngữ ${lang}`);
            };

            return formatMessage(template, params);
        };

        return { lang, setLang, t, getMessage, getAPIMessage };
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