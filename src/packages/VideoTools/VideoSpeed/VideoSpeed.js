function initPkg_VideoTools_VideoSpeed() {
    initPkg_VideoTools_VideoSpeed_Dom();
    initPkg_VideoTools_VideoSpeed_Func();
}

function initPkg_VideoTools_VideoSpeed_Dom() {
    VideoSpeed_insertIcon();
}
function VideoSpeed_insertIcon() {
	let a = document.createElement("div");
    a.id = "ex-videospeed";
    a.innerHTML = `
    <div class="videospeed__wrap">
        <div class="videospeed__panel">
            <ul>
                <li id="videospeed__2.0">2.0x</li>
                <li id="videospeed__1.5">1.5x</li>
                <li id="videospeed__1.25">1.25x</li>
                <li id="videospeed__1.0">1.0x</li>
                <li id="videospeed__0.75">0.75x</li>
                <li id="videospeed__0.5">0.5x</li>
            </ul>
        </div>
    </div>
    <svg t="1595682415782" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15132" width="24" height="24"><path d="M566.857143 109.714286a36.571429 36.571429 0 0 1 2.742857 73.051428L566.857143 182.857143H219.428571a36.571429 36.571429 0 0 0-36.48 33.828571L182.857143 219.428571v585.142858a36.571429 36.571429 0 0 0 33.828571 36.48L219.428571 841.142857h585.142858a36.571429 36.571429 0 0 0 36.48-33.828571L841.142857 804.571429V292.571429a36.571429 36.571429 0 0 1 73.051429-2.742858L914.285714 292.571429v512a109.714286 109.714286 0 0 1-105.6 109.641142L804.571429 914.285714H219.428571a109.714286 109.714286 0 0 1-109.641142-105.6L109.714286 804.571429V219.428571a109.714286 109.714286 0 0 1 105.6-109.641142L219.428571 109.714286h347.428572z m92.068571 255.707428c33.389714 0 59.538286 13.677714 78.445715 41.837715 17.700571 26.550857 26.550857 62.354286 26.550857 107.410285 0 45.056-8.850286 80.859429-26.550857 107.410286-18.907429 27.757714-45.056 41.837714-78.445715 41.837714-33.792 0-59.940571-14.08-78.445714-41.837714-17.700571-26.550857-26.550857-62.354286-26.550857-107.410286 0-45.056 8.850286-80.859429 26.550857-107.410285 18.505143-28.16 44.653714-41.837714 78.445714-41.837715z m-176.201143 232.118857c8.850286 0 16.091429 2.816 22.528 9.252572 6.034286 6.034286 9.252571 13.677714 9.252572 22.528s-3.218286 16.091429-9.252572 22.528c-6.436571 5.632-13.677714 8.850286-22.528 8.850286s-16.493714-3.218286-22.125714-8.850286a30.061714 30.061714 0 0 1-9.252571-22.528c0-8.850286 2.816-16.493714 9.252571-22.528 5.632-6.436571 13.275429-9.252571 22.125714-9.252572z m-91.318857-226.486857V658.285714h-47.067428V427.776c-17.298286 15.689143-39.021714 27.355429-65.572572 34.998857v-46.665143c12.873143-3.218286 26.550857-8.850286 41.033143-16.896 14.482286-8.850286 26.550857-18.102857 36.205714-28.16h35.401143z m267.52 34.194286c-22.930286 0-39.021714 12.470857-48.274285 38.217143-6.436571 17.298286-9.654857 41.033143-9.654858 71.204571 0 29.769143 3.218286 53.504 9.654858 71.204572 9.252571 25.344 25.344 38.217143 48.274285 38.217143 22.528 0 38.619429-12.873143 48.274286-38.217143 6.436571-17.700571 9.654857-41.435429 9.654857-71.204572 0-30.171429-3.218286-53.906286-9.654857-71.204571-9.654857-25.746286-25.746286-38.217143-48.274286-38.217143zM822.857143 89.563429a18.285714 18.285714 0 0 1 10.349714 3.218285l56.045714 38.418286a18.285714 18.285714 0 0 1 0 30.171429l-56.045714 38.418285A18.285714 18.285714 0 0 1 804.571429 184.722286V107.849143a18.285714 18.285714 0 0 1 18.285714-18.285714z m-128 0a18.285714 18.285714 0 0 1 10.349714 3.218285l56.045714 38.418286a18.285714 18.285714 0 0 1 0 30.171429l-56.045714 38.418285A18.285714 18.285714 0 0 1 676.571429 184.722286V107.849143a18.285714 18.285714 0 0 1 18.285714-18.285714z" fill="#ffffff" p-id="15133"></path></svg>
    `;
    let b = document.getElementsByClassName("right-e7ea5d")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function initPkg_VideoTools_VideoSpeed_Func() {
    document.getElementById("ex-videospeed").addEventListener("mouseover", function() {
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "block";
    });
    document.getElementsByClassName("videospeed__wrap")[0].addEventListener("mouseout", function() {
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
    });

    document.getElementById("videospeed__2.0").addEventListener("click", () => {
        let video = document.querySelector(".layout-Player-videoEntity video");
        video.playbackRate = 2;
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
    });
    document.getElementById("videospeed__1.5").addEventListener("click", () => {
        let video = document.querySelector(".layout-Player-videoEntity video");
        video.playbackRate = 1.5;
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
    });
    document.getElementById("videospeed__1.25").addEventListener("click", () => {
        let video = document.querySelector(".layout-Player-videoEntity video");
        video.playbackRate = 1.25;
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
    });
    document.getElementById("videospeed__1.0").addEventListener("click", () => {
        let video = document.querySelector(".layout-Player-videoEntity video");
        video.playbackRate = 1;
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
    });
    document.getElementById("videospeed__0.75").addEventListener("click", () => {
        let video = document.querySelector(".layout-Player-videoEntity video");
        video.playbackRate = 0.75;
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
    });
    document.getElementById("videospeed__0.5").addEventListener("click", () => {
        let video = document.querySelector(".layout-Player-videoEntity video");
        video.playbackRate = 0.5;
        document.getElementsByClassName("videospeed__wrap")[0].style.display = "none";
    });
}
