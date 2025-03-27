import express from 'express';
import Survey from '../models/Survey.js';
import SurveyResponse from '../models/SurveyResponse.js';

const router = express.Router();

// Get specific survey by ID
router.get('/:surveyId', async (req, res, next) => {
  try {
    const survey = await Survey.findById(req.params.surveyId);
    if (!survey) return res.status(404).json({ message: 'Survey not found' });
    res.json(survey);
  } catch (error) {
    next(error);
  }
});
// Submit survey response
router.post('/:surveyId/submit', async (req, res, next) => {
  const { userId, responses } = req.body;
  try {
    const survey = await Survey.findById(req.params.surveyId);
    if (!survey) return res.status(404).json({ message: 'Survey not found' });

    if (responses.length !== survey.questions.length) {
      return res.status(400).json({ message: 'Incomplete survey responses' });
    }

    const newResponse = new SurveyResponse({
      surveyId: survey._id,
      userId,
      responses
    });

    await newResponse.save();
    res.status(201).json({ message: 'Survey submitted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;