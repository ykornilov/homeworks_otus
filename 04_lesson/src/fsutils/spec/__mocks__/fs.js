const path = require('path');

const fs = jest.genMockFromModule('fs');

let mockFiles = Object.create(null);
fs.__setMockFiles = newMockFiles => {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  }
}

fs.stat = (path, cb) => {
  console.log(path)
  if (path.includes('/error-path')) {
    cb('fs.stat error');
  } else if (/.*\..{2,}/.test(path)) {
    cb(null, {isDirectory: () => false});
  } else {
    cb(null, {isDirectory: () => true});
  }
};

fs.readdir = (path, cb) => {
  if (path === '/error-path') return cb('fs.readdir error');
  cb(null, mockFiles[path] || []);
}

module.exports = fs;
