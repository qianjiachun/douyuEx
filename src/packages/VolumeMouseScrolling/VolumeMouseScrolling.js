function initPkg_VolumeMouseScrolling() {
    const volumeCheckInterval = setInterval(() => {
        const volumeElement = document.querySelector(".volume-07c230");
        const video = document.getElementById("__video2");

        if (volumeElement && video) {
            clearInterval(volumeCheckInterval);

            volumeElement.addEventListener("wheel", function (e) {
                e.preventDefault();
                e.stopPropagation();
                let currentVol = video.volume;
                let nextVol = e.deltaY < 0 ? Math.min(currentVol + 0.05, 1) : Math.max(currentVol - 0.05, 0);
                VolumeMouseScrolling_Handler(nextVol);
            }, { passive: false, capture: true });

            video.addEventListener("volumechange", () => {
                VolumeMouseScrolling_SyncVolumeUI(video.volume);
            });

            VolumeMouseScrolling_SyncVolumeUI(video.volume);
        }
    }, 500);
}

function VolumeMouseScrolling_SyncVolumeUI(volume) {
    try {
        const volumeElement = document.querySelector(".volume-07c230");
        const volume_front = document.querySelector(".volume-bar-93f0b0 .front-99e2aa");
        const volume_point = document.querySelector(".volume-bar-93f0b0 .point-6ef744");
        const volume_tips_text = document.querySelector(".volume-bar-93f0b0 .tips2-9bb064");

        if (volume_front) volume_front.style.height = `${volume * 100}px`;
        if (volume_point) volume_point.style.bottom = `${volume * 100 + 7}px`;
        if (volume_tips_text) volume_tips_text.textContent = `音量${Math.round(volume * 100)}%`;

        if (volumeElement) {
            if (volume === 0) {
                volumeElement.classList.add("custom-muted");
                volumeElement.classList.remove("custom-normal");
            } else {
                volumeElement.classList.add("custom-normal");
                volumeElement.classList.remove("custom-muted");
            }
        }
    } catch (e) { }
}

function VolumeMouseScrolling_Handler(volume) {
    const video = document.getElementById("__video2");
    if (!video) return;

    video.muted = (volume === 0);
    video.volume = volume;

    try {
        const keys = ["volume_muted_before_key", "player_storage_volume_h5p_room"];
        keys.forEach(key => {
            let raw = localStorage.getItem(key);
            if (raw) {
                let data = JSON.parse(raw);
                data.v = volume;
                localStorage.setItem(key, JSON.stringify(data));
            }
        });
    } catch (e) { }
}