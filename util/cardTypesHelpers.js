const ANSWER_PLACEHOLDER = '???';

const getInfoCardContent = ({ meta, question }) => {
  return 'Put Info Card content here';
};

const getChooseOptionsCardContent = ({ meta, question }) => {
  return 'Put choose_options Card content here';
};

const getChooseSequenceCardContent = ({ meta, question }) => {
  return {
    __meta__: {
      author: meta.author,
      source: meta.source,
    },
    type: 'choose_sequence',
    lang: 'en',
    tags: ['enki', ...meta.tags],
    card: {
      question: question.html,
      answers: question.answers.map(el => ({ text: el})),
      comment:
        'Add example here',
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
