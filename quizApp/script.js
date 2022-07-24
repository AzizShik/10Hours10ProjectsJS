window.addEventListener('load', () => {
  const quizData = [
    {
      question: 'What is the most used programming language 2022?',
      a: 'C#',
      b: 'Java',
      c: 'Python',
      d: 'JavaScript / TypeScript',
      correct: 'd',
    },
    {
      question: 'When JavaScript was created?',
      a: 1995,
      b: 1993,
      c: 2001,
      d: 1996,
      correct: 'a',
    },
    {
      question: 'Who developed the JavaScript?',
      a: 'Guido van Rossum',
      b: 'Brendan Eich',
      c: 'Anders Hejlsberg',
      d: 'Bjarne Stroustrup',
      correct: 'b',
    },
    {
      question: 'What is the most used JavaScript Framework?',
      a: 'Vue',
      b: 'Angular',
      c: 'React',
      d: 'JQuery',
      correct: 'c',
    },
    {
      question: 'What does HTML stand for?',
      a: 'HyperText Markup Language',
      b: 'Cascading Style Sheet',
      c: 'Jason Object Notation',
      d: 'Helicopters Terminals Motorboats Lamborginis',
      correct: 'a',
    },
  ];
  const submitEl = document.querySelector('.quiz__btn');
  const quizInputs = document.querySelectorAll('.quiz__input');
  const quizOptions = document.querySelectorAll('.quiz__label');
  const quizList = document.querySelector('.quiz__list');
  const aOption = quizOptions[0];
  const bOption = quizOptions[1];
  const cOption = quizOptions[2];
  const dOption = quizOptions[3];
  const quizQuest = document.querySelector('.quiz__title');

  let idx = 0;
  let score = 0;

  const totalScore = () => {
    quizQuest.textContent = `You answered correctly at ${score}/5 questions.`;
    quizList.style.display = 'none';
  };

  const reload = () => {
    submitEl.textContent = 'Submit';
    quizList.style.display = 'block';
    idx = 0;
    score = 0;
    nextQuestion();
  };

  const nextQuestion = (e) => {
    if (idx > quizData.length - 1) {
      totalScore();
      return false;
    }

    let obj = quizData[idx];
    quizQuest.textContent = obj.question;
    aOption.textContent = obj.a;
    bOption.textContent = obj.b;
    cOption.textContent = obj.c;
    dOption.textContent = obj.d;

    if (e) {
      obj.correct === e.id ? score++ : '';
      idx++;
      nextQuestion();
    }
  };

  nextQuestion();

  submitEl.addEventListener('click', () => {
    if (submitEl.textContent.toLowerCase() === 'reload') {
      reload();
    }

    quizInputs.forEach((e) => {
      if (e.checked) {
        nextQuestion(e);
      }
      e.checked = false;
    });

    if (idx > quizData.length - 1) {
      submitEl.textContent = 'Reload';
    }
  });
});
