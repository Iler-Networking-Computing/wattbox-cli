exports.run = async (client, args) => {
  if (!args.outlet) return console.error("No outlet specified");
  await client.write(`!OutletSet=${args.outlet},OFF\n`);
  await client.read();
  return;
};

exports.help = {
  "name": "poweroff",
  "args": ["outlet"]
};