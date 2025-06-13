/******************************************************************************\
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : icon_symbol/index.tsx                                       *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 12/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
\******************************************************************************/

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FC, JSX } from 'react';
import { IconSymbolProps, MAPPING } from './types';

/******************************************************************************
 * IconSymbol: Icon dùng MaterialIcons cho Android/web, map từ SF Symbols     *
 ******************************************************************************/
const IconSymbol: FC<IconSymbolProps> = ({ name, size = 24, color, style }: IconSymbolProps): JSX.Element => {
	return (
		<MaterialIcons
			name={MAPPING[name]}
			size={size}
			color={color}
			style={style}
		/>
	);
};

export default IconSymbol;