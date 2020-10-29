console.log('test');

const test = {
  name: 'Kyle Combs',
  title: 'Lead Instructor / Senior Software Engineer',
  prompt: 'What are your passions and hobbies?',
  bio: `I am a lover of [noun] and always down to do almost anything, but I live for 3 things: [noun], [noun], 
  [noun]. When I'm not working in a [Restaurant Name] you can usually find me eating in one. I've been to over 50 [previous]'s and plan 
  to double that before I'm done. And I've played and listened to [type of music] as far back as I can remember. I will go see any band/[noun] live. I'd 
  say I go to at least [random number] concerts a year...it's just always better life! I also am an avid [hobby].`,
};

function generatePrompt(adlib) {
  adlib.uuid = uuidv4();
  adlib.tokens = generateTokens(adlib.bio).map((token) => {
    return {
      question: token,
      uuid: uuidv4(),
      answer: '',
    };
  });
  console.log(adlib.tokens);

  adlib.tokens.forEach((token) => {
    let input = createInputElement(token.question, token.uuid);
    appendToElement('questions', input);
  });

  const submitButton = document.createElement('button');
  submitButton.setAttribute('id', 'submit');
  submitButton.innerText = 'Generate Ad-Lib';
  document.getElementById('controls').appendChild(submitButton);

  submitButton.addEventListener('click', generateAdLib);
}

function createInputElement(question, id) {
  const element = document.createElement('input');
  element.setAttribute('id', id);
  element.placeholder = question;
  return element;
}

function appendToElement(id, element) {
  document.getElementById(id).appendChild(element);
}

function generateTokens(string) {
  const tokens = string.match(/\[(.*?)\]/g);
  return tokens;
}

function generateAdLib() {
  const inputs = document.getElementsByTagName('input');
  console.log(inputs);
}

console.log(generatePrompt(test));

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
