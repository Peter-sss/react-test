
// 切换全屏的方法
export const fullScreen = (isOpen, target) => {
    let dom = target || void 0
    let open_list = ['requestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullScreen', 'msRequestFullscreen']
    let cancel_list = ['exitFullscreen', 'mozCancelFullScreen', 'webkitCancelFullScreen', 'msExitFullscreen']
    let fn = void 0
    if (isOpen) {
        fn = open_list.find( n => Boolean(dom[n]))
        fn && dom[fn]()
    } else {
        fn = cancel_list.find(n => Boolean(document[n]))
        fn && document[fn]()
    }
}

// 判断是否是全屏
export const isFullScreen = () => {
    return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
}

// 挂载监听监测是否处于全屏
export const addWatchFullScreen = (action) => {
    document.addEventListener("webkitfullscreenchange", action);
    document.addEventListener("mozfullscreenchange", action);
    document.addEventListener("fullscreenchange", action);
    document.addEventListener("MSFullscreenChange", action);
}

// 卸载全屏监听
export const removeWatchFullScreen = (action) => {
    document.removeEventListener("webkitfullscreenchange", action);
    document.removeEventListener("mozfullscreenchange", action);
    document.removeEventListener("fullscreenchange", action);
    document.removeEventListener("MSFullscreenChange", action);
}