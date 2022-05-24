// Load our custom convenience functions
const funcs = require("./functions.js");

// Use minimist to load arguments into an object
var argv = require("minimist")(process.argv.slice(2), {
  string: ["u", "p", "h", "o", "c"],
  boolean: ["help"]
});

// "clientOpts" will hold the final processing results of our
// argument processing
const clientOpts = {};
// We'll use a try/catch block for making sure required arguments are
// provided and filtering invalid arguments
try {
  // If the user specifically asked for help, drop everything and give it to them
  if (argv.help) throw "Help flag set";
} catch (ex) {
  // If we threw an exception in the "try" block, output the help
  // message to the user
  funcs.printHelp();
  process.exit(argv.help ? 0 : 1);
}