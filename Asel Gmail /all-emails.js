// const primary = require('./primary');
// const social = require('./social');
// const promotions = require('./promotions');
import { primary } from './primary.js';
import { promotions } from './promotions.js';
import { social } from './social.js';

export const allInbox = [...primary, ...social, ...promotions];

// module.exports = { primary, social, promotions, allInbox };