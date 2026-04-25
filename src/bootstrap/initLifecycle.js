export function createInitLifecycle(deps) {
  const {
    initPkg_Shield_RemoveRepeatedDanmaku_ScriptHook,
    initScriptHook,
    initPkg_Night_Set_Fast,
    initResponseHook,
    initPkg_ShowDanmaku,
    Update_checkVersion,
    initKillP2P,
    initFullScreen,
    initHighestVideoQuality,
    removeAD,
    initPkg_Statistics,
    initPkg_Console,
    initPkg_Menu,
    initPkg_Reset,
    initPkg_FollowList,
    initPkg_DanmakuTail,
    initPkg_Night,
    initPkg_ExIcon,
    initPkg_ExPanel,
    initPkg_RealAudience,
    initPkg_CopyRealLive,
    initPkg_AudioLine,
    initPkg_RemoveAD,
    initPkg_Shield,
    initPkg_BagInfo,
    initPkg_Update,
    initPkg_AutoAnchorStar,
    initPkg_Fkbuff,
    initPkg_Monitor,
    initPkg_Lottery,
    initPkg_PopupPlayer,
    initPkg_LiveTool,
    initPkg_VideoTools,
    initPkg_ExpandTool,
    initPkg_Refresh,
    initPkg_BarrageLoop,
    initPkg_FansContinue,
    initPkg_Sign,
    initPkg_BarragePanel,
    initPkg_AccountList,
    initPkg_ChatTools,
    initPkg_MonthCost,
    initPkg_RoomVip,
    initPkg_WeeklyPanel,
    initPkg_DanmakuCollect,
    initPkg_RestoreYuba,
    initPkg_ChangeDanmakuLengthLimit,
    initPkg_CheckAnchorPocket,
    initPkg_LastLiveTime,
    initPkg_VolumeMouseScrolling,
    initPkg_LevelTask_Timer,
    initPkg_Sign_OPFOY_Timer,
    initPkg_DisableCloseJump_Timer,
    document,
  } = deps;

  function init() {
    initPkg_Shield_RemoveRepeatedDanmaku_ScriptHook();
    initScriptHook();
    initPkg_Night_Set_Fast();
    initResponseHook();
    initPkg_ShowDanmaku();
    Update_checkVersion();
    initKillP2P();
    initFullScreen();
    initHighestVideoQuality();
    removeAD();
    initPkg_Statistics();
    initPkg_Console();
    initPkg_Menu();
    initPkg_Reset();
    initPkg_FollowList();
  }

  function initPkg() {
    initPkg_DanmakuTail();
    initPkg_Night();
    initPkg_ExIcon();
    initPkg_ExPanel();
    initPkg_RealAudience();
    initPkg_CopyRealLive();
    initPkg_AudioLine();
    initPkg_RemoveAD();
    initPkg_Shield();
    initPkg_BagInfo();
    initPkg_Update();
    initPkg_AutoAnchorStar();
    initPkg_Fkbuff();
    initPkg_Monitor();
    initPkg_Lottery();
    initPkg_PopupPlayer();
    initPkg_LiveTool();
    initPkg_VideoTools();
    initPkg_ExpandTool();
    initPkg_Refresh();
    initPkg_BarrageLoop();
    initPkg_FansContinue();
    initPkg_Sign();
    initPkg_BarragePanel();
    initPkg_AccountList();
    initPkg_ChatTools();
    initPkg_MonthCost();
    initPkg_RoomVip();
    initPkg_WeeklyPanel();
    initPkg_DanmakuCollect();
    initPkg_RestoreYuba();
    initPkg_ChangeDanmakuLengthLimit();
    initPkg_CheckAnchorPocket();
    initPkg_LastLiveTime();
    initPkg_VolumeMouseScrolling();
  }

  function initPkg_Timer() {
    initPkg_LevelTask_Timer();
    initPkg_Sign_OPFOY_Timer();
    initPkg_DisableCloseJump_Timer();
  }

  function initTimer() {
    initPkg_Timer();
  }

  function initStyles() {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode('body{position:relative;}'));
    document.head.appendChild(style);
  }

  return {
    init,
    initPkg,
    initPkg_Timer,
    initTimer,
    initStyles,
  };
}
