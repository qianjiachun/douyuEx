import { initRouter } from './routers/router.js';
import { initScriptHook } from './require/ScriptHook/ScriptHook.js';
import { initResponseHook } from './require/ResponseHook/ResponseHook.js';
import { initPkg_Shield_RemoveRepeatedDanmaku_ScriptHook } from './packages/Shield/RemoveRepeatedDanmaku.js';
import { initPkg_Night_Set_Fast } from './packages/Night/Night.js';
import { initPkg_ShowDanmaku } from './packages/ShowDanmaku/ShowDanmaku.js';
import { Update_checkVersion } from './packages/Update/Update.js';
import { initKillP2P } from './packages/ExpandTool/ExpandTool_P2P.js';
import { initFullScreen, initHighestVideoQuality } from './packages/ExpandTool/ExpandTool_FullScreen.js';
import { removeAD } from './packages/RemoveAD/RemoveAD.js';
import { initPkg_Statistics } from './packages/Statistics/Statistics.js';
import { initPkg_Console } from './packages/Console/Console.js';
import { initPkg_Menu } from './packages/Menu/Menu.js';
import { initPkg_Reset } from './packages/Reset/Reset.js';
import { initPkg_FollowList } from './packages/FollowList/FollowList.js';
import { initPkg_DanmakuTail } from './packages/DanmakuTail/DanmakuTail.js';
import { initPkg_Night } from './packages/Night/Night.js';
import { initPkg_ExIcon } from './packages/ExIcon/ExIcon.js';
import { initPkg_ExPanel } from './packages/ExPanel/ExPanel.js';
import { initPkg_RealAudience } from './packages/RealAudience/RealAudience.js';
import { initPkg_CopyRealLive } from './packages/CopyRealLive/CopyRealLive.js';
import { initPkg_AudioLine } from './packages/AudioLine/AudioLine.js';
import { initPkg_RemoveAD } from './packages/RemoveAD/RemoveAD.js';
import { initPkg_Shield } from './packages/Shield/Shield.js';
import { initPkg_BagInfo } from './packages/BagInfo/BagInfo.js';
import { initPkg_Update } from './packages/Update/Update.js';
import { initPkg_AutoAnchorStar } from './packages/AutoAnchorStar/AutoAnchorStar.js';
import { initPkg_Fkbuff } from './packages/Fkbuff/Fkbuff.js';
import { initPkg_Monitor } from './packages/Monitor/Monitor.js';
import { initPkg_Lottery } from './packages/Lottery/Lottery.js';
import { initPkg_PopupPlayer } from './packages/PopupPlayer/PopupPlayer.js';
import { initPkg_LiveTool } from './packages/LiveTool/LiveTool.js';
import { initPkg_VideoTools } from './packages/VideoTools/VideoTools.js';
import { initPkg_ExpandTool } from './packages/ExpandTool/ExpandTool.js';
import { initPkg_Refresh } from './packages/Refresh/Refresh.js';
import { initPkg_BarrageLoop } from './packages/BarrageLoop/BarrageLoop.js';
import { initPkg_FansContinue } from './packages/FansContinue/FansContinue.js';
import { initPkg_Sign } from './packages/Sign/Sign.js';
import { initPkg_BarragePanel } from './packages/BarragePanel/BarragePanel.js';
import { initPkg_AccountList } from './packages/AccountList/AccountList.js';
import { initPkg_ChatTools } from './packages/ChatTools/ChatTools.js';
import { initPkg_MonthCost } from './packages/MonthCost/MonthCost.js';
import { initPkg_RoomVip } from './packages/RoomVip/RoomVip.js';
import { initPkg_WeeklyPanel } from './packages/WeeklyPanel/WeeklyPanel.js';
import { initPkg_DanmakuCollect } from './packages/DanmakuCollect/DanmakuCollect.js';
import { initPkg_RestoreYuba } from './packages/RestoreYuba/RestoreYuba.js';
import { initPkg_ChangeDanmakuLengthLimit } from './packages/RemoveChatLengthLimit/ChangeDanmakuLengthLimit.js';
import { initPkg_CheckAnchorPocket } from './packages/CheckAnchorPocket/CheckAnchorPocket.js';
import { initPkg_LastLiveTime } from './packages/LastLiveTime/LastLiveTime.js';
import { initPkg_VolumeMouseScrolling } from './packages/VolumeMouseScrolling/VolumeMouseScrolling.js';
import { initPkg_LevelTask_Timer } from './packages/LevelTask/LevelTask.js';
import { initPkg_Sign_OPFOY_Timer } from './packages/Sign/Sign_OPFOY.js';
import { initPkg_DisableCloseJump_Timer } from './packages/DisableCloseJump/DisableCloseJump.js';
import { createInitLifecycle } from './bootstrap/initLifecycle.js';

const { init, initPkg, initPkg_Timer, initTimer, initStyles } = createInitLifecycle({
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
});

Object.assign(globalThis, {
  init,
  initPkg,
  initPkg_Timer,
  initTimer,
  initStyles,
});

(async function () {
  initRouter(window.location.href);
})();
