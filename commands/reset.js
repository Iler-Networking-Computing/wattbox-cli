exports.run = async (client, args) => {
  await client.write(`!OutletSet=${args.outlet || 0},RESET${args.delay ? `,${args.delay}` : ""}\n`);
  await client.read();
  return;
};

exports.help = {
  "name": "reset",
  "args": ["outlet", "delay"]
};