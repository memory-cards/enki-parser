const remark = require('remark');
const remarkHtml = require('remark-html');
const yaml = require('yaml');
const PARTS_DELIMITER = '---';

const md2Html = remark().use(remarkHtml);

// I'm going to add __meta__ into question JSON
// to put information about source / author
const getMeta = str => {
  let strParts = str.split(PARTS_DELIMITER);
  const yamlContent = strParts[1].trim();
  const yamlObj = yaml.parse(yamlContent);
  return yamlObj;
};

const getQuestionData = str => {
  const titleMatch = str.match(/## (.+)/);
  const title = titleMatch ? titleMatch[1] : 'item';
  str = str.replace(titleMatch ? titleMatch[0] : '', '');

  const answersMatches = str.match(/\* (.+)/g) || [];
  const answers = answersMatches.map(el => el.replace(/^\* /, ''));
  answersMatches.forEach(el => (str = str.replace(el, '')));
  str = str.trim();

  return {
    answers,
    html: md2Html.processSync(str) + '',
    numberOfCorrectAnswers: (str.match(/\?\?\?/g) || []).length,
    title,
  };
};

const getQuestions = str => {
  const cardTitle = str.match(/# (.+)/)[1];

  let strParts = str.split(PARTS_DELIMITER);
  let questionParts = strParts.filter(el => el.includes('???'));
  return questionParts.map(strPart => ({
    cardTitle,
    ...getQuestionData(strPart),
  }));
};

module.exports = {
  getQuestions,
  getMeta,
  getQuestionData
}