
import { Router } from 'express';
import { nanoid } from "nanoid";
import urlModel from '../models/url.js';
import { analytics, createShortUrl, redirectShortId } from '../controllers/urlcontroller.js';

const urlRouter = new Router();

urlRouter.post('/new', createShortUrl);
urlRouter.get('/:shortId',redirectShortId);
urlRouter.get('/analytics/:shortId',analytics)

export default urlRouter;