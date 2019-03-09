// Welcome new users with their username and profile picture.
// exports.onReady = () => {
//   client.on('guildMemberAdd', (member) => {
//     // client.channels.get("554023863697145878").send(`Welcome, <@${member.id}>!`);
//     client.channels.get("554023863697145878").send(new global.discord.RichEmbed()
//       .setTitle('Welcome')
//       .setColor(global.options.themeColor)
//       .setThumbnail(member.user.avatarURL)
//       .setDescription(`Welcome <@${member.id}> to the server!`));
//   });
// };

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
      // Check if hex is provided.
      if (args.length === 0)
        return "No values supplied. Usage: !colourDisplay <hex>";

      // Check if hex is valid.
      let match = args[0].match(/^#?([0-9A-F]{6}|[0-9A-F]{3})$/i);
      if (match === null)
        return 'Invalid hex supplied.';

      const colour = `${match[1].toUpperCase()}`; // Hex without hashtag.
      const colourDisplay = `#${colour}`; // Hex with hashtag.

      // Draw background
      cc.fillStyle = colourDisplay;
      cc.fillRect(0, 0, 100, 100);

      // Convert the 3-digit hex value to a 6-digit value if needed.
      colour6 = colour.length === 6 ? colour : colour.split('').map(l => l.padStart(2, l)).join("");

      // Calculate RGB values of the inputted colour for use in the contrast calculation.
      colourInt = parseInt(colour6, 16);
      r = (colourInt >> 16) & 255;
      g = (colourInt >> 8) & 255;
      b = colourInt & 255;

      // Set the text colour to either black or white, depending on which contrasts best with the inputted colour.
      cc.fillStyle = ((r * 0.299) + (g * 0.587) + (b * 0.114) > 186) ? "black" : "white";

      // Draw label.
      cc.font = 'bold 16px Arial';
      cc.textBaseline = "middle";
      textMetrics = cc.measureText(colourDisplay);
      cc.fillText(colourDisplay, 50 - (textMetrics.width / 2), 50);

      // Send message.
      msg.channel.send({
        files: [{
          attachment: c.createPNGStream(),
          name: `${colourDisplay}.png`
        }]
      }).catch(console.error);
    }
  }
};