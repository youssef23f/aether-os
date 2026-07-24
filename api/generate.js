export default async function handler(req, res) {
  // السماح بطلبات الـ POST فقط
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY is not set in environment variables.' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // موديل ذكي وسريع للبرمجة
        messages: [
          {
            role: 'system',
            content: 'You are AETHER.OS, an expert AI Software Engineer. Generate clean code and include filename hints like "// filename: filename.ext" if introducing a new file.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Groq API error' });
    }

    const aiMessage = data.choices[0]?.message?.content || 'No response generated.';
    return res.status(200).json({ result: aiMessage });

  } catch (error) {
    return res.status(500).json({ error: error.message || 'Server Internal Error' });
  }
}