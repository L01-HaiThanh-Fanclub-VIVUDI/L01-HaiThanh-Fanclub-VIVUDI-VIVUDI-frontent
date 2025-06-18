/******************************************************************************
 *                   © ViVuDi 2025. All rights reserved.                      *
 ******************************************************************************
 *  File        : Trang onboard xuất hiện khi mới mở app lần đầu              *
 *  Author      : Minh Nhat                                                   *
 *  Created     : 16/06/2025                                                  *
 *  Updated by  :                                                             *
 *  Modified    :                                                             *
 ******************************************************************************/

import OnBoardPage from "@/pages/on_board/page";
import { JSX } from "react";

/******************************************************************************
 * OnBoardScreen: Hiển thị trang onboard khi mở ứng dụng lần đầu              *
 * - Sử dụng OnBoardPage để hiển thị nội dung onboard                         *
 * - Trả về JSX.Element để sử dụng trong navigation stack                     *
 ******************************************************************************/
const OnBoardScreen = (): JSX.Element => {
    return (
        <OnBoardPage />
    );
};

export default OnBoardScreen;