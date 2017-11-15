var synaptic = require('synaptic'); // this line is not needed in the browser
 process.stdin.resume();
  process.stdin.setEncoding('utf8');
  var util = require('util');
  var cycles;
  var floor = Math.floor;
  var round = Math.round;

  process.stdin.on('data', function (text) {
  	text = text.replace(/\n$/, '');
    //console.log('received data:', util.inspect(text));
    if (text === 'quit') {
      done();
    }
    if (text.includes('teach') === true) {
      sub = text.replace(/teach /, '');
      var value = parseInt(sub);
      cycles  = value;      
      learn();
      console.log('Developed through ' + cycles + ' iterations.')
    }
    if (text === 'demo') {
      console.log("Given numbers are : 1,1so the ")
      demo(10);
    } 
    if (text === '0,1') {
      display(0,1);
    }
    if (text === '1,0') {
      display(1,0);
    }
    if (text === '0,0') {
      display(0,0);
    }
    if (text === '1,1') {
      display(1,1);
    }
  });

  function done() {
    console.log('Now that process.stdin is paused, there is nothing more to do.');
    process.exit();
  }

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

var myNetwork = new Perceptron(2,3,1);
var learningRate = .3;

function display(a,b){
	var resultStart = myNetwork.activate([a,b]);
	var resultMiddle = resultStart * 100;
	var resultEnd = Math.round(resultMiddle);
	if (resultStart > 0.5){
		console.log(resultEnd + '% sure that they are the same.');
	}
	if(resultStart < 0.5){
		console.log(100 - resultEnd + '% sure that they are different.');
	}

}

function learn(){
for (var i = 0; i < cycles; i++) {
  // 0,0 => 0
  myNetwork.activate([0,0]);
  myNetwork.propagate(learningRate, [1]);
  // 0,1 => 1
  myNetwork.activate([0,1]);
  myNetwork.propagate(learningRate, [0]);
  // 1,0 => 1
  myNetwork.activate([1,0]);
  myNetwork.propagate(learningRate, [0]);
  // 1,1 => 0
  myNetwork.activate([1,1]);
  myNetwork.propagate(learningRate, [1]);
}}

function demo(x){
  for (var i = 0; i < x; i++) {
  console.log(myNetwork.activate([1,1]));
  myNetwork.propagate(.5, [1]);
}
}











