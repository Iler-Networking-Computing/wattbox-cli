// Load the various node libraries we'll be using
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const net = require("net");
const {PromiseSocket} = require("promise-socket");
const Collections = require("@discordjs/collection");

// Load our custom convenience functions
const funcs = require("./functions.js");

// Use minimist to load arguments into an object
var argv = require("minimist")(process.argv.slice(2), {
  string: ["u", "p", "h", "o", "c", "d"],
  boolean: ["help"]
});

// "clientOpts" will hold the final processing results of our
// argument processing
const clientOpts = {};
// We'll use a try/catch block for making sure required arguments are
// provided and filtering invalid arguments
try {
  // If the user specifically asked for help, drop everything and
  // give it to them
  if (argv.help) throw "Help flag set";

  // Check to make sure the required arguments are provided
  if (!argv.u) throw "No user specified";
  if (!argv.p) throw "No password specified";
  if (!argv.h) throw "No host specified";
  if (!argv.c) throw "No command specified";
  clientOpts.user = {"username": argv.u, "password": argv.p};
  clientOpts.host = argv.h;
  clientOpts.cmd = argv.c.toLowerCase();
  clientOpts.params = {
    "outlet": argv.o,
    "delay": argv.d
  };
} catch (ex) {
  // If we threw an exception in the "try" block, output the help
  // message to the user
  funcs.printHelp();
  // If "help" is set, all is okay. Otherwise, set the exit code above 0.
  process.exit(argv.help ? 0 : 1);
}

// We're creating an anonymous self-executing async function to allow
// us to use Node's async/await syntax.
(async () => {
  // We'll be using Discord.js's Collecitons library for storing our
  // commands because it's such a useful library
  const commands = new Collections.Collection();
  // Load a list of our commands from the relevant subdirectory
  const cmds = await readdir("./commands/");
  // Add each of our commands to the collection
  cmds.forEach(c => {
    if (!c.endsWith(".js")) return;
    try {
      const props = require(`./commands/${c}`);
      return commands.set(props.help.name, props);
    } catch (ex) {
      return console.error(`Unable to load command ${c.split(".")[0]}: ${ex}`);
    }
  });

  // Now process the user's chosen command and run it if it exists
  const cmd = commands.get(clientOpts.cmd);
  if (!cmd) {
    console.error(`Command not found`);
    funcs.printHelp();
    process.exit(1);
  }

  // Since we know the command exists, we can go ahead and try to log
  // into the WattBox's telnet interface
  // First, create the PromiseSocket object that we'll use to send
  // commands to the WattBox
  const client = new PromiseSocket(new net.Socket());
  client.setTimeout(30 * 1000); // 30 seconds

  // Connect to the telnet server and try to log in
  try {
    await client.connect({host: clientOpts.host, port: 23});
    await client.read(); // Pull the username prompt
    await client.write(`${clientOpts.user.username}\n`);
    await client.read(); // Pull the password prompt
    await client.write(`${clientOpts.user.password}\n`);
    // Check the response to see if our credentials are correct
    const loginRes = await client.read()
    if (loginRes.toString().includes("Invalid")) throw "Invalid credentials";
  } catch (ex) {
    console.error(`Error connecting to the API: ${ex.message}`);
    client.destroy();
    process.exit(1);
  }

  // Run the command over the telnet API
  try {
    await client.write(await cmd.run(clientOpts.params));
    await client.read();
  } catch (ex) {
    console.error(`Error running the command: ${ex.message}`);
    client.destroy();
    process.exit(1);
  }

  // Gracefully close the connection once we're finished
  await client.write("!Exit\n");
  await client.end();
})();