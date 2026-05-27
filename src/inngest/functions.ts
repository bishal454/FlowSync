// src/inngest/functions.ts
import { inngest } from "./client";
import prisma from "@/lib/db";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

import { generateText } from "ai";
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
    await step.sleep("pretend", "5s");
    const { steps: geministeps } = await step.ai.wrap(
      "gemini-generate-text", // this is the name of the step that we can use to reference it later in the workflow.
      generateText, // it generate text which takes an object as an argument that contains the model, system, and prompt
      {
        model: google("gemini-2.5-flash"), //model to use for generating text
        system: "You are a helpful assistant ", //instructions to the model
        prompt: "what is 2+2?", //input text that we want to generate a response for.
      },
    );

    const { steps: openaiSteps } = await step.ai.wrap(
      "openai-generate-text", // this is the name of the step that we can use to reference it later in the workflow.
      generateText, // it generate text which takes an object as an argument that contains the model, system, and prompt
      {
        model: openai("gpt-4"), //model to use for generating text
        system: "You are a helpful assistant ", //instructions to the model
        prompt: "what is 2+2?", //input text that we want to generate a response for.
      },
    );

    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text", // this is the name of the step that we can use to reference it later in the workflow.
      generateText, // it generate text which takes an object as an argument that contains the model, system, and prompt
      {
        model: anthropic("claude-sonnet-4-5"), //model to use for generating text
        system: "You are a helpful assistant ", //instructions to the model
        prompt: "what is 2+2?", //input text that we want to generate a response for.
      },
    );
    return {
      geministeps,
      openaiSteps,
      anthropicSteps,
    };
  },
);
