function initPkg_ExpandTool_TabSwitch() {
  enableIgnoreAutoPause();
  ExpandTool_TabSwitch_insertDom();
  ExpandTool_TabSwitch_insertFunc();
  initPkg_ExpandTool_TabSwitch_Set();
}

function ExpandTool_TabSwitch_insertDom() {
  let a = document.createElement("span");
  // a.className = "extool__bsize";
  a.innerHTML = '<label title="阻止浏览器页签冻结"><input id="extool__tabSwitch" type="checkbox">防页签冻结</label>';
  
  let b = document.getElementsByClassName("extool")[0];
  b.insertBefore(a, b.childNodes[0]);
}


function isTabSwitchEnabled() {
  try {
    const ret = localStorage.getItem("ExSave_TabSwitch");
    if (ret != null) {
      return !!JSON.parse(ret).isEnableTabSwitch;
    }
  } catch (e) { }
  const el = document.getElementById("extool__tabSwitch");
  return el ? el.checked : false;
}

function setTabSwitchEnabled(enabled) {
  localStorage.setItem("ExSave_TabSwitch", JSON.stringify({ isEnableTabSwitch: !!enabled }));
  const el = document.getElementById("extool__tabSwitch");
  if (el) {
    el.checked = !!enabled;
  }
  if (enabled) {
    enableTabSwitch();
  }
}

function getTabSwitch() {
  return isTabSwitchEnabled();
}

function ExpandTool_TabSwitch_insertFunc() {
  document.getElementById("extool__tabSwitch").addEventListener("click", function() {
      const enabled = document.getElementById("extool__tabSwitch").checked;
      setTabSwitchEnabled(enabled);
      if (enabled) {
        enableTabSwitch();
      } else {
        showMessage("已关闭页面防挂机，请刷新页面生效", "info");
        if (window.__pip_is_active__) {
          PictureInPictureControl_stopTabAntiFreeze();
        }
      }
  });
}

function saveData_TabSwitch() {
  setTabSwitchEnabled(document.getElementById("extool__tabSwitch").checked);
}
function initPkg_ExpandTool_TabSwitch_Set() {
  // 设置初始化
  let ret = localStorage.getItem("ExSave_TabSwitch");
  if (ret != null) {
    let retJson = JSON.parse(ret);
        if (retJson.isEnableTabSwitch) {
            document.getElementById("extool__tabSwitch").checked = retJson.isEnableTabSwitch;
            enableTabSwitch();
        }
  }
}

function enableTabSwitch() {
  Object.defineProperty(document, 'hidden', {value: false, writable: false});
  Object.defineProperty(document, 'visibilityState', {value: 'visible', writable: false});
  Object.defineProperty(document, 'webkitVisibilityState', {value: 'visible', writable: false});
  document.dispatchEvent(new Event('visibilitychange'));
  document.hasFocus = function () { return true; };
  
  document.addEventListener('visibilitychange', function(e) {
      e.stopImmediatePropagation();
  }, true, true);
}

function enableIgnoreAutoPause() {
  // 防止直播自动暂停
  localStorage.setItem("freetimed", "1");
}
