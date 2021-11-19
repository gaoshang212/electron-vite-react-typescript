import { contextBridge, ipcRenderer } from 'electron';

const apikey = 'myapi';

const api = {
    doThing: () => {
        ipcRenderer.send('do-a-thing');
        return 'do a thing';
    },
    showMessageBox: (message: string) => {
        ipcRenderer.send('show-message-box', { message });
        // eslint-disable-next-line promise/param-names
        return new Promise((resovle) => {
            ipcRenderer.once('show-message-box-response', (event, args) => {
                resovle(args);
            });
        });
    },
};

/**
 * The "Main World" is the JavaScript context that your main renderer code runs in.
 * By default, the page you load in your renderer executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */
contextBridge.exposeInMainWorld(apikey, api);

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector: string, text: string) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type] || '');
    }
});
