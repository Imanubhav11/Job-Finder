import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { getAllJobs, getJobById, getRecruiterJobs, postJob } from '../controllers/jobController.js';

const router = express.Router();

router.route('/post').post(isAuthenticated,postJob);
router.route('/get').get(isAuthenticated,getAllJobs);
router.route('/getrecuriterjobs').get(isAuthenticated,getRecruiterJobs);
router.route('/get/:id').get(isAuthenticated,getJobById);

export default router;