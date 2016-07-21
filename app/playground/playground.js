var grammar = require('../lib/grammar');
var Parser = require('../lib/parser');
var Lexer = require('../lib/lexer');
var Names = require('../lib/gobstones-tokens-en');
var behaviors = require('../lib/interpreter');
var Context = require('../lib/execution-context');

var g = grammar(Parser, new Lexer(), Names, behaviors);
var context = new Context();
context.init();
var program = g.parse("" +
    "procedure Sarasa(dir){" +
    "    Poner(Rojo)" +
    "    Poner(Rojo)" +
    "}" +
    "Poner(Rojo) " +
    "Mover(Norte) " +
    "Poner(Azul) " +
    "Mover(Este) " +
    "Sarasa(Norte) " +
    "if (hayBolitas(Rojo)){" +
    "    Mover(Norte)" +
    "    Mover(Norte)" +
    "    Poner(Azul)" +
    "} else {" +
    "    Mover(Este)" +
    "    Mover(Este)" +
    "    Mover(Este)" +
    "    Poner(Verde)" +
    "}" +
    "x := hayBolitas(Rojo)");
console.log("******************* CONTEXT *****************************");
console.log(context);
console.log("******************* PROGRAM *****************************");
console.log(program);
console.log("----------------------------------------------------");
for (var i = 0; i < program.length; i++) {
    program[i].interpret(context);
}
console.log("==================== RESULTS ========================");
console.log(context.all());
console.log("===================================================");
console.log(context.board().printAscii());

