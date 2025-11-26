/* Add audio on each page */
const snowAudio = document.createElement("audio");
const audioValueRange = document.createElement("input");

snowAudio.src = "../resources/audios/snow.ogg";
snowAudio.loop = true;

audioValueRange.type = "range";
audioValueRange.min = "0";
audioValueRange.max = "100";
audioValueRange.value = "5";
audioValueRange.step = "1";

audioValueRange.addEventListener("input", function () {
    snowAudio.volume = Number(audioValueRange.value) / 100;
});


document.addEventListener("click", function playOnce() {
    snowAudio.volume = Number(audioValueRange.value) / 100;
    snowAudio.play().catch(function() {
        snowAudio.play().then(() => {
           console.log("Audio Playing");
        });
    });
    document.removeEventListener("click", playOnce);
});


/* Navbar is global */
const navbarElements = [
    "<a href=\"./home.html\" title=\"Home page\">Home</a>",
    "<a href=\"./blog.html\" title=\"Blog page\">Blog</a>",
    "<a href=\"./projects.html\" title=\"Projects page\">Projects</a>",
    "<a href=\"./profile.html\" title=\"Profile page\">Profile</a>",
    "<p><strong>NOTE FOR USERS</strong>: To see latest version of the page, press <kbd>Ctrl</kbd> + <kbd>Shift</kbd>\n" +
    "        + <kbd>R</kbd>.</p>"
];

const header = document.querySelector("header");
const nav = document.createElement("nav");
for (const navbarElement of navbarElements) {
    nav.innerHTML += navbarElement + "\n";
}
header.prepend(nav);






