// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://0f2ab271bb6a59d974e8c387d5aad4d7@o4511456451756032.ingest.us.sentry.io/4511463758823424",

Sentry.metrics.count("user_action", 1),
    Sentry.metrics.distribution("api_response_time", 150),


  integrations: [
    nodeProfilingIntegration(),
    // Use metrics in both server and client code


    // send console.log, console.warn, and console.error calls as logs to Sentry

    //Add the Vercel AI integration to Sentry, which allows you to record inputs and outputs of AI calls for better debugging and monitoring.
    Sentry.vercelAIIntegration({
      recordInputs: true,
      recordOutputs: true,
    }),
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],


   // Tracing must be enabled for profiling to work
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is evaluated only once per SDK.init call
  profileSessionSampleRate: 1.0,
  // Trace lifecycle automatically enables profiling during active traces
  profileLifecycle: 'trace',

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.

  streamGenAiSpans: true,
  // Add data like inputs and responses to/from LLMs and tools;
  // see https://docs.sentry.io/platforms/javascript/data-management/data-collected/ for more info
  sendDefaultPii: true,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
