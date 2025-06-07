/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : Chứa type cho hàm provider                                  *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 31/05/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

/****************************************************************************
 * Props cho Provider Injection                                             *
 ****************************************************************************/
export type ProviderProps = {
    children: React.ReactNode;
};

/****************************************************************************
 * Kiểu cho các entry của provider, bao gồm component và props tùy chọn.     *
 ****************************************************************************/
export type ProviderEntry = {
    provider: React.ComponentType<any>;
    props?: Record<string, any>;
};