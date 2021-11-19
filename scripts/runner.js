const vite = require('vite');
const builder = require('./builder');
const { spawn } = require('child_process');
const electron = require('electron');

/** @type {vite.logLevel} */
const LOG_LEVEL = 'info';

/** @type {vite.InlineConfig} */
const sharedConfig = {
    build: {
        watch: {},
    },
    logLevel: LOG_LEVEL,
};

const setup = (name, writeBundle) => {
    return builder.build(name, {
        ...sharedConfig,
        plugins: [{ name, writeBundle }],
    });
};

let main = null;
let noManual = false;

const logger = vite.createLogger(LOG_LEVEL, {
    prefix: '[main]',
});

const setupMain = async () => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
        await setup('main', () => {
            if (main !== null) {
                noManual = true;
                main.kill('SIGINT');
                main = null;
            }

            main = spawn(electron, ['.']);

            main.stdout.on('data', d => d.toString().trim() && logger.warn(d.toString(), { timestamp: true }));
            main.stderr.on('data', d => {
                const data = d.toString().trim();
                if (!data) return;
                const mayIgnore = [/ExtensionLoadWarning/].some((r) => r.test(data));
                if (mayIgnore) return;
                logger.error(data, { timestamp: true });
            });

            main.once('exit', () => {
                !noManual ? resolve() : (noManual = false);
            });
        });
    });
};

const setupRenderer = async () => {
    const server = await vite.createServer({
        ...sharedConfig,
        configFile: builder.configs.renderer,
    });

    await server.listen();

    setupSeverURL(server);

    return server;
};

/**
 *
 * @param {vite.ViteDevServer} server
 */
const setupSeverURL = (server) => {
    const protocol = `http${server.config.server.https ? 's' : ''}:`;
    const host = server.config.server.host || 'localhost';
    const port = server.config.server.port;
    const path = '/';
    process.env.VITE_DEV_SERVER_URL = `${protocol}//${host}:${port}${path}`;
};

(async () => {
    try {
        await setupRenderer();
        await setupMain();

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
