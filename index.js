const fsExtra = require('fs-extra');
const glob = require('glob');
const { getMeta, getQuestions } = require('./util/enkiCardHelpers');
const { getQuestionType } = require('./util/cardTypesHelpers');

const filesToProcess = glob.sync('./input/**/*.md', {
  ignore: './input/**/README.md'
});

const TEST_CARD_NAME = './input/curriculum/javascript/core/arrays/arrays.md';
const stats = {};

function processCardFile(fileName = TEST_CARD_NAME) {
  try {
    let fileContent = fsExtra.readFileSync(fileName).toString();
    let meta = getMeta(fileContent, fileName);
    let questions = getQuestions(fileContent);

    questions.forEach((question, index) => {
      const options = { question, meta };
      const cardType = getQuestionType(options);
      const cardContent = cardType(options);
      stats[cardContent.type] = stats[cardContent.type] || 0;
      stats[cardContent.type]++;
      let outPutFileName = fileName.replace('input/', 'output/').replace('.md', `-${index}.json5`);
      fsExtra.outputFileSync(outPutFileName,JSON.stringify(cardContent, null, 2));
    });
  } catch(e) {
    console.error(`Error on processing ${fileName}`, e.message);
  }
}

filesToProcess.forEach(processCardFile);

console.log(JSON.stringify(stats));