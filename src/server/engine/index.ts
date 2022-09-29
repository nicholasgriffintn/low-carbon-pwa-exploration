import fs from 'fs';
import path from 'path';

const layoutPath = path.join(__dirname, '', '../views/template.html');
const layout = fs.readFileSync(layoutPath);
const bodyTagName = 'body';

function replacePlaceholders(content, options) {
  return Object.keys(options).reduce((currentContent, optionName) => {
    const option =
      optionName !== bodyTagName && options[optionName].toString
        ? options[optionName]
        : ''; // Blank out invalid values

    return currentContent.replace(new RegExp(`{${optionName}}`, 'g'), option);
  }, content.toString());
}

function engine(filePath, options, callback) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      return callback(err);
    }

    const template = replacePlaceholders(layout, options);
    const body = replacePlaceholders(content, options);
    const page = template.replace(`{${bodyTagName}}`, body);

    return callback(null, page);
  });
}

export default engine;
