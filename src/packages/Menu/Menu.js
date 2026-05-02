import { Update_checkVersion } from '../Update/Update.js';

export function initPkg_Menu() {
    GM_registerMenuCommand(`检查更新`, () => {
        Update_checkVersion(true);
    })
}
