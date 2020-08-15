import { useState, useEffect } from 'react';
import useResizeListener from '../useResizeListener';
import { getBreakpoints, matchBreakpoints } from './breakPoints';
import { parseAll } from './parseStyles';

const useResponsiveStyles = (
    styles,
    exactOnly = false,
    customBreakpoints = null
) => {
    const [activeStyles, setActiveStyles] = useState(styles);
    const [ready, setReady] = useState(false);
    const width = useResizeListener();

    useEffect(() => {
        const breakpoints = customBreakpoints || getBreakpoints();

        const [matchedBreakpoints, currentBreakpoint] = matchBreakpoints(
            breakpoints,
            width,
            exactOnly
        );

        const parsed = parseAll(
            styles,
            breakpoints,
            matchedBreakpoints,
            currentBreakpoint
        );

        setActiveStyles(parsed);

        if (!ready) setReady(true);
    }, [width, customBreakpoints]);

    return [activeStyles, ready, width];
};

export default useResponsiveStyles;
