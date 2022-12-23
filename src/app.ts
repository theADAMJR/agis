import dotenv from 'dotenv';
import { IPChecker } from './modules/ip/ip-checker';
dotenv.config();

new IPChecker().start();
