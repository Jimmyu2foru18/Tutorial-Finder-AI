import express from 'express';
import { OpenAIService } from '../services/openaiService.js';
import { ErrorHandler } from '../services/errorHandler.js';
import { AuthService } from '../services/authService.js';

const router = express.Router();
const openAIService = new OpenAIService();

router.post('/generate', 
  AuthService.authenticateJWT,
  ErrorHandler.wrapAsync(async (req, res) => {
    const { prompt, options } = req.body;
    const tutorial = await openAIService.generateTutorial(prompt, options);
    res.json({
      success: true,
      data: tutorial
    });
  })
);

export default router;