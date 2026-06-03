function replacePlayerBarrage(text) {
  if (text.indexOf("player_barrage") === -1) {
    return text;
  }
  return text
    .replace(/player_barrage\\":0/g, 'player_barrage\\":1')
    .replace(/"player_barrage":0/g, '"player_barrage":1');
}

function initPkg_ShowDanmaku_ScriptHook() {
  scriptHook({
    inline: true,
    callback: replacePlayerBarrage
  });
}

function initPkg_ShowDanmaku() {
  responseHook((url, text) => {
    if (url.indexOf("/betard") !== -1) {
      return replacePlayerBarrage(text);
    }
    return text;
  });
}
