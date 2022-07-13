if (process.env.PORT) {
    const fs = require("fs")
    let application = fs.readFileSync("./application.yml", "utf8")
    application = application.replace("$PORT", process.env.PORT)
    fs.writeFileSync("./application.yml", application)
}
