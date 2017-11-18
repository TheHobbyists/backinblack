//synaptic for neural network programming
var synaptic = require('synaptic');
var cycles = 10;

//stdin for user input
process.stdin.resume();
process.stdin.setEncoding('utf8');

//players excluding dealer
var players = 1;

//set goal to blackjack
let goal = 21;

//set s to true or false depending if the bot was correct
var s;

//good (1) or bad (0) decision
var decision = 1;

//set last cards
var lastCard = 0;


//card array for easy card variables
let cards = [0, "a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q","k"];

//set amount in hand
var amount = 0;

//synaptic nn setup
var Neuron = synaptic.Neuron,
Layer = synaptic.Layer,
Network = synaptic.Network,
Trainer = synaptic.Trainer,
Architect = synaptic.Architect;

function Perceptron(input, hidden, output)
{
// create the layers
var inputLayer = new Layer(input);
var hiddenLayer = new Layer(hidden);
var outputLayer = new Layer(output);

// connect the layers
inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

// set the layers
this.set({
  input: inputLayer,
  hidden: [hiddenLayer],
  output: outputLayer
});
}

// extend the prototype chain
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

//input layer is (amount currently, good decision or not)
var myNetwork = new Perceptron(22,6,1);
var learningRate = .3;

//find value of cards
function cardValue(card){
  return cards.indexOf(card);
}

initTrain(100);

//stdin input reading
process.stdin.on('data', function (text) {
  text = text.replace(/\n$/, '');
  //console.log('received data:', util.inspect(text));
  if (text === 'quit') {
    done();
  }
  if (text.includes('value') === true) {
    let x = text.replace(/value /, '').toLowerCase();
    let y = cardValue(x);
    console.log('The card value is ' + y);
  }
  if (text.includes('a') === true) {
    let x = text.replace(/a /, '').toLowerCase();
    amount = parseInt(x);
    let z = activate(amount);
    if(z >= .8){
      hit();
      console.log("Card Amount: "+amount+", Decision: Hit");
    }
    if(z < .2){
      stay();
      console.log("Card Amount: "+amount+", Decision: Stay");
    }
  }
  if (text.includes('l') === true) {
    lost(1);
  }
  if (text.includes('w') === true) {
    won();
  }
  if (text.includes('n') === true) {
    let x = text.replace(/n /, '').toLowerCase();
    let y = parseInt(x);
    lastCard = y;
    amount += y;
    if (amount > goal){
      console.log("My decisions failed you.");
      lost(0);
    }
    let z = activate(amount);
    if(z >= .8){
      if (amount <= goal){
        hit();
        console.log("Card Amount: "+amount+", Decision: Hit");
      }
    }
    if(z < .2){
      if (amount <= goal){
        stay();
        console.log("Card Amount: "+amount+", Decision: Stay");
      }
    }
  }
});

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}

//0 is lost .5 is neutral 1 is won

function stay(){
  for (var i = 0; i < cycles; i++) {
    myNetwork.activate([amount,.5]);
    myNetwork.propagate(learningRate, [0]);
  }
}

function hit(){
  for (var i = 0; i < cycles; i++) {
    activate(amount);
    myNetwork.propagate(learningRate, [1]);
  }
}

function won(){
  for (var i = 0; i < cycles; i++) {
    activate(amount);
    myNetwork.propagate(learningRate, [0]);
  }
}

function lost(x){
  for (var i = 0; i < cycles; i++) {
    activate(amount);
    myNetwork.propagate(learningRate, [x]);
  }
}

function activate(x){
  if(x == 1){
    return myNetwork.activate([0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  }
  if(x == 2){
    return myNetwork.activate([0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  }
  if(x == 3){
    return myNetwork.activate([0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  }
  if(x == 4){
    return myNetwork.activate([0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  }
  if(x == 5){
    return myNetwork.activate([0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  }
  if(x == 6){
    return myNetwork.activate([0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  }
  if(x == 7){
    return myNetwork.activate([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  }
  if(x == 8){
    return myNetwork.activate([0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  }
  if(x == 9){
    return myNetwork.activate([0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0]);
  }
  if(x == 10){
    return myNetwork.activate([0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0]);
  }
  if(x == 11){
    return myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0]);
  }
  if(x == 12){
    return myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0]);
  }
  if(x == 13){
    return myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0]);
  }
  if(x == 14){
    return myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]);
  }
  if(x == 15){
    return myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0]);
  }
  if(x == 16){
    return myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]);
  }
  if(x == 17){
    return myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0]);
  }
  if(x == 18){
    return myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0]);
  }
  if(x == 19){
    return myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0]);
  }
  if(x == 20){
    return myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]);
  }
  if(x == 21){
    return myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]);
  }
}

function initTrain(x){
  for (var i = 0; i < x; i++) {
    console.log("Initial Training: "+i);
    //1 hit
    myNetwork.activate([0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    myNetwork.propagate(learningRate, [1]);
    //2 hit
    myNetwork.activate([0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    myNetwork.propagate(learningRate, [1]);
    //3 hit
    myNetwork.activate([0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    myNetwork.propagate(learningRate, [1]);
    //4 hit
    myNetwork.activate([0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    myNetwork.propagate(learningRate, [1]);
    //5 hit
    myNetwork.activate([0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    myNetwork.propagate(learningRate, [1]);
    //6 hit
    myNetwork.activate([0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    myNetwork.propagate(learningRate, [1]);
    //7 hit
    myNetwork.activate([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    myNetwork.propagate(learningRate, [1]);
    //8 hit
    myNetwork.activate([0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    myNetwork.propagate(learningRate, [1]);
    //9 hit
    myNetwork.activate([0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0]);
    myNetwork.propagate(learningRate, [1]);
    //10 hit
    myNetwork.activate([0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0]);
    myNetwork.propagate(learningRate, [1]);
    //11 hit
    myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0]);
    myNetwork.propagate(learningRate, [1]);
    //12 hit
    myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0]);
    myNetwork.propagate(learningRate, [1]);
    //13 hit
    myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0]);
    myNetwork.propagate(learningRate, [1]);
    //14 hit
    myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]);
    myNetwork.propagate(learningRate, [1]);
    //15 hit
    myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0]);
    myNetwork.propagate(learningRate, [1]);
    //16 hit
    myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]);
    myNetwork.propagate(learningRate, [1]);
    //17 stay
    myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0]);
    myNetwork.propagate(learningRate, [0]);
    //18 stay
    myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0]);
    myNetwork.propagate(learningRate, [0]);
    //19 stay
    myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0]);
    myNetwork.propagate(learningRate, [0]);
    //20 stay
    myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]);
    myNetwork.propagate(learningRate, [0]);
    //21 stay
    myNetwork.activate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]);
    myNetwork.propagate(learningRate, [0]);
  }
}
