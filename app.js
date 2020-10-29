const bioArr = [
  {
    name: 'Kyle Combs',
    id: 'kyle',
    title: 'Lead Instructor / Senior Software Engineer',
    prompt: 'What are your passions and hobbies?',
    bio: `I am a lover of [noun] and always down to do almost anything, but I live for 3 things: [noun], [noun], [noun].
    
    When I'm not working in a [Restaurant Name] you can usually find me eating in one. I've been to over 50 [previous]'s and plan to double that before I'm done. And I've played and listened to [type of music] as far back as I can remember. 
    
    I will go see any band/[noun] live. I'd say I go to at least [random number] concerts a year... it's just always better live! I also am an avid [hobby].`,
    image: './images/kyle.png',
  },
  {
    name: 'Victoria Armada',
    id: 'victoria',
    title: 'Senior Community and Operations Manager',
    prompt: 'What are your passions and hobbies?',
    bio: `This answer may seem all over the place. I recently got into [noun that ends in 'ING']. I have [Verb] a few [Noun] previously, but due to an [noun], I've had to slow down a bit. I also love [noun that ends in 'ING'] for myself and for friends. 
    
    I love to bring together people with the use of my favorite tool: [noun]. I haven't gotten a handle on [previous] yet, but I'm a pretty mean [noun] maker. I consider myself a nerd at heart: When I need alone time, I like to go to the [place], specifically the [item you'd find in that place]. Other than that, I can be a pretty serious [noun] and [noun] binger.`,
    image: './images/victoria.png',
  },
  {
    name: 'Eric Marcatoma',
    id: 'eric',
    title: 'Cohort 22 Resident',
    prompt: 'What is a fun or random ract about yourself?',
    bio: `I'm not sure how many people will know who this is but while I was working at a restaurant at [place], I met one of my favorite artists at the time, [famous person]. The restaurant was just opening and the owner of the restaurant walks in with [previous] to have a quick [verb]. I kind of had a moment and I had to approach them and tell [first name of famous person you listed] that I was a fan. I ended up taking a [verb] with him and getting a [noun] from him, probably one of the best things that happened during my time in that restaurant.`,
    image: './images/eric.png',
  },
  {
    name: 'James Dimitrios Kolotouros',
    title: 'Cohort 22 Resident',
    id: 'james',
    prompt: 'What are your passions and hobbies?',
    bio: `I am a [noun] fanatic, I grew up playing [weird sport] and [weird sport] and love watching/playing all sports. I was really passionate about [noun] and [noun] for a while. I also have always loved being a [profession] in my spare time - whether it was building a [tech noun] for gaming, changing out parts in my [something you build], or learning to [verb] I have always been drawn to tech one way or another.`,
    image: './images/james.png',
  },
  {
    name: 'Jennifer Courtner',
    title: 'Cohort 22 Resident',
    id: 'jennifer',
    prompt: 'What were you doing before Codesmith?',
    bio: `As a former small [noun] owner, a lot of my passion lies in helping [previous] businesses. Being in a rural area there are a lot of businesses with low-tech and out-of-date [plural noun]. I would like to help local business owners [verb] to the latest technologies and make their websites run [adjective] and be more [adjective]. To be honest, I'm not 100% sure how I will use my knowledge from Codesmith to do this yet, but I'm sure I can find a way to be useful for [adjective] businesses with what I'll learn!`,
    image: './images/jennifer.png',
  },
  {
    name: 'Kyle Juresich',
    id: 'kyle2',
    title: 'Cohort 22 Resident',
    prompt: 'What do you want to do with your coding skills?',
    bio: `I've been working as a professional Actor/[profession] for the past [number] years. I've toured most of the US and [country] and performed at over 100 theatres in various [adjective] theatre productions. Mostly the shows [noun] of Ages, The [famous person] Story, and Million Dollar [noun].`,
    image: './images/kyle2.png',
  },
];

let currentBio = null;

function chooseUser(userId) {
  console.log(userId);
  currentBio = bioArr.find((b) => b.id === userId);
  console.log(currentBio);
  reset();
  generatePrompt(currentBio);
}

function generatePrompt(adlib) {
  document.getElementById('bio-name').innerText = adlib.name;
  document.getElementById('bio-title').innerText = adlib.title;

  const img = document.createElement('img');
  img.src = adlib.image;
  document.getElementById('image-container').appendChild(img);

  adlib.uuid = uuidv4();
  adlib.answer = adlib.bio;
  adlib.tokens = generateTokens(adlib.answer).map((token) => {
    return {
      question: token,
      uuid: uuidv4(),
      answer: '',
    };
  });

  adlib.tokens.forEach((token) => {
    let input = createInputElement(token.question, token.uuid);
    appendToElement('questions', input);
  });

  const submitButton = document.createElement('button');
  submitButton.setAttribute('id', 'submit');
  submitButton.innerText = 'Generate Mad-Lib';
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

  const values = [];
  for (let input of inputs) {
    values.push({
      answer: input.value,
      id: input.id,
    });
  }

  currentBio.tokens.forEach((token) => {
    token.answer = values.find((val) => val.id === token.uuid);
  });

  while (values.length > 0) {
    currentBio.answer = currentBio.answer.replace(
      /\[(.*?)\]/,
      values[0].answer
    );
    values.shift();
  }

  printBio();
}

function printBio() {
  document.getElementById('answer').innerText = currentBio.answer;
  document.getElementById('prompt').innerText = currentBio.prompt;
  let ac = document.getElementById('answers-container');
  ac.style.backgroundColor = '#32a2ed';
}

// currentBio = bioArr[0];
// console.log(generatePrompt(currentBio));

// console.log(currentBio);
setupHandlers();

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function setupHandlers() {
  document
    .getElementById('kyle')
    .addEventListener('click', () => chooseUser('kyle'));
  document
    .getElementById('victoria')
    .addEventListener('click', () => chooseUser('victoria'));
  document
    .getElementById('eric')
    .addEventListener('click', () => chooseUser('eric'));
  document
    .getElementById('james')
    .addEventListener('click', () => chooseUser('james'));
  document
    .getElementById('jennifer')
    .addEventListener('click', () => chooseUser('jennifer'));
  document
    .getElementById('kyle2')
    .addEventListener('click', () => chooseUser('kyle2'));
}

function reset() {
  removeText('bio-name');
  removeText('bio-title');
  removeText('prompt');
  removeChildren('image-container');

  removeText('answer');

  removeChildren('questions');
  removeChildren('controls');

  let ac = document.getElementById('answers-container');
  ac.style.backgroundColor = 'rgba(0,0,0,0)';
}

function removeText(id) {
  document.getElementById(id).innerText = '';
}

function removeChildren(id) {
  let element = document.getElementById(id);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
