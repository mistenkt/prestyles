import React from 'react';
import createStyles from '../src';
import { Dimensions } from '../__mocks__/react-native';
import { renderHook, act } from '@testing-library/react-hooks';
import useResponsiveStyles from '../src/responsiveStyles/useResponsiveStyles';

describe('Responsive styles', () => {
    test('hook works', async () => {
        Dimensions.setWidth(1024);
        const styles = createStyles(
            {
                test: {
                    color: 'red',
                    desktop: {
                        color: 'blue',
                    },
                    mobile: {
                        color: 'yellow',
                        width: 10,
                    },
                    _tablet: {
                        height: 50,
                    },
                },
            },
            true
        );

        const { result, waitForNextUpdate } = renderHook(() =>
            useResponsiveStyles(styles)
        );

        expect(result.current[0].test).toMatchObject({
            color: 'blue',
            width: 10,
        });

        Dimensions.setWidth(1000);
        Dimensions.fireEvent();

        await waitForNextUpdate();

        expect(result.current[0].test).toMatchObject({
            color: 'yellow',
            width: 10,
            height: 50,
        });
    });

    test('Exact only mode works', async () => {
        Dimensions.setWidth(1024);
        Dimensions.fireEvent();

        const styles = createStyles({
            test: {
                color: 'red',
                tablet: {
                    color: 'blue',
                },
                mobile: {
                    color: 'green',
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() =>
            useResponsiveStyles(styles, true)
        );

        expect(result.current[0].test).toMatchObject({
            color: 'red',
        });

        Dimensions.setWidth(768);
        Dimensions.fireEvent();

        await waitForNextUpdate();

        expect(result.current[0].test).toMatchObject({
            color: 'blue',
        });

        Dimensions.setWidth(300);
        Dimensions.fireEvent();

        await waitForNextUpdate();

        expect(result.current[0].test).toMatchObject({
            color: 'green',
        });
    });

    test('Custom breakpoints work', async () => {
        Dimensions.setWidth(1200);
        Dimensions.fireEvent();

        const customBreakpoints = {
            desktopXL: 1200,
            desktop: 768,
            mobile: 0,
        };

        const styles = createStyles({
            test: {
                desktopXL: {
                    color: 'red',
                },
                desktop: {
                    color: 'blue',
                },
                mobile: {
                    color: 'yellow',
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() =>
            useResponsiveStyles(styles, false, customBreakpoints)
        );

        expect(result.current[0].test).toMatchObject({
            color: 'red',
        });

        Dimensions.setWidth(768);
        Dimensions.fireEvent();

        await waitForNextUpdate();

        expect(result.current[0].test).toMatchObject({
            color: 'blue',
        });

        Dimensions.setWidth(700);
        Dimensions.fireEvent();

        await waitForNextUpdate();

        expect(result.current[0].test).toMatchObject({
            color: 'yellow',
        });
    });
});
