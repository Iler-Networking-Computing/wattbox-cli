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

  // Check to make sure the required arguments are provided
  if (!argv.u) throw "No user specified";
  if (!argv.p) throw "No password specified";
  if (!argv.h) throw "No host specified";
  if (!argv.c) throw "No command specified";
  clientOpts.user = {"username": argv.u, "password": argv.p};
  clientOpts.host = argv.h;
  clientOpts.cmd = argv.c;
} catch (ex) {
  // If we threw an exception in the "try" block, output the help
  // message to the user
  funcs.printHelp();
  process.exit(argv.help ? 0 : 1);
}

