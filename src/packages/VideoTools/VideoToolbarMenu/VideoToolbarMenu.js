let VideoToolbarMenu_isOpen = false;
let VideoToolbarMenu_filterExpanded = false;
let VideoToolbarMenu_closeTimer = null;

function initPkg_VideoTools_VideoToolbarMenu() {
    VideoToolbarMenu_insertDom();
    VideoToolbarMenu_bindEvents();
}

function VideoToolbarMenu_insertDom() {
    const root = document.createElement("div");
    root.id = "ex-vtoolbar-menu";
    root.className = "vtoolbar-menu";
    root.innerHTML = `
        <button type="button" class="vtoolbar-menu__trigger" title="DouyuEx Ver${curVersion}" aria-expanded="false" aria-haspopup="true">
            ${VideoToolbarMenu_pokeballSvg}
        </button>
        <div class="vtoolbar-menu__dropdown" role="menu" aria-label="DouyuEx Ver${curVersion}">
            <button type="button" class="vtoolbar-menu__item" id="vtoolbar-menu-joysound" role="menuitem">
                <span class="vtoolbar-menu__item-icon" id="vtoolbar-joysound-icon"></span>
                <span class="vtoolbar-menu__item-label">Joysound 音效</span>
                <span class="vtoolbar-menu__switch" id="vtoolbar-joysound-switch" aria-hidden="true">
                    <span class="vtoolbar-menu__switch-thumb"></span>
                </span>
            </button>
            <button type="button" class="vtoolbar-menu__item vtoolbar-menu__item--filter" id="vtoolbar-menu-filter" role="menuitem" aria-expanded="false">
                <span class="vtoolbar-menu__item-icon">${VideoToolbarMenu_iconFilter}</span>
                <span class="vtoolbar-menu__item-label">画面滤镜</span>
                ${VideoToolbarMenu_iconChevron}
            </button>
            <div class="vtoolbar-menu__divider" role="separator"></div>
            <button type="button" class="vtoolbar-menu__item" id="vtoolbar-menu-expanel" role="menuitem">
                <span class="vtoolbar-menu__item-icon">${VideoToolbarMenu_pokeballSvg}</span>
                <span class="vtoolbar-menu__item-label">DouyuEx 工具条</span>
            </button>
        </div>
        <div class="vtoolbar-menu__filter-host" id="ex-vtoolbar-filter-host"></div>
    `;
    const toolbar = getValidDom([".right-e7ea5d", ".right-17e251"]);
    if (toolbar) {
        toolbar.insertBefore(root, toolbar.childNodes[0]);
    }
}

function VideoToolbarMenu_getRoot() {
    return document.getElementById("ex-vtoolbar-menu");
}

function VideoToolbarMenu_isInsideMenu(target) {
    const root = VideoToolbarMenu_getRoot();
    return !!(root && target && root.contains(target));
}

function VideoToolbarMenu_onTriggerEnter() {
    clearTimeout(VideoToolbarMenu_closeTimer);
    VideoToolbarMenu_open();
}

function VideoToolbarMenu_onMenuZoneEnter() {
    clearTimeout(VideoToolbarMenu_closeTimer);
    if (!VideoToolbarMenu_isOpen) {
        VideoToolbarMenu_open();
    }
}

function VideoToolbarMenu_scheduleClose() {
    clearTimeout(VideoToolbarMenu_closeTimer);
    VideoToolbarMenu_closeTimer = setTimeout(() => {
        VideoToolbarMenu_close();
    }, 80);
}

function VideoToolbarMenu_onMenuZoneLeave(e) {
    const related = e.relatedTarget;
    if (VideoToolbarMenu_isInsideMenu(related)) {
        return;
    }
    VideoToolbarMenu_scheduleClose();
}

