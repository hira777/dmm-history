import { storage } from './mocks/chromeLocalStorarge';

const chrome = { storage };

interface Global extends NodeJS.Global {
  chrome: {};
}

(global as Global).chrome = chrome;
