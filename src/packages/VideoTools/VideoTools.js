import { getValidDom } from '../../common.js'
import { curVersion } from '../Update/Update.js'
import { initPkg_VideoTools_Camera } from './Camera/Main/Camera.js'
import { initPkg_VideoTools_Cinema } from './Cinema/Cinema.js'
import { initPkg_VideoTools_Filter } from './VideoFilter/VideoFilter.js'
import { initPkg_VideoTools_Joysound } from './Joysound/Joysound.js'
import { initPkg_VideoTools_MetaData } from './MetaData/MetaData.js'
import { initPkg_VideoTools_VideoRecall } from './VideoRecall/VideoRecall.js'
import { initPkg_VideoTools_VideoSpeed } from './VideoSpeed/VideoSpeed.js'
import { initPkg_VideoTools_VideoSync } from './VideoSync/VideoSync.js'
import { initPkg_VideoTools_VideoZoom } from './VideoZoom/VideoZoom.js'
import { DomHook } from '../../require/DomHook/DomHook.js'

let liveVideoNode // 直播video标签节点
let isInput = false
let videotools_num = 0

export function getVideoToolsLiveVideoNode() {
  liveVideoNode = liveVideoNode || document.querySelector('.layout-Player-videoEntity video')
  return liveVideoNode
}

export function setVideoToolsLiveVideoNode(node) {
  liveVideoNode = node
}

export function getVideoToolsIsInput() {
  return isInput
}

export function setVideoToolsIsInput(value) {
  isInput = !!value
}
export function initPkg_VideoTools() {
  let timer = setInterval(() => {
    const controlbar = getValidDom(['.right-e7ea5d', '.right-17e251'])
    if (controlbar) {
      clearInterval(timer)
      setVideoToolsLiveVideoNode(document.querySelector('.layout-Player-videoEntity video'))
      document.getElementsByClassName('disable-23f484')[0].innerHTML = `DouyuEx_${curVersion}`
      initPkg_VideoTools_Module()
      initPkg_VideoTools_Func()
    }
    videotools_num++
    if (videotools_num >= 100) {
      clearInterval(timer)
    }
  }, 1500)
}

function initPkg_VideoTools_Module() {
  // 添加模块
  initPkg_VideoTools_Joysound()
  initPkg_VideoTools_VideoSpeed()
  initPkg_VideoTools_Cinema()
  initPkg_VideoTools_VideoSync()
  initPkg_VideoTools_VideoRecall()
  initPkg_VideoTools_Filter()
  initPkg_VideoTools_Camera()
  initPkg_VideoTools_VideoZoom()
  initPkg_VideoTools_MetaData()
}

function initPkg_VideoTools_Func() {
  document.getElementById('js-player-toolbar').addEventListener('mouseover', () => {
    document.getElementsByClassName('filter__wrap')[0].style.display = 'none'
  })
  document.getElementById('js-player-asideMain').addEventListener('mouseover', () => {
    document.getElementsByClassName('filter__wrap')[0].style.display = 'none'
  })
  getValidDom(['.inputView-2a65aa', '.inputView-620ab7']).addEventListener('focus', () => {
    setVideoToolsIsInput(true)
  })

  getValidDom(['.inputView-2a65aa', '.inputView-620ab7']).addEventListener('blur', () => {
    setVideoToolsIsInput(false)
  })
  let m = new DomHook('.app-f0f9c7', false, (m) => {
    if (m.length > 0) {
      if (m[0].addedNodes.length > 0) {
        setVideoToolsIsInput(true)
      } else if (m[0].removedNodes.length > 0) {
        setVideoToolsIsInput(false)
      }
    }
  })
}
