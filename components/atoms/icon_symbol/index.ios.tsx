/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 *******************************************************************************
 *  File        : icon_symbol/index.ios.tsx                                   *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 12/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import { SymbolView, SymbolWeight } from 'expo-symbols';
import { FC, JSX } from 'react';
import { IconSymbolIOSProps } from './types';

/******************************************************************************
 * Define các giá trị mặc định cho component                                  *
 ******************************************************************************/
const DEFAULT_SIZE_VALUE: number = 24;
const DEFAULT_WEIGHT_VALUE: SymbolWeight = 'regular';

/******************************************************************************
 * IconSymbol: Sử dụng SF Symbols cho iOS                                     *
 ******************************************************************************/
const IconSymbol: FC<IconSymbolIOSProps> = ({ name, size = DEFAULT_SIZE_VALUE, color, style, weight = DEFAULT_WEIGHT_VALUE }: IconSymbolIOSProps): JSX.Element => {
	return (
		<SymbolView
			name={name}
			weight={weight}
			tintColor={color}
			resizeMode="scaleAspectFit"
			style={[
				{ width: size, height: size },
				style,
			]}
		/>
	);
};

export default IconSymbol;