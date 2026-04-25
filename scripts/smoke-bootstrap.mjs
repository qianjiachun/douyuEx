import { createInitLifecycle } from '../src/bootstrap/initLifecycle.js';

const calls = [];
const record = (name) => () => calls.push(name);
const mockDocument = {
  head: {
    nodes: [],
    appendChild(node) {
      this.nodes.push(node);
    },
  },
  createElement(tag) {
    return {
      tag,
      children: [],
      appendChild(node) {
        this.children.push(node);
      },
    };
  },
  createTextNode(text) {
    return { text };
  },
};

const deps = {
  initPkg_Shield_RemoveRepeatedDanmaku_ScriptHook: record('initPkg_Shield_RemoveRepeatedDanmaku_ScriptHook'),
  initScriptHook: record('initScriptHook'),
  initPkg_Night_Set_Fast: record('initPkg_Night_Set_Fast'),
  initResponseHook: record('initResponseHook'),
  initPkg_ShowDanmaku: record('initPkg_ShowDanmaku'),
  Update_checkVersion: record('Update_checkVersion'),
  initKillP2P: record('initKillP2P'),
  initFullScreen: record('initFullScreen'),
  initHighestVideoQuality: record('initHighestVideoQuality'),
  removeAD: record('removeAD'),
  initPkg_Statistics: record('initPkg_Statistics'),
  initPkg_Console: record('initPkg_Console'),
  initPkg_Menu: record('initPkg_Menu'),
  initPkg_Reset: record('initPkg_Reset'),
  initPkg_FollowList: record('initPkg_FollowList'),
  initPkg_DanmakuTail: record('initPkg_DanmakuTail'),
  initPkg_Night: record('initPkg_Night'),
  initPkg_ExIcon: record('initPkg_ExIcon'),
  initPkg_ExPanel: record('initPkg_ExPanel'),
  initPkg_RealAudience: record('initPkg_RealAudience'),
  initPkg_CopyRealLive: record('initPkg_CopyRealLive'),
  initPkg_AudioLine: record('initPkg_AudioLine'),
  initPkg_RemoveAD: record('initPkg_RemoveAD'),
  initPkg_Shield: record('initPkg_Shield'),
  initPkg_BagInfo: record('initPkg_BagInfo'),
  initPkg_Update: record('initPkg_Update'),
  initPkg_AutoAnchorStar: record('initPkg_AutoAnchorStar'),
  initPkg_Fkbuff: record('initPkg_Fkbuff'),
  initPkg_Monitor: record('initPkg_Monitor'),
  initPkg_Lottery: record('initPkg_Lottery'),
  initPkg_PopupPlayer: record('initPkg_PopupPlayer'),
  initPkg_LiveTool: record('initPkg_LiveTool'),
  initPkg_VideoTools: record('initPkg_VideoTools'),
  initPkg_ExpandTool: record('initPkg_ExpandTool'),
  initPkg_Refresh: record('initPkg_Refresh'),
  initPkg_BarrageLoop: record('initPkg_BarrageLoop'),
  initPkg_FansContinue: record('initPkg_FansContinue'),
  initPkg_Sign: record('initPkg_Sign'),
  initPkg_BarragePanel: record('initPkg_BarragePanel'),
  initPkg_AccountList: record('initPkg_AccountList'),
  initPkg_ChatTools: record('initPkg_ChatTools'),
  initPkg_MonthCost: record('initPkg_MonthCost'),
  initPkg_RoomVip: record('initPkg_RoomVip'),
  initPkg_WeeklyPanel: record('initPkg_WeeklyPanel'),
  initPkg_DanmakuCollect: record('initPkg_DanmakuCollect'),
  initPkg_RestoreYuba: record('initPkg_RestoreYuba'),
  initPkg_ChangeDanmakuLengthLimit: record('initPkg_ChangeDanmakuLengthLimit'),
  initPkg_CheckAnchorPocket: record('initPkg_CheckAnchorPocket'),
  initPkg_LastLiveTime: record('initPkg_LastLiveTime'),
  initPkg_VolumeMouseScrolling: record('initPkg_VolumeMouseScrolling'),
  initPkg_LevelTask_Timer: record('initPkg_LevelTask_Timer'),
  initPkg_Sign_OPFOY_Timer: record('initPkg_Sign_OPFOY_Timer'),
  initPkg_DisableCloseJump_Timer: record('initPkg_DisableCloseJump_Timer'),
  document: mockDocument,
};

const lifecycle = createInitLifecycle(deps);
lifecycle.init();
lifecycle.initPkg();
lifecycle.initTimer();
lifecycle.initStyles();

if (calls.length === 0) {
  throw new Error('smoke bootstrap failed: no lifecycle hooks were called');
}

if (mockDocument.head.nodes.length !== 1) {
  throw new Error(`smoke bootstrap failed: expected 1 style node, got ${mockDocument.head.nodes.length}`);
}

console.log('smoke bootstrap passed');
