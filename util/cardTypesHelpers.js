const ANSWER_PLACEHOLDER = '???';

// Some cards like 
// https://github.com/enkidevs/curriculum/blob/master/javascript/browser-apis/navigation/warn-user-if-back-button-is-pressed.md
// contain duplicated answers - it fails validation from card-types definition
const getUniqAnswers = answers => answers.filter((el, index) => index === answers.indexOf(el) );

const getInfoCardContent = ({ meta, question }) => {
  return {
    __meta__: {
      author: meta.author,
      source: meta.source,
    },
    type: 'info',
    lang: 'en',
    tags: ['enki', meta.category, ...(meta.tags || [])],
    card: {
      question: question.html,
      comment: meta.content,
    },
  };
};

const getChooseOptionsCardContent = ({ meta, question }) => {
  return {
    __meta__: {
      author: meta.author,
      source: meta.source,
    },
    type: 'choose_options',
    lang: 'en',
    tags: ['enki', meta.category, ...(meta.tags || [])],
    card: {
      question: question.html,
      answers: getUniqAnswers(question.answers).map((el, index) => ({
        text: el.replace(/`(.+?)`/g, '<code>$1</code>'),
        correct: !index,
      })),
      comment: meta.content,
    },
  };
};

const getChooseSequenceCardContent = ({ meta, question }) => {
  return {
    __meta__: {
      author: meta.author,
      source: meta.source,
    },
    type: 'choose_sequence',
    lang: 'en',
    tags: ['enki', meta.category, ...(meta.tags || [])],
    card: {
      question: question.html,
      answers: getUniqAnswers(question.answers).map(el => ({
        text: el.replace(/`(.+?)`/g, '<code>$1</code>'),
      })),
      comment: meta.content,
    },
  };
};

const getQuestionType = ({ question }) => {
  const numberOfAnswers = question.html.split(ANSWER_PLACEHOLDER).length - 1;

  if (numberOfAnswers === 0) {
    return getInfoCardContent;
  }
  if (numberOfAnswers === 1) {
    return getChooseOptionsCardContent;
  }
  return getChooseSequenceCardContent;
};

module.exports = {
  getInfoCardContent,
  getChooseOptionsCardContent,
  getChooseSequenceCardContent,
  getQuestionType,
};
