export const Platform = {
    OS: 'web',
    Version: 123,
    isTesting: true,
    select: (objs) => objs['web'],
};

export const StyleSheet = {
    flatten: (input) => input,
};

let screenWidth = 1024;
let listeners = [];

export const Dimensions = {
    get: () => ({ width: screenWidth }),
    setWidth: (width) => {
        screenWidth = width;
    },
    addEventListener: (event, listener) => {
        listeners.push(listener);
    },
    removeEventListener: () => {
        listeners = [];
    },
    fireEvent: () => {
        listeners.forEach((listener) => {
            listener({ window: { width: screenWidth } });
        });
    },
};

module.exports = {
    Platform,
    StyleSheet,
    Dimensions,
};
