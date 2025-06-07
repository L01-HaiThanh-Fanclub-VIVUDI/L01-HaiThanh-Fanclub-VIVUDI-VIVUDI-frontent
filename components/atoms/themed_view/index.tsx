/******************************************************************************
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : Hiển thị View theo theme                                    *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 07/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
 ******************************************************************************/

import useThemeColor from '@/hooks/useThemeColor';
import { FC, JSX } from 'react';
import { View } from 'react-native';
import { ThemedViewProps } from './types';

/******************************************************************************
 * ThemedView: Hiển thị View theo theme                                       *
 ******************************************************************************/
const ThemedView: FC<ThemedViewProps> = ({ style, lightColor, darkColor, ...rest }): JSX.Element => {
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

	return (
		<View style={[{ backgroundColor }, style]} {...rest} />
	);
};

export default ThemedView;