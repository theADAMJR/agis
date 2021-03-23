import dotenv from 'dotenv';
import { IPChecker } from './modules/ip/ip-checker.js';
dotenv.config();

new IPChecker().start();
