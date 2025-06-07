/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : Hiển thị text theo theme, hỗ trợ nhiều kiểu chữ             *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 07/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import useThemeColor from '@/hooks/useThemeColor';
import { FC, JSX } from 'react';
import { Text } from 'react-native';
import { styles } from './styles';
import { ThemedTextProps, ThemedTextType } from './types';

/******************************************************************************
 * Define các giá trị mặc định cho component                                  *
 ******************************************************************************/
const DEFAULT_TYPE_VALUE: ThemedTextType = 'default';

/******************************************************************************
 * ThemedText: Hiển thị text theo theme, hỗ trợ nhiều kiểu chữ                *
 ******************************************************************************/
const ThemedText: FC<ThemedTextProps> = ({ style, lightColor, darkColor, type = DEFAULT_TYPE_VALUE, ...rest }): JSX.Element => {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

	return (
		<Text
			style={[
				{ color },
				type === 'default' && styles.default,
				type === 'title' && styles.title,
				type === 'defaultSemiBold' && styles.defaultSemiBold,
				type === 'subtitle' && styles.subtitle,
				type === 'link' && styles.link,
				style,
			]}
			{...rest}
		/>
	);
};

export default ThemedText;