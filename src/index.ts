// Shims
require('dotenv').config();
// Projects
import { startBot } from './bot';
import { createApplicationContext } from './context';
import { ensureDb } from './data/db';

ensureDb();
const context = createApplicationContext();

// Reminder service can't be started until we have a client
startBot(context);
