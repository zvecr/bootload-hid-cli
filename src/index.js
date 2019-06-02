const { Command, flags } = require('@oclif/command');
const BootloadHID = require('bootload-hid');

class BootloadHIDCli extends Command {
  async run() {
    const { args, flags: flagz } = this.parse(BootloadHIDCli);

    // console.log("CLI args:", flagz, args);

    BootloadHID.list((err, ports) => {
      console.log('devices', ports);
    });

    const loader = new BootloadHID({
      debug: false,
      manualReset: !flagz.leaveBootLoader,
    });

    loader.on('flash:start', (info, startAddr, endAddr, pageSize, deviceSize) => {
      const totalData = endAddr - startAddr;

      console.log(`Page size   = ${pageSize} (0x${pageSize.toString(16)})`);
      console.log(`Device size = ${deviceSize} (0x${deviceSize.toString(16)}); ${deviceSize - 2048} bytes remaining`);
      console.log(`Uploading ${totalData} (0x${totalData.toString(16)}) bytes starting at ${startAddr} (0x${startAddr.toString(16)})`);
    });
    loader.on('flash:progress', (info, startAddr, endAddr) => {
      console.log(`0x${startAddr.toString(16)} ... 0x${endAddr.toString(16)}`);
    });

    // GO....
    loader.flash(args.file, (error) => {
      if (error) {
        console.error(error.message);
      } else {
        // console.info('done.');
      }
    });
  }
}

BootloadHIDCli.description = `TODO
...
TODO more
`;

BootloadHIDCli.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: 'v' }),
  // add --help flag to show CLI version
  help: flags.help({ char: 'h' }),

  // reboot flag
  leaveBootLoader: flags.boolean({
    char: 'r',
    description: 'reboot device once flashing has finished',
  }),
};

BootloadHIDCli.args = [
  {
    name: 'file',
    required: true,
    description: 'intel format hex file',
  },
];

module.exports = BootloadHIDCli;
