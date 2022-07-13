const fs = require("fs")
let application = fs.readFileSync("./application.yml", "utf8")

if (process.env.PORT !== undefined) {
    application = application.replace("$PORT", process.env.PORT)
} else {
    application = application.replace("$PORT", 443)
}

fs.writeFileSync("./application.yml", application)
