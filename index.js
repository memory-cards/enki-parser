const fsExtra = require('fs-extra');
const remark = require('remark');
const remarkFrontmatter = require('remark-frontmatter');
const remarkHtml = require('remark-html');
const util = require('util');

const md2Html = remark().use(remarkHtml);
const md2object = remark().use(remarkFrontmatter, { preset: 'yaml' });

md2Html.pro

const TEST_CARD_NAME = './input/curriculum/javascript/core/arrays/arrays.md';

function processCardFile(fileName = TEST_CARD_NAME) {
  let outPutFileName = fileName.replace('input/', 'output/').replace('.md', '.html');
  let fileContent = fsExtra.readFileSync(fileName).toString();
  let parsedContent = remark.parse(fileContent);

  let html = md2Html.processSync(fileContent);
  fsExtra.outputFileSync(outPutFileName, html);
  fsExtra.outputFileSync(outPutFileName + '.json5', JSON.stringify(parsedContent, null, 2));
  console.log('html', html);


  return 'result will be here';
}

processCardFile();


