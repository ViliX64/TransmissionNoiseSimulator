var error_probability_txt = $('#error_probability_txt');
var messages_per_run_txt = $('#messages_per_run_txt');
var word_length_txt = $('#word_length_txt');
var repetitions_txt = $('#repetitions_txt');

var rep_dispatched_list = $('#rep_dispatched_list');
var rep_noise_list = $('#rep_noise_list');
var rep_decoded_list = $('#rep_decoded_list');

function run() {
  var messagesPerRun = getMessagesPerRun();
  var repetitions = getRepetitions();
  var errorProbability = getErrorProbability();
  var isRepeatWords = getIsRepeatWords();
  var wordLength = getWordLength();

  var repetition = new Repetition();
  var dispatchedWords = generateWords(wordLength, messagesPerRun);
  if(isRepeatWords)
    dispatchedWords = repeatWords(dispatchedWords, repetitions);
  else
    dispatchedWords = repeatBits(dispatchedWords, repetitions);

  rep_dispatched_list.html('');
  for(i in dispatchedWords)
    rep_dispatched_list.append("<p class='list_item'>"+ dispatchedWords[i].join("<span class='small_space'> </span>") +"</p>");

  var noiseComp = addNoise(dispatchedWords, errorProbability);
  var noiseWords = noiseComp[0];
  var noiseWordsHTML = noiseComp[1];

  rep_noise_list.html('');
  for(i in noiseWordsHTML)
    rep_noise_list.append("<p class='list_item'>" + noiseWordsHTML[i].join("<span class='small_space'> </span>") + "</p>");

  var decodedWords = repetition.decode(noiseWords, repetitions, isRepeatWords, wordLength);
  var comparedWords = compare(dispatchedWords, decodedWords);
  rep_decoded_list.html('');
  for(i in comparedWords)
    rep_decoded_list.append("<p class='list_item'>" + comparedWords[i].join("<span class='small_space'> </span>") + "</p>");

}
