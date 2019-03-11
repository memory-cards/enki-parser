const fsExtra = require('fs-extra');
const { getMeta, getQuestions } = require('./util/enkiCardHelpers');

const { getQuestionType } = require('./util/cardTypesHelpers');

const TEST_CARD_NAME = './input/curriculum/javascript/core/arrays/arrays.md';

function processCardFile(fileName = TEST_CARD_NAME) {
  // let outPutFileName = fileName.replace('input/', 'output/').replace('.md', '.html');
  let fileContent = fsExtra.readFileSync(fileName).toString();
  let meta = getMeta(fileContent, fileName);
  let questions = getQuestions(fileContent);

  console.log('meta', JSON.stringify(meta));
  console.log('questions', questions);

  questions.forEach(question => {
    const options = { question, meta };
    const cardType = getQuestionType(options);
    const cardContent = cardType(options);
    console.log(JSON.stringify(cardContent, null, 2));
  });

  return 'result will be here';
}

processCardFile();
