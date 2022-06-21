"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const bull_1 = __importDefault(require("bull"));
const email_process_1 = __importDefault(require("../process/email.process"));
const bull_board_1 = require("bull-board");
// const audioQueue = new Queue('audio transcoding', { redis: { port: 6379, host: '127.0.0.1', password: 'foobared' } }); // Specify Redis connection using object
const emailQueue = new bull_1.default('email', {
    redis: {
        port: 6379,
        host: '127.0.0.1',
        db: 3,
        password: null
    },
    // prefix: 'email_',
    // defaultJobOptions: {
    //   attempts: 1,
    //   removeOnComplete: true,
    //   backoff: false,
    //   delay: 0
    // },
    // limiter: {
    //   max: 200000,
    //   duration: 1000
    // },
    // settings: {
    //   maxStalledCount: 1,
    //   guardInterval: 1, // 重新调度延迟
    //   retryProcessDelay: 500, // delay before processing next job in case of internal error.
    //   // drainDelay: 50000 // 空队列时brpoplpush的等待时间
    // }
});
(0, bull_board_1.setQueues)([
    new bull_board_1.BullAdapter(emailQueue)
]);
emailQueue.process(email_process_1.default);
const sendEmail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    emailQueue.add(data);
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.queue.js.map