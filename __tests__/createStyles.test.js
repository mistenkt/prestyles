import createStyles from '../src/createStyles';
import { Platform } from '../__mocks__/react-native';

describe('createStyles objects', () => {
    test('It works with regular styles', () => {
        const styleObject = {
            foo: {
                color: 'red',
                fontSize: 12,
            },
            bar: {
                color: 'blue',
                fontSize: 14,
            },
        };

        const createdStyles = createStyles(styleObject);

        expect(createdStyles).toMatchObject(styleObject);
    });

    test('It uses webstyles when platform is web', () => {
        Platform.OS = 'web';

        const parsedStyles = createStyles({
            foo: {
                color: 'red',
                fontSize: 12,
                web: {
                    color: 'blue',
                },
            },
        });

        expect(parsedStyles.foo).toMatchObject({
            color: 'blue',
            fontSize: 12,
        });
    });

    test('It removes web styles when platform is not web', () => {
        Platform.OS = 'native';

        const parsedStyles = createStyles({
            foo: {
                color: 'red',
                fontSize: 12,
                web: {
                    color: 'blue',
                },
            },
        });

        expect(parsedStyles.foo).toMatchObject({
            color: 'red',
            fontSize: 12,
        });
    });
});

describe('createStyles functions', () => {
    test('Style functions uses params', () => {
        const styles = createStyles({
            foo: ({ color }) => ({
                backgroundColor: color,
            }),
        });

        expect(styles.foo({ color: 'red' })).toMatchObject({
            backgroundColor: 'red',
        });
    });

    test('Style functions work with platform styles', () => {
        Platform.OS = 'web';

        const styles = createStyles({
            foo: ({ color }) => ({
                backgroundColor: 'red',
                web: {
                    color: color,
                },
                native: {
                    fontSize: 12,
                },
            }),
        });

        expect(styles.foo({ color: 'black' })).toMatchObject({
            backgroundColor: 'red',
            color: 'black',
        });
    });
});
