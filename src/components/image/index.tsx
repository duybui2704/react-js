import React from 'react';
import LazyLoad from 'react-lazy-load';

function LazyImage({ src, className, width }:
    {
        src?: string,
        className?: string,
        width?: string,
        onPress?: () => void,
    }
) {

    return (
        <LazyLoad>
            <img src={src} width={width} className={className} style={{objectFit: 'cover'}}/>
        </LazyLoad>
    );
}

export default LazyImage;
