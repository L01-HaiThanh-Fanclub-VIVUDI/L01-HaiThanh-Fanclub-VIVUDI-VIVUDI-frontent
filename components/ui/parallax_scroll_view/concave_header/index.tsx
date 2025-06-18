/******************************************************************************
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : parallax_scroll_view/concave_header/index.tsx               *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 16/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
 ******************************************************************************/

import useThemeColor from '@/hooks/useThemeColor';
import { FC, JSX } from 'react';
import { Dimensions, View, ViewProps } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { styles } from './styles';

/******************************************************************************
 * Lấy chiều rộng màn hình                                                    *
 ******************************************************************************/
const width = Dimensions.get('window').width;

/******************************************************************************
 * Define các giá trị mặc định cho component                                  *
 ******************************************************************************/
const DEFAULT_RADIUS_VALUE = 45;
const DEFAULT_CURVE_HEIGHT_VALUE = 40;

/******************************************************************************
 * TopCurveView: SVG header với đường cong lượn phía trên                     *
 ******************************************************************************/
const TopCurveView: FC<ViewProps> = ({ style, ...rest }: ViewProps): JSX.Element => {
    /******************************************************************************
     * Thiết lập các thông số đường cong                                          *
     ******************************************************************************/
    const radius = DEFAULT_RADIUS_VALUE;
    const h = DEFAULT_CURVE_HEIGHT_VALUE;
    const backgroundColor = useThemeColor({}, 'background');

    /******************************************************************************
     * Tạo path cho SVG để vẽ đường cong header                                  *
     ******************************************************************************/
    const path = `
        M0,${h + radius}
        Q0,${h + 6} ${radius},${h}
        Q${width / 2},${h - 0.6 * h} ${width - radius},${h}
        Q${width},${h + 6} ${width + 0.7},${h + radius}
        L${width},1000
        L0,1000
        Z
    `;

    /******************************************************************************
     * Xử lý hitSlop cho SVG nếu được truyền vào                                 *
     ******************************************************************************/
    const { hitSlop, ...restProps } = rest;
    const svgHitSlop = hitSlop === null ? undefined : hitSlop;

    /******************************************************************************
     * Render component                                                           *
     ******************************************************************************/
    return (
        <Svg
            width={width + 0.7}
            height={h + 45}
            style={[styles.svg, style]}
            hitSlop={svgHitSlop}
            {...restProps}
        >
            <Path d={path} fill={backgroundColor} />

            {/* Thanh nhỏ ngang gần trên cùng */}
            <View style={styles.bar} />
        </Svg>
    );
};

export default TopCurveView;