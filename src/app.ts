import dotenv from 'dotenv';
import { IPChecker } from './modules/ip/ip-checker';
import { Metrics } from './modules/status/metrics';
dotenv.config();

new IPChecker().start();
new Metrics().start();
