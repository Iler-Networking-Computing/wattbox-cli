exports.run = async (client, args) => {
  if (!args.outlet) return console.error("No outlet specified");
  await client.write(`!OutletSet=${args.outlet},ON\n`);
  await client.read();
  return;
};

exports.help = {
  "name": "poweron",
  "args": ["outlet"]
};