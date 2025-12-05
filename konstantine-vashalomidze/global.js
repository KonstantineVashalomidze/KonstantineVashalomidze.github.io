/* Add audio on each page */
const snowAudio = document.createElement("audio");
const snowAudioPlayPauseButton = document.createElement("button");

snowAudio.src = "./resources/audios/sherekilebi.mp3";
snowAudio.loop = true;
snowAudio.preload = "auto";


snowAudioPlayPauseButton.textContent = "Play song";
snowAudioPlayPauseButton.id = "snowAudioPlayPauseButton";

snowAudioPlayPauseButton.addEventListener("click", function () {
    snowAudio.volume = 0.1;
    if (snowAudio.paused) {
        snowAudio.play().catch((error) => {
            console.error("Couldn't play: " + error);
        });
        snowAudioPlayPauseButton.textContent = "Pause song";
    } else {
        snowAudio.pause();
        snowAudioPlayPauseButton.textContent = "Play song";
    }
});



/* Navbar is global */
const navbarElements = [
    "<a href=\"./blog.html\" title=\"Blog page\">Blog</a>",
    "<a href=\"./profile.html\" title=\"Profile page\">Profile</a>",
    "<p><strong>NOTE FOR USERS</strong>: To see latest version of the page, press <kbd>Ctrl</kbd> + <kbd>Shift</kbd>\n" +
    "        + <kbd>R</kbd>.</p>"
];

const header = document.querySelector("header");
const nav = document.createElement("nav");
for (const navbarElement of navbarElements) {
    nav.innerHTML += navbarElement + "\n";
}
header.prepend(nav, snowAudio, snowAudioPlayPauseButton);






