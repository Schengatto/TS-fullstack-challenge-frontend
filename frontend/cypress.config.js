const { defineConfig } = require("cypress");

module.exports = defineConfig({
    viewportWidth: 1620,
    viewportHeight: 800,
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
        charts: true,
        reportPageTitle: "React challenge report page",
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
        reportDir: "cypress/report"
    },
    e2e: {
        setupNodeEvents(on) {
            // implement node event listeners here
            require("cypress-mochawesome-reporter/plugin")(on);
        },
        videosFolder: "cypress/report/video",
        screenshotsFolder: "cypress/report/screenshots"
    },
    env: {
        base_url: "http://localhost:8080"
    }
});
