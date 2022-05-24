module.exports = {
  // printHelp(): Print the help message to the console
  printHelp: () => {
    console.log("Syntax: wbcli -h <WattBox IP address> -u <username> -p <password> -c <command>");
    console.log("Optional parameters:");
    console.log("--help: Displays this help message");
    console.log("-d: A delay in seconds to override the default delay");
    console.log("-o: The outlet number to run the command on");
  }
};