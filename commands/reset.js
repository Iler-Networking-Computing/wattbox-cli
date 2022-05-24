exports.run = async (args) => {
  return `!OutletSet=${args.outlet || 0},RESET${args.delay ? `,${args.delay}` : ""}\n`;
};

exports.help = {
  "name": "reset",
  "args": ["outlet", "delay"]
};