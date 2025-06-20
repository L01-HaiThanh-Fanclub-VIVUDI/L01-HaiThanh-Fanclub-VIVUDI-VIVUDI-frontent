/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : Chứa type liên quan đến regex                               *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 19/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { MSG_ID } from "@/languages/provider/types";
import { REGEX } from ".";

/****************************************************************************
 * Type định nghĩa cho các key của REGEX                                    *
 * @description                                                             *
 * - Dùng để đảm bảo tính nhất quán khi sử dụng các regex trong ứng dụng    *
 ****************************************************************************/
export type RegexKey = keyof typeof REGEX;

/****************************************************************************
 * Type map regex với MSG_ID tương ứng                                      *
 ****************************************************************************/
export type RegexMsgMap = Partial<{
    [K in RegexKey]: MSG_ID;
}>;