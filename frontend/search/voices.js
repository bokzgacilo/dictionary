const synth = window.speechSynthesis;

function readDefinition(){
  synth.cancel();
  
  const definition = document.getElementById('definition').textContent;
  const speech = new SpeechSynthesisUtterance(definition);
  speech.lang = "en-GB"
  speech.rate = 1.1;
  
  synth.speak(speech);
}