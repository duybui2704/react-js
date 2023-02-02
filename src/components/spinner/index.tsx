import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
import { COLORS } from 'theme/colors';

export default function Spinner({ color = COLORS.GREEN }:
    {
        color?: string,
    }
) {

    const antIcon = <LoadingOutlined style={{ fontSize: 26, color }} spin />;

    return <Spin indicator={antIcon} />;
}
