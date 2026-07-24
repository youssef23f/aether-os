export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, preferredModel, systemPersona } = req.body;
    const lowerPrompt = (prompt || '').toLowerCase();

    // 🎯 1. Auto Router - تحديد الموديل تلقائياً
    let selectedModel = preferredModel;

    if (!preferredModel || preferredModel === 'auto-router') {
      if (/صورة|ارسم|صمم|generate image|draw|picture|flux/i.test(lowerPrompt)) {
        selectedModel = 'flux-1-dev';
      } else if (/فكر|منطق|حلل|حل مشكلة|bug|reasoning|algorithm|خوارزمية|شرح معقد/i.test(lowerPrompt)) {
        selectedModel = 'deepseek-chat';
      } else if (/كود|برمج|react|python|html|css|javascript|database/i.test(lowerPrompt)) {
        selectedModel = 'llama-3.1-70b-instruct';
      } else {
        selectedModel = 'qwen-3-instruct';
      }
    }

    // 🎨 2. توليد الصور بـ FLUX.1-dev
    if (selectedModel === 'flux-1-dev') {
      const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${Math.floor(Math.random() * 10000)}&model=flux`;
      return res.status(200).json({
        result: `تم توليد الصورة بنجاح بواسطة **FLUX.1-dev** 🎨`,
        image: imageUrl,
        usedModel: 'FLUX.1-dev'
      });
    }

    // 🌐 3. توجيه الموديلات لـ Groq API
    let apiModelName = 'llama-3.1-70b-versatile';
    if (selectedModel === 'deepseek-chat') apiModelName = 'deepseek-r1-distill-llama-70b';
    if (selectedModel === 'qwen-3-instruct') apiModelName = 'qwen-2.5-coder-32b-instruct';
    if (selectedModel === 'llama-3.1-70b-instruct') apiModelName = 'llama-3.1-70b-versatile';

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: apiModelName,
        messages: [
          { role: 'system', content: `You are AETHER AI (${systemPersona || 'developer'}). Respond concisely.` },
          { role: 'user', content: prompt },
        ],
        temperature: 0.6,
      }),
    });

    const data = await response.json();
    const aiText = data.choices?.[0]?.message?.content || 'تم استلام طلبك وبانتظار الرد.';

    return res.status(200).json({
      result: aiText,
      usedModel: selectedModel
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}