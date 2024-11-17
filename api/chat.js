require('dotenv').config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userInput = req.body.input;

    try {
      const response = await fetch('https://api.groq.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({ query: userInput }),
      });

      const data = await response.json();
      res.status(200).json({ reply: data.response });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch response' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
