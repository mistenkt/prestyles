import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const createId = () => {
    const possibleChars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = [];

    for (let i = 0; i < 10; i++) {
        text.push(
            possibleChars.charAt(
                Math.floor(Math.random() * possibleChars.length)
            )
        );
    }

    return text.join('');
};

let active = false;
let listeners = [];
let timeout;

const handleResize = (event) => {
    const delay = 500;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
        // Publish change to listeners
        listeners.forEach((listener) => {
            listener.callback(event);
        });
    }, delay);
};

const subscribe = (callback) => {
    const id = createId();
    if (!listeners.find((a) => a.id === id)) listeners.push({ id, callback });
    return id;
};

const unsubscribe = (id) => {
    listeners = listeners.filter((a) => a.id !== id);
};

const useResizeListener = () => {
    const [width, setScreenSize] = useState(Dimensions.get('window').width);
    let id = null;

    const onChange = (e) => setScreenSize(e.window.width);

    useEffect(() => {
        id = subscribe(onChange);

        if (!active) {
            active = true;
            Dimensions.addEventListener('change', handleResize);
        }

        return () => {
            unsubscribe(id);
            if (active && !listeners.length) {
                active = false;
                Dimensions.removeEventListener('change', handleResize);
            }
        };
    }, []);

    return width;
};

export default useResizeListener;