function VideoToolbarMenu_bindHoverTarget(el, isTrigger) {
    if (!el) {
        return;
    }
    if (isTrigger) {
        el.addEventListener("mouseenter", VideoToolbarMenu_onTriggerEnter);
        el.addEventListener("pointerenter", VideoToolbarMenu_onTriggerEnter);
    } else {
        el.addEventListener("mouseenter", VideoToolbarMenu_onMenuZoneEnter);
        el.addEventListener("pointerenter", VideoToolbarMenu_onMenuZoneEnter);
    }
    el.addEventListener("mouseleave", VideoToolbarMenu_onMenuZoneLeave);
    el.addEventListener("pointerleave", VideoToolbarMenu_onMenuZoneLeave);
}

function VideoToolbarMenu_bindEvents() {
    const root = VideoToolbarMenu_getRoot();
    const trigger = root.querySelector(".vtoolbar-menu__trigger");
    const dropdown = root.querySelector(".vtoolbar-menu__dropdown");
    const filterHost = document.getElementById("ex-vtoolbar-filter-host");
    const filterBtn = document.getElementById("vtoolbar-menu-filter");
    const expanelBtn = document.getElementById("vtoolbar-menu-expanel");

    VideoToolbarMenu_bindHoverTarget(trigger, true);
    VideoToolbarMenu_bindHoverTarget(dropdown, false);
    VideoToolbarMenu_bindHoverTarget(filterHost, false);

    filterBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        VideoToolbarMenu_toggleFilterPanel();
    });

    expanelBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (typeof showExPanel === "function") {
            showExPanel();
        }
    });

    document.addEventListener("keydown", VideoToolbarMenu_onKeydown);
}

function VideoToolbarMenu_onKeydown(e) {
    if (e.key === "Escape") {
        VideoToolbarMenu_close();
        VideoToolbarMenu_hideFilterPanel();
    }
}

function VideoToolbarMenu_open() {
    const root = document.getElementById("ex-vtoolbar-menu");
    if (!root) {
        return;
    }
    VideoToolbarMenu_isOpen = true;
    root.classList.add("is-open");
    const trigger = root.querySelector(".vtoolbar-menu__trigger");
    trigger.setAttribute("aria-expanded", "true");
}

function VideoToolbarMenu_close() {
    const root = document.getElementById("ex-vtoolbar-menu");
    if (!root) {
        return;
    }
    clearTimeout(VideoToolbarMenu_closeTimer);
    VideoToolbarMenu_isOpen = false;
    root.classList.remove("is-open");
    const trigger = root.querySelector(".vtoolbar-menu__trigger");
    trigger.setAttribute("aria-expanded", "false");
    VideoToolbarMenu_hideFilterPanel();
}

function VideoToolbarMenu_toggleFilterPanel() {
    if (VideoToolbarMenu_filterExpanded) {
        VideoToolbarMenu_hideFilterPanel();
    } else {
        VideoToolbarMenu_showFilterPanel();
    }
}

function VideoToolbarMenu_showFilterPanel() {
    const host = document.getElementById("ex-vtoolbar-filter-host");
    const filterBtn = document.getElementById("vtoolbar-menu-filter");
    if (!host) {
        return;
    }
    VideoToolbarMenu_filterExpanded = true;
    host.classList.add("is-visible");
    if (filterBtn) {
        filterBtn.classList.add("is-active");
        filterBtn.setAttribute("aria-expanded", "true");
    }
    if (typeof Filter_showPanel === "function") {
        Filter_showPanel();
    }
}

function VideoToolbarMenu_hideFilterPanel() {
    const host = document.getElementById("ex-vtoolbar-filter-host");
    const filterBtn = document.getElementById("vtoolbar-menu-filter");
    VideoToolbarMenu_filterExpanded = false;
    if (host) {
        host.classList.remove("is-visible");
    }
    if (filterBtn) {
        filterBtn.classList.remove("is-active");
        filterBtn.setAttribute("aria-expanded", "false");
    }
    if (typeof Filter_hidePanel === "function") {
        Filter_hidePanel();
    }
}

function VideoToolbarMenu_getFilterHost() {
    return document.getElementById("ex-vtoolbar-filter-host");
}
