import createStyles from '../src/createStyles';
import { Platform } from '../__mocks__/react-native';

const testStyles = {
    test: {
        color: 'red',
        fontSize: 12,
        web: {
            color: 'black',
        },
        ios: {
            color: 'yellow',
        },
        android: {
            color: 'blue',
        },
    },
};

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

    test('It picks correct styles based on platform', () => {
        Platform.OS = 'web';

        expect(createStyles(testStyles)).toMatchObject({
            test: {
                fontSize: 12,
                color: 'black',
            },
        });

        Platform.OS = 'ios';

        expect(createStyles(testStyles)).toMatchObject({
            test: {
                fontSize: 12,
                color: 'yellow',
            },
        });

        Platform.OS = 'android';

        expect(createStyles(testStyles)).toMatchObject({
            test: {
                fontSize: 12,
                color: 'blue',
            },
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
