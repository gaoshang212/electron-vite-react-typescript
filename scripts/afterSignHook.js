const { notarize } = require('electron-notarize');
const path = require('path');
const fs = require('fs');

exports.default = async function (context) {
    const isDarwin = context.electronPlatformName === 'darwin';

    const appId = context.packager.appInfo.id;

    console.log('ALLOWNOTARIZE:', process.env.ALLOWNOTARIZE, ' ', appId);

    if (!isDarwin || process.env.ALLOWNOTARIZE !== 'true') {
        return;
    }

    const appPath = path.join(context.appOutDir, `${context.packager.appInfo.productFilename}.app`);
    if (!fs.existsSync(appPath)) {
        throw new Error(`Cannot find application at: ${appPath}`);
    }

    console.log('start notarize app.');

    await notarize({
        tool: 'notarytool',
        teamId: 'your-team-id',
        appBundleId: appId,
        appPath,
        appleId: 'your-apple-id',
        appleIdPassword: 'your-apple-id-password',
    });

    console.log('competed notarize app.');
};
