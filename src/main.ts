import express from 'express';

const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey != 'abc') {
        res.status(404).json({ message: 'not found' });
    } else {
        next();
    }
};

const apiRouter = express.Router();
apiRouter.get('/', (_: express.Request, res: express.Response) => {
    res.json({ message: 'ok' });
});

const authRouter = express.Router();
authRouter.get('/sample', (_, res) => {
    res.json({ message: 'sample' });
});

const app = express();
app.use('/', apiRouter);
apiRouter.use('/api/v1', authMiddleware);
apiRouter.use('/api/v1', authRouter);

const port = 8080;
app.listen(port);

console.log('Listening on port ' + port);
