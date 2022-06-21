import express from 'express';
import bodyParser from 'body-parser';
import { emailQueue, sendEmail } from './queues/email.queue';
const { ExpressAdapter } = require('@bull-board/express');

const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const serverAdapter = new ExpressAdapter();
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(emailQueue)],
  serverAdapter: serverAdapter,
});

const app = express();
app.use(bodyParser.json());
app.get('/', async (req, res) => {
  res.send({ status: 'ok' });
});

serverAdapter.setBasePath('/admin/queues');
app.use('/admin/queues', serverAdapter.getRouter());

app.post('/send-email', async (req, res) => {
  const { message, ...restBody } = req.body
  await sendEmail({
    ...restBody,
    html: `<p>${message}</p>`
  })
  res.send({ status: 'ok' });
});

app.listen(7010, () => console.log('App running on port 7010'));

