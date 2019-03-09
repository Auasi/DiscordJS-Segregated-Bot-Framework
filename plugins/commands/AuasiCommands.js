const { createCanvas, loadImage } = require("canvas");
const c = createCanvas(100, 100);
const cc = c.getContext("2d");

exports.commands = {
  croissant: {
    description: 'Who likes croissant? Better question, who doesn\'t?!',
    category: 'Funny',
    exec(label, args, msg) {
      return '🥐';
    }
  },
  colour: {
    description: 'Display a hex colour in chat.',
    category: 'Utils',
    parameters: ['<hex colour code>'],
    aliases: ['color', 'hex'],
    exec(label, args, msg) {
      if (args.length === 0)
        return "No values supplied. Usage: !colour <hex>";

      let match = args[0].match(/^#?([0-9A-F]{6}|[0-9A-F]{3})$/i);
      if (match === null)
        return 'Invalid hex supplied.';

      const colour = `#${match[1].toUpperCase()}`;

      cc.fillStyle = colour;
      cc.fillRect(0, 0, 100, 100);

      msg.channel.send(colour, {
        files: [{
          attachment: c.createPNGStream(),
          name: `${colour}.png`
        }]
      }).catch(console.error);
    }
  }
};