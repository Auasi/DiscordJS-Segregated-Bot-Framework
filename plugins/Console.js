const terminal = require('readline').createInterface(process.stdin, process.stdout);

exports.onReady = () => {
  terminal.setPrompt('>');
  terminal.on('line', str => {
    let args = str.split(/\s+/g);
    let label = args[0];

    args.shift();

    let responded = false;
    Object.values(plugins).forEach(plugin => {
      if (!plugin.hasOwnProperty('console') || !plugin.console.hasOwnProperty('commands'))
        return;

      Object.keys(plugin.console.commands).forEach(clabel => {
        let cmd = plugin.console.commands[clabel];
        let labels = [clabel];

        if (cmd.hasOwnProperty('aliases'))
          labels.push(...cmd.aliases);

        if (!labels.includes(label))
          return;

        responded = true;

        let response = cmd.exec(label, args);
        if (typeof response === 'undefined' || response.length === 0)
          return;

        console.log(response);
      });
    });

    if (!responded)
      console.error('Unknown command!');
  }).on('close', () => {
    process.exit(0);
  });

  terminal.prompt();
};