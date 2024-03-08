import * as express from "express";



import * as Tesseract from 'tesseract.js';
import * as fs from 'fs';

const ocrad = require('ocrad.js');


import { ImageAnnotatorClient } from '@google-cloud/vision';
import path from "path";
import FileRouts from "./files.routes";
import MainSliderRouts from "./main_slider.routes";
import { MasterRouts } from "./masters";
import ParticipantRouts from "./participant.routes";
import EventsRouts from "./events.routes";
import CountactUsRouts from "./contact_us.routes";



async function recognizeTextOCR(imagePath: string): Promise<string> {
  const text = ocrad(imagePath, {
    lang: 'urd', // Specify the language as Urdu
  });

  return text;
}




async function recognizeText(imagePath: string, languageHints: string[] = ['ur']): Promise<string[]> {
  const client = new ImageAnnotatorClient({
    keyFilename: path.join(__dirname, '..', '..', 'google-key-file-shoqbo-.json')
  });

  try {
    const [result] = await client.textDetection(imagePath);
    const detections = result.textAnnotations;

    if (detections.length === 0) {
      console.log('No text found.');
      return [];
    }

    const texts = detections.map((annotation) => annotation.description);

    return texts;
  } catch (error) {
    console.error('Error recognizing text:', error);
    throw error;
  }
}




async function performOCR(imagePath: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    Tesseract.recognize(
      imagePath,
      'urd',
      { logger: (info) => console.log(info) }
    ).then(({ data: { text } }) => {
      resolve(text);
    }).catch((error) => {
      reject(error);
    });
  });
}


export class Router {

  public static initializeRoutes(app: express.Express) {
    app.use(express.static(path.join(__dirname, '..', '..', 'src', 'public')));
    app.use('/api/file', FileRouts)
    app.use('/api/slider', MainSliderRouts)
    app.use('/api/masters', MasterRouts)
    app.use('/api/participant', ParticipantRouts)
    app.use('/api/events', EventsRouts)
    app.use('/api/contact_us', CountactUsRouts)
  }
}
