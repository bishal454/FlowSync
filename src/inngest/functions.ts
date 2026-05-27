// src/inngest/functions.ts
import { inngest } from "./client";
import prisma from "@/lib/db";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

import { generateText } from "ai";
import * as Sentry from "@sentry/nextjs";
import { setHeapSnapshotNearHeapLimit } from "node:v8";

//it will create an instance of the Google Generative AI client that we can use to call the Google Generative AI API. So, we can use this client to generate text using the Google Generative AI API using generateText..
const google = createGoogleGenerativeAI();
const openai = createOpenAI();

const anthropic = createAnthropic();

// it will listen to the event called execute/ai and then it will execute the code inside the function.  we can use this function to generate text using the Google Generative AI API.

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    Sentry.setConversationId(event.id);
    await step.sleep("pretend", "5s");
    Sentry.metrics.count("test_metric", 1);
    Sentry.logger.info("User triggered test log", {
      log_source: "sentry_test",
    });
    const { steps: geministeps } = await step.ai.wrap(
      "gemini-generate-text", // this is the name of the step that we can use to reference it later in the workflow.
      generateText, // it generate text which takes an object as an argument that contains the model, system, and prompt
      {
        model: google("gemini-2.5-flash"), //model to use for generating text
        system: "You are a helpful assistant ", //instructions to the model
        prompt: "what is 2+2?", //input text that we want to generate a response for.
        experimental_telemetry: {
          isEnabled: true,
          functionId: "gemini-generate-text",
          recordInputs: true,
          recordOutputs: true,
        },
      },
    );

    const { steps: openaiSteps } = await step.ai.wrap(
      "openai-generate-text", // this is the name of the step that we can use to reference it later in the workflow.
      generateText, // it generate text which takes an object as an argument that contains the model, system, and prompt
      {
        model: openai("gpt-4"), //model to use for generating text
        system: "You are a helpful assistant ", //instructions to the model
        prompt: "what is 2+2?", //input text that we want to generate a response for.
        experimental_telemetry: {
          isEnabled: true,
          functionId: "openai-generate-text",
          recordInputs: true,
          recordOutputs: true,
        },
      },
    );

    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text", // this is the name of the step that we can use to reference it later in the workflow.
      generateText, // it generate text which takes an object as an argument that contains the model, system, and prompt
      {
        model: anthropic("claude-sonnet-4-5"), //model to use for generating text
        system: "You are a helpful assistant ", //instructions to the model
        prompt: "what is 2+2?", //input text that we want to generate a response for.
        experimental_telemetry: {
          isEnabled: true,
          functionId: "anthropic-generate-text",
          recordInputs: true,
          recordOutputs: true,
        },
      },
    );
    return {
      geministeps,
      openaiSteps,
      anthropicSteps,
    };
  },
);
