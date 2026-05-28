// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://0f2ab271bb6a59d974e8c387d5aad4d7@o4511456451756032.ingest.us.sentry.io/4511463758823424",


  integrations: [

    // send console.log, console.warn, and console.error calls as logs to Sentry

    //Add the Vercel AI integration to Sentry, which allows you to record inputs and outputs of AI calls for better debugging and monitoring.

    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
    // Use metrics in both server and client code

  ],
  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
