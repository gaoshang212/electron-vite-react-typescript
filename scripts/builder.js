#!/usr/bin/env node
const vite = require('vite');
const { dirname } = require('path');

const mode = exports.mode = process.env.MODE = process.env.MODE || 'production';

const configs = {
    main: 'app/main/vite.config.ts',
    renderer: 'app/renderer/vite.config.ts',
};

exports.configs = configs;

/**
 * Run `vite build` for config file
 */
exports.build = build = async (configName, options = {}) => {
    try {
        const configPath = configs[configName];
        const groupName = `${dirname(configPath)}/`;
        console.group(`${groupName}`);

        const timeLabel = 'Bundling time';
        console.time(timeLabel);

        await vite.build({ configFile: configPath, mode, ...options });

        console.timeEnd(timeLabel);
        console.groupEnd();
        console.log('\n');
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

exports.buildAll = async () => {
    const totalTimeLabel = 'Total bundling time';
    console.time(totalTimeLabel);

    for (const name of Object.keys(configs)) {
        await build(name);
    }

    console.timeEnd(totalTimeLabel);
}
