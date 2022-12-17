import { useEffect, useState } from 'react';

export const useWindowScrollPositions = (classNames: any) => {

    const [scrollPosition, setPosition] = useState({ scrollX: 0, scrollY: 0, scrollTop: 0 });

    const container = document.getElementsByClassName(classNames);


    useEffect(() => {

        container[0].addEventListener('scroll', () => {
            setPosition({ scrollX: container[0].scrollWidth, scrollY: container[0].scrollHeight, scrollTop: container[0].scrollTop });
        });
        return container[0].removeEventListener('scroll', () => {
            setPosition({ scrollX: container[0].scrollWidth, scrollY: container[0].scrollHeight, scrollTop: container[0].scrollTop });
        });
    }, [container]);

    return scrollPosition;
};
