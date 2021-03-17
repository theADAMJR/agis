import dotenv from 'dotenv';
import { IPChecker } from './ip/ip-checker.js';
dotenv.config();

new IPChecker().start();
