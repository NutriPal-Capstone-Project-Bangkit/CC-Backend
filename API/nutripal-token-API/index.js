const { VertexAI } = require('@google-cloud/vertexai');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({ project: 'nutripal-4bd4e', location: 'us-central1' });
const model = 'gemini-1.5-pro-002';

// Define text variables first
const text1_1 = { text: `Diet plan: weightloss, Weight: 60 kg, Height: 180 cm, Sex: Male, Age: 18, Activity level: Moderately Active. Food: 1 serving contains 20g carbs, 60g protein, 10g fat` };
const textsi_1 = { text: `give output 20 words consisting of the BMR, needed calories perday, calories for the food, maximum serving for the food based on the diet plan and give recommendation. Give all output in id` };

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    'maxOutputTokens': 8192,
    'temperature': 1,
    'topP': 0.95,
  },
  safetySettings: [
    {
      'category': 'HARM_CATEGORY_HATE_SPEECH',
      'threshold': 'OFF',
    },
    {
      'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
      'threshold': 'OFF',
    },
    {
      'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      'threshold': 'OFF',
    },
    {
      'category': 'HARM_CATEGORY_HARASSMENT',
      'threshold': 'OFF',
    }
  ],
  systemInstruction: {
    parts: [textsi_1]
  },
});

const chat = generativeModel.startChat({});

async function sendMessage(message) {
  const streamResult = await chat.sendMessageStream(message);
  process.stdout.write('stream result: ' + JSON.stringify((await streamResult.response).candidates[0].content) + '\n');
}

async function generateContent() {
  await sendMessage([text1_1]);
}

generateContent();
