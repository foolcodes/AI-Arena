import axios from "axios";
import dotenv from "dotenv";
// Personality behaviors for different models
dotenv.config();

const groqApiKey = process.env.GROQ_API_KEY;
const behaviors = {
  llama8b: `You're a quick-witted, meme-loving AI debater who drops savage one-liners and pop culture references while staying laser-focused on the topic. Your humor enhances your arguments, not distracts from them.`,

  llama70b: `You're an aggressive, no-holds-barred debater who mixes brutal roasts, spicy memes, and hard facts. You expose weak arguments with wit and sarcasm, but always stay on point.`,

  qwen: `You're a wise, meme-savvy elder AI who balances philosophical insights with hilarious, well-timed jokes. You use humor to make complex points more relatable, but you never lose the thread of the discussion.`,

  gemma: `You're a creative genius AI who builds arguments with wild metaphors, hilarious analogies, and viral meme references. Your thinking is unpredictable but deeply relevant to the topic.`,

  scout: `You're a tactical AI strategist who roasts with precision. You set meme-traps, bait weak arguments, then slam dunk them with brutal comebacks — always tying it back to the bigger debate narrative.`,

  mistral: `You're a savage debater who weaponizes facts like memes. You roast, you joke, you drop truth bombs — and your humor makes your factual takedowns even more devastating.`,
};

// Function to chat with different models via Groq with optimized token usage
const chatWithGroqModel = async (
  modelName,
  behavior,
  message,
  maxTokens = 300
) => {
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: modelName,
        messages: [
          { role: "system", content: behavior },
          { role: "user", content: message },
        ],
        temperature: 0.75,
        max_tokens: maxTokens, // Limited token output for efficiency
      },
      {
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data.choices[0].message.content;
  } catch (error) {
    console.error(
      `Error with model ${modelName}:`,
      error.response?.data || error.message
    );
    throw new Error(
      `Failed to get response from ${modelName}: ${error.message}`
    );
  }
};

// Model configurations with token optimizations
const modelConfigs = {
  llama8b: {
    name: "🚀 Llama 3 (8B)",
    model: "llama3-8b-8192",
    behavior: behaviors.llama8b,
    maxTokens: 250,
    description: "Fast and witty, uses pop culture references",
  },
  llama70b: {
    name: "💪 Llama 3 (70B)",
    model: "llama3-70b-8192",
    behavior: behaviors.llama70b,
    maxTokens: 300,
    description: "Aggressive and meme-loving, breaks down theories",
  },
  gemma: {
    name: "💎 Gemma 2",
    model: "gemma2-9b-it",
    behavior: behaviors.gemma,
    maxTokens: 250,
    description: "Creative and metaphorical thinker",
  },
  qwen: {
    name: "🧙 Qwen QWQ",
    model: "qwen-qwq-32b",
    behavior: behaviors.qwen,
    maxTokens: 300,
    description: "Balanced and nuanced with precise examples",
  },
  scout: {
    name: "🦅 LLaMA 4 Scout",
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    behavior: behaviors.scout,
    maxTokens: 350,
    description: "Strategic and systematic debater",
  },
  mistral: {
    name: "🔥 Mistral SABA",
    model: "mistral-saba-24b",
    behavior: behaviors.mistral,
    maxTokens: 300,
    description: "Savage humor backed by strong arguments",
  },
};

// Judge function with optimized token usage
const judgeDebate = async (topic, debateTranscript, model1, model2) => {
  // Create a more concise debate summary to save tokens
  const condensedTranscript = debateTranscript
    .map(
      (turn) =>
        `[${turn.turn}] ${turn.model}: ${turn.message.substring(0, 200)}${
          turn.message.length > 200 ? "..." : ""
        }`
    )
    .join("\n\n");

  const judgePrompt = `
As an impartial judge, analyze this debate and determine the winner:

TOPIC: ${topic}
DEBATERS: ${model1} vs ${model2}

TRANSCRIPT:
${condensedTranscript}

Provide your verdict:
WINNER: [Model name]
SCORE: [Score for ${model1}] - [Score for ${model2}] (scale 1-10)
REASONING: [Brief analysis of why this model won]
`;

  // Using LLaMA 4 Scout as judge - good reasoning with decent quota
  return await chatWithGroqModel(
    "meta-llama/llama-4-scout-17b-16e-instruct",
    "You are an objective, fair debate judge who evaluates arguments on their merits.",
    judgePrompt,
    400 // Higher token limit for judge to provide complete reasoning
  );
};

// Run a debate between two specified models with rate limit considerations
const runTwoModelDebate = async (topic, model1Id, model2Id, turns = 4) => {
  // Reduced default to 4 turns
  if (!modelConfigs[model1Id] || !modelConfigs[model2Id]) {
    throw new Error(
      `Invalid model selection: ${model1Id} or ${model2Id} not found`
    );
  }

  const model1 = modelConfigs[model1Id];
  const model2 = modelConfigs[model2Id];

  let lastMessage = `Hello`;
  let currentTurn = 0;
  const maxTurns = turns;
  const debate = [];

  try {
    while (currentTurn < maxTurns) {
      const isModel1Turn = currentTurn % 2 === 0;
      const currentModel = isModel1Turn ? model1 : model2;
      const opponentModel = isModel1Turn ? model2 : model1;

      console.log(
        `Getting response from ${currentModel.name} for turn ${
          currentTurn + 1
        }...`
      );

      // Create a much better prompt
      const prompt = `
    You are ${currentModel.name}, an AI debater.
    Your opponent is ${opponentModel.name}.
    
    Topic: "${topic}"
    
    Your task: Respond to what ${opponentModel.name} said previously.
    Make your arguments powerful, funny, witty (according to your personality), and DESTROY weak points if any.
    
    Previous message from ${opponentModel.name}:
    "${lastMessage}"
    
    Now, continue the debate with your reply.
    `;

      const response = await chatWithGroqModel(
        currentModel.model,
        currentModel.behavior,
        prompt,
        currentModel.maxTokens
      );

      debate.push({
        model: currentModel.name,
        message: response,
        turn: currentTurn + 1,
      });

      console.log(
        `Completed turn ${currentTurn + 1} with ${currentModel.name}`
      );

      lastMessage = response;
      currentTurn++;
    }

    console.log("Debate completed. Calling judge...");

    // Have the judge evaluate the debate
    const judgement = await judgeDebate(
      topic,
      debate,
      model1.name,
      model2.name
    );

    return {
      topic,
      model1: model1.name,
      model2: model2.name,
      debate,
      judgement,
    };
  } catch (error) {
    console.error("Error in debate:", error);
    throw error;
  }
};

export const startBattle = async (req, res) => {
  try {
    const { topic, model1, model2, turns } = req.body;

    if (!model1 || !model2) {
      return res.status(400).json({
        success: false,
        error: "Two models must be specified for the debate",
      });
    }

    console.log(
      `Starting debate between ${model1} and ${model2} on topic: ${topic}`
    );
    const debateResults = await runTwoModelDebate(
      topic,
      model1,
      model2,
      turns || 4
    );

    res.json({
      success: true,
      data: debateResults,
    });
  } catch (error) {
    console.error("Error in battle-chat API:", error);
    res.status(500).json({
      success: false,
      error: error.message || "An error occurred during the AI battle",
    });
  }
};
