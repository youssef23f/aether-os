export default async function handler(req, res) {
  // 1. السماح بطلبات POST فقط
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, preferredModel, systemPersona } = req.body || {};
    const lowerPrompt = (prompt || '').toLowerCase();

    // 2. التحقق من وجود المفتاح
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      return res.status(200).json({ 
        result: "⚠️ تحذير: لم يتم العثور على GROQ_API_KEY في إعدادات Vercel. يرجى إضافته في Environment Variables." 
      });
    }

    // 🎯 3. Auto Router - تحديد الموديل تلقائياً
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

    // 🎨 4. توليد الصور بـ FLUX.1-dev
    if (selectedModel === 'flux-1-dev') {
      const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${Math.floor(Math.random() * 10000)}&model=flux`;
      return res.status(200).json({
        result: `تم توليد الصورة بنجاح بواسطة **FLUX.1-dev** 🎨`,
        image: imageUrl,
        usedModel: 'FLUX.1-dev'
      });
    }

    // 🌐 5. خريطة الموديلات المستقرة على Groq
    let apiModelName = 'llama-3.3-70b-versatile';

    if (selectedModel === 'deepseek-chat') {
      apiModelName = 'deepseek-r1-distill-llama-70b';
    } else if (selectedModel === 'qwen-3-instruct') {
      apiModelName = 'qwen-2.5-32b';
    } else if (selectedModel === 'llama-3.1-70b-instruct') {
      apiModelName = 'llama-3.3-70b-versatile';
    }

    // 🚀 6. طلب Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: apiModelName,
        messages: [
          { role: 'system', content: `You are AETHER AI (${systemPersona || 'developer'}). Respond in Arabic concisely and helpful.` },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(200).json({
        result: `❌ خطأ من Groq API: ${data.error?.message || 'مشكلة في الاستجابة'}`
      });
    }

    const aiText = data.choices?.[0]?.message?.content || 'لم يتم استلام نص.';

    return res.status(200).json({
      result: aiText,
      usedModel: selectedModel
    });

  } catch (error) {
    return res.status(200).json({ 
      result: `⚠️ حدث خطأ أثناء الاتصال: ${error.message}` 
    });
  }
}