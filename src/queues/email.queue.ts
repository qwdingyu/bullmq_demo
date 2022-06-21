import Queue from 'bull';
import emailProcess from '../process/email.process';

const emailQueue = new Queue('email', { redis: { port: 6379, host: '127.0.0.1', db: 3} })

emailQueue.process(emailProcess)

const sendEmail = async (data: any) => {
  emailQueue.add(data)
}

export {
  emailQueue,
  sendEmail
}