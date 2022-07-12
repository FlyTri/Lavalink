const fs = require("fs");
const fetch = require("node-fetch");

const INCLUDE_PRERELEASES = process.env.PRERELEASES === "true";
const GITHUB_REPO = process.env.GITHUB_REPO || "Cog-Creators/Lavalink-Jars";

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
