import { Platform, StyleSheet } from 'react-native';

const platformKeys = ['native', 'web', 'ios', 'android'];

const extractStyle = (style, raw = false) => {
    const currentPlatform = Platform.OS.toLowerCase();
    let parsed = { ...style };

    if (currentPlatform === 'web') {
        parsed = { ...parsed, ...parsed.web };
    } else {
        parsed = { ...parsed, ...parsed.native };
    }

    if (currentPlatform === 'ios') parsed = { ...parsed, ...parsed.ios };

    if (currentPlatform === 'android')
        parsed = { ...parsed, ...parsed.android };

    platformKeys.forEach((k) => {
        if (parsed[k]) {
            delete parsed[k];
        }
    });

    if (raw) return parsed;

    return StyleSheet.flatten(parsed);
};

const createStyles = (style, raw = false) => {
    let parsed = {};

    Object.keys(style).forEach((key) => {
        if (typeof style[key] === 'function') {
            parsed[key] = (params) => extractStyle(style[key](params), raw);
        } else {
            parsed[key] = extractStyle(style[key], raw);
        }
    });

    return parsed;
};

export default createStyles;
