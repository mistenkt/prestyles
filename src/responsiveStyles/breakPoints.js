/**
 * Default breakpoints
 * @type {{tablet: number, desktop: number, mobile: number}}
 */

let breakpoints = {
    desktop: 1024,
    tablet: 768,
    mobile: 0,
};

// Bootstrap breakpoints size and up
const bootstrapBreakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};

/**
 * Setter for breakpoints. Should be done at top level
 * @param newBreakpoints
 */
export const setBreakpoints = (newBreakpoints) => {
    breakpoints = newBreakpoints;
};

/**
 * Getter for top level breakpoints
 * @returns ({tablet: number, desktop: number, mobile: number})
 */
export const getBreakpoints = () => breakpoints;

/**
 * Orders breakpoints from low to high
 * @param breaks
 * @returns {{}}
 */
export const orderBreakpoints = (breaks) => {
    let flipped = {};
    let ordered = {};

    Object.keys(breaks).forEach((key) => {
        flipped[breaks[key]] = key;
    });

    Object.keys(flipped)
        .sort()
        .forEach((key) => {
            ordered[key] = flipped[key];
        });

    return ordered;
};

/**
 * Filters out breakpoints that doesnt match current width
 * @param breaks
 * @param currentWidth
 * @returns {[]}
 */
const filterBreakpoints = (breaks, currentWidth) => {
    const matched = [];

    for (const [key, width] of Object.entries(breaks)) {
        if (width <= currentWidth) matched[key] = width;
    }

    return matched;
};

/**
 * Finds the matching breakpoints
 * @param breaks
 * @param currentWidth
 * @param exactOnly
 * @returns []
 */
export const matchBreakpoints = (breaks, currentWidth, exactOnly) => {
    const filteredBreakpoints = filterBreakpoints(breaks, currentWidth);
    const orderedBreakpoints = Object.values(
        orderBreakpoints(filteredBreakpoints)
    );
    const currentBreakpointKey = orderedBreakpoints.length
        ? orderedBreakpoints[orderedBreakpoints.length - 1]
        : null;

    if (exactOnly) return [[currentBreakpointKey], currentBreakpointKey];

    return [orderedBreakpoints, currentBreakpointKey];
};
