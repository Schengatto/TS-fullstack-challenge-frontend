import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import webpack from "@cypress/webpack-preprocessor";

async function setupNodeEvents(
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
    // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
    await addCucumberPreprocessorPlugin(on, config);

    on(
        "file:preprocessor",
        webpack({
            webpackOptions: {
                resolve: {
                    extensions: [".ts", ".js"],
                },
                module: {
                    rules: [
                        {
                            test: /\.feature$/,
                            use: [
                                {
                                    loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                                    options: config,
                                },
                            ],
                        },
                    ],
                },
            },
        })
    );

    // Make sure to return the config object as it might have been modified by the plugin.
    return config;
}

module.exports = defineConfig({
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
    e2e: {
        setupNodeEvents,
        video: false,
        videosFolder: "cypress/report/video",
        screenshotsFolder: "cypress/report/screenshots",
        specPattern: ["**/*.feature", "cypress/tests/**/*.cy.{js,jsx,ts,tsx}"],
    },
    env: {
        TAGS: "not @ignore",
        BASE_URL: "http://localhost:8080",
    },
});
