exports.run = async (client, args) => {
  if (!args.outlet) return console.error("No outlet specified");
  await client.write(`!OutletSet=${args.outlet},TOGGLE\n`);
  await client.read();
  return;
};

exports.help = {
  "name": "toggle",
  "args": ["outlet"]
};