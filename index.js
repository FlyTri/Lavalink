const fs = require("fs");
const fetch = require("node-fetch");

const INCLUDE_PRERELEASES = process.env.PRERELEASES === "true";
const GITHUB_REPO = process.env.GITHUB_REPO || "Cog-Creators/Lavalink-Jars";


const download = function (url, dest, cb) {
    const file = fs.createWriteStream(dest);
    fetch(url).then(res => {
        res.body.pipe(file)
        console.log("Downloading Lavalink.jar")
        file.on("finish", function () {
            console.log("Downloaded Lavalink.jar")
            file.close(cb);
        });
        file.on("error", function (err) {
            console.error("Filestream error while downloading Lavalink: " + err)
        })
    })
        .catch(function (err) {
            console.error("Fetch error while downloading Lavalink: " + err)
        })
};

function startLavalink() {
    console.log("Starting...");
    const { spawn } = require("child_process")
    const child = spawn("java", ["-jar", "Lavalink.jar"], { "stdio": "inherit" })

    child.on("error", (error) => {
        console.error(error);
    });

    child.on("close", (code) => {
        console.log(`Lavalink exited with code ${code}`);
    });

}


console.log("Fetching latest Lavalink.jar url...");
fetch("https://api.github.com/repos/" + GITHUB_REPO + "/releases")
    .then(res => res.json())
    .then(data => {

        for (let i = 0; i < data.length; ++i) { // (data[i].prerelease && INCLUDE_PRERELEASES)
            if (data[i].assets[0] && data[i].assets[0].browser_download_url) { //if dl exists
                if (!data[i].prerelease || INCLUDE_PRERELEASES) { //if not prerelease or if allow prerelease
                    console.log("Found version " + data[i].tag_name + " attempting to download...")
                    download(data[i].assets[0].browser_download_url, "./Lavalink.jar", startLavalink)
                    break;
                } else {
                    console.log("Skipping version " + data[i].tag_name + " because it is a prerelease and PRERELEASES is set to false.")
                }
            } else {
                console.log("Skipping version " + data[i].tag_name + " because no download is available.")
            }
        }

   })
   .catch(err => {
       console.error("Error occured when fetching latest release url: " + err)
   });

