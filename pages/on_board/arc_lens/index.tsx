/******************************************************************************
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : on_board_screen/arc_lens/index.tsx                          *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 18/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
 ******************************************************************************/

import { FC, JSX } from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ArcLensProps } from './types';

/******************************************************************************
 * Định nghĩa hằng số default cho component                                   *
 ******************************************************************************/
const DEFAULT_WIDTH_VALUE: number = Dimensions.get('window').width;
const DEFAULT_HEIGHT_VALUE: number = 60;
const DEFAULT_COLOR_VALUE: string = '#FF7F11';

/******************************************************************************
 * ArcLens: Vẽ hiệu ứng lens dạng cung cong                                   *
 ******************************************************************************/
const ArcLens: FC<ArcLensProps> = ({ width = DEFAULT_WIDTH_VALUE, height = DEFAULT_HEIGHT_VALUE, color = DEFAULT_COLOR_VALUE, style }: ArcLensProps): JSX.Element => {
    const controlY1 = -height + 1;
    const controlY2 = height * 0.1;

    return (
        <Svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            style={style}
        >
            <Path
                d={`
                    M 0 ${height}
                    Q ${width / 2} ${controlY1} ${width} ${height}
                    Q ${width / 2} ${controlY2} 0 ${height}
                    Z
                `}
                fill={color}
            />
        </Svg>
    );
};

export default ArcLens;