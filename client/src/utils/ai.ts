export type ChisomoMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface FetchDeepSeekChatOptions {
  messages: OpenRouterMessage[];
  siteUrl?: string;
  siteTitle?: string;
}

export async function fetchDeepSeekChat({ messages, siteUrl, siteTitle }: FetchDeepSeekChatOptions): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OpenRouter API key not set');

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
  if (siteUrl) headers['HTTP-Referer'] = siteUrl;
  if (siteTitle) headers['X-Title'] = siteTitle;

  const body = JSON.stringify({
    model: 'deepseek/deepseek-r1-0528:free',
    messages,
  });

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers,
    body,
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('No response from DeepSeek');
  return content;
} 