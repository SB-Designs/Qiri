// Remove this line
require('dotenv').config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userInput = req.body?.input;

    if (!userInput) {
      res.status(400).json({ error: 'Input is required' });
      return;
    }

    try {
      const response = await fetch('https://api.groq.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, // Uses Vercel's injected variable
        },
        body: JSON.stringify({ query: userInput }),
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      res.status(200).json({ reply: data.response || 'No response' });
    } catch (error) {
      console.error('API Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
