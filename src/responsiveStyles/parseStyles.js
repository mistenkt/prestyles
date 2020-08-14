import { StyleSheet } from 'react-native';

/**
 * Parse a single responsive style object
 * @param style
 * @param breakpoints
 * @param matchedBreakpoints
 * @param currentBreakpoint
 */
export const parseSingle = (
    style,
    breakpoints,
    matchedBreakpoints,
    currentBreakpoint
) => {
    let parsed = { ...style };

    matchedBreakpoints.forEach((bp) => {
        if (parsed[bp]) parsed = { ...parsed, ...parsed[bp] };
    });

    if (parsed['_' + currentBreakpoint]) {
        parsed = { ...parsed, ...parsed['_' + currentBreakpoint] };
    }

    Object.keys(breakpoints).forEach((bpKey) => {
        if (parsed['_' + bpKey]) delete parsed['_' + bpKey];
        if (parsed[bpKey]) delete parsed[bpKey];
    });

    return StyleSheet.flatten(parsed);
};

/**
 * Parse multiple responsive style objects
 * @param styles
 * @param breakpoints
 * @param matchedBreakpoints
 * @param currentBreakpoint
 * @returns {{}}
 */
export const parseAll = (
    styles,
    breakpoints,
    matchedBreakpoints,
    currentBreakpoint
) => {
    let fullParse = {};

    for (let [key, style] of Object.entries(styles)) {
        fullParse[key] =
            typeof style === 'function'
                ? (params) =>
                      parseSingle(
                          style(params),
                          breakpoints,
                          matchedBreakpoints,
                          currentBreakpoint
                      )
                : parseSingle(
                      style,
                      breakpoints,
                      matchedBreakpoints,
                      currentBreakpoint
                  );
    }

    return fullParse;
};
