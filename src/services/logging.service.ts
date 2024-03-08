import * as winston from 'winston';
import { format } from 'winston';
import fs from 'fs';
import path from 'path';
import moment from 'moment-timezone'; // Add moment for time zone support

const IST = 'Asia/Kolkata'; // Define Indian time zone
moment.tz.setDefault('Asia/Kolkata');

const formatTimestampIST = () => {
  return () => moment().tz(IST).format('ddd, Do MMM YYYY, h:mm:ss A'); // Use 'A' for AM/PM
};

const logger = winston.createLogger({
  format: format.combine(
    format.label({ label: 'tec-uol' }),
    format.timestamp({
      format: formatTimestampIST(),
    }),
    format.printf((info: any) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: (() => {
        const nowInIST = moment().tz(IST); // Get current time in IST
        const YYYYMMDD = nowInIST.format('YYYYMMDD'); // Format for file name
        const destination = path.join(__dirname, '..', '..', 'logs')
        const filename = path.join(destination, `tec-uol-${YYYYMMDD}.log`);
        if (!fs.existsSync(destination)) {
          fs.mkdirSync(destination);
        }
        if (!fs.existsSync(filename)) {
          fs.openSync(filename, 'w'); // Create file if needed
        }
        return filename;
      })() as string, // Type assertion
    }),
  ],
});

type User = {
  id?: string;
  email?: string;
};

export function logError(error: any, req?: any) {
  const userMessage = req
    ? `User: ${req.user?.email}`
    : undefined;
  logger.error(
    `${error.message}${userMessage ? `\n${userMessage}` : ''}\n${error.stack} \n\n`
  );
}

export function logInfo(message: string, req?: any) {
  const userMessage = req
    ? `User: ${req.user?.id || req.user?.email}`
    : undefined;
  logger.info(`${message}${userMessage ? `\n${userMessage}` : ''}`);
}


