// Shims
require('dotenv').config();

// Projects
import { startBot } from './bot';
import { createApplicationContext } from './context';

const context = createApplicationContext();

// Reminder service can't be started until we have a client
startBot(context);
