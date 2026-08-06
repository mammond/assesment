import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/generate-narrative', async (req, res) => {
    try {
      const patientData = req.body;
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `
      You are a professional Medical Social Worker. Please generate a concise, professional Narrative Case Summary for the following patient assessment data. 
      Do not include any greeting or conversational filler. Just the professional narrative.
      Include the patient's demographics, living condition, income vs expenses, final CLS classification, and recommended action.

      Patient Data:
      ${JSON.stringify(patientData, null, 2)}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      res.json({ narrative: response.text });
    } catch (error) {
      console.error('Error generating narrative:', error);
      res.status(500).json({ error: 'Failed to generate narrative' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
