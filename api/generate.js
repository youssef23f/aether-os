export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, preferredModel, systemPersona, fileContext, userMemory } = req.body || {};
    const lowerPrompt = (prompt || '').toLowerCase();

    // 1. التحقق من وجود المفتاح
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      return res.status(200).json({ 
        result: "⚠️ تحذير: لم يتم العثور على GROQ_API_KEY في إعدادات Vercel." 
      });
    }

    // 🎯 2. Auto Router - تحديد الموديل
    let selectedModel = preferredModel;
    if (!preferredModel || preferredModel === 'auto-router') {
      if (/صورة|ارسم|صمم|generate image|draw|picture|flux/i.test(lowerPrompt)) {
        selectedModel = 'flux-1-dev';
      } else if (/فكر|منطق|حلل|حل مشكلة|bug|reasoning|algorithm|خوارزمية|شرح معقد/i.test(lowerPrompt)) {
        selectedModel = 'deepseek-chat';
      } else {
        selectedModel = 'llama-3.1-70b-instruct';
      }
    }

    // 🎨 3. توليد الصور بـ FLUX.1-dev
    if (selectedModel === 'flux-1-dev') {
      const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${Math.floor(Math.random() * 10000)}&model=flux`;
      return res.status(200).json({
        result: `تم توليد الصورة بنجاح بواسطة **FLUX.1-dev** 🎨`,
        image: imageUrl,
        usedModel: 'FLUX.1-dev'
      });
    }

    // 🌐 4. توجيه الموديلات لـ Groq API
    let apiModelName = selectedModel === 'deepseek-chat' 
      ? 'deepseek-r1-distill-llama-70b' 
      : 'llama-3.3-70b-versatile';

    // 🧠 5. بناء النظام السياقي (System Context) بما يشمل الذاكرة والملفات
    let systemInstruction = `You are AETHER AI (${systemPersona || 'developer'}). Respond concisely and helpful in Arabic.`;

    if (userMemory && userMemory.length > 0) {
      systemInstruction += `\n\n[USER MEMORY LOG]:\n` + userMemory.map(m => `- ${m.text}`).join('\n');
    }

    if (fileContext) {
      systemInstruction += `\n\n[ATTACHED FILE CONTEXT]:\nName: ${fileContext.name}\nContent:\n${fileContext.content.slice(0, 4000)}`;
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
          { role: 'system', content: systemInstruction },
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