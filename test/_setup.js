import fs from 'fs';
import path from 'path';

global.chrome = {};
global.chrome.runtime = {
  sendMessage: jest.fn(),
};

global.fixture = {
  load: file => {
    const fullPath = path.join(__dirname, '..', file);
    const fixutre = fs.readFileSync(fullPath);
    document.body.innerHTML = fixutre.toString();
  },
  cleanup: () => {
    document.body.innerHTML = '';
  },
};
