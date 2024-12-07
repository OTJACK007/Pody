import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const createThread = async () => {
  const thread = await openai.beta.threads.create();
  return thread;
};

export const sendMessage = async (threadId: string, content: string) => {
  await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content
  });

  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: 'asst_2s4HmNJNOleA8gWNv7iKZ396'
  });

  let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);

  // Poll for completion
  while (runStatus.status !== 'completed') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    
    if (runStatus.status === 'failed') {
      throw new Error('Failed to get response from AI');
    }
  }

  const messages = await openai.beta.threads.messages.list(threadId);
  const lastMessage = messages.data[0];

  return {
    id: lastMessage.id,
    content: lastMessage.content[0].text.value,
    role: lastMessage.role
  };
};