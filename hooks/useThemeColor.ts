/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : useThemeColor.ts                                            *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 7/6/2025                                                    *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { useColorScheme } from '@/hooks/useColorScheme';
import { colors } from '@/settings';

/******************************************************************************
 * useThemeColor: Lấy màu theo theme hiện tại (light/dark) hoặc props truyền  *
 * - Ưu tiên màu truyền qua props, nếu không có thì lấy từ settings           *
 ******************************************************************************/
const useThemeColor = (
	props: { light?: string; dark?: string },
	colorName: keyof typeof colors.light & keyof typeof colors.dark
): string => {
	const theme = useColorScheme() ?? 'light';
	const colorFromProps = props[theme];

	return colorFromProps ? colorFromProps : colors[theme][colorName];
};

export default useThemeColor;