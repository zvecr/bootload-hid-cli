/* eslint-env mocha */
const { expect, test } = require('@oclif/test');
const mockery = require('mockery');
const EventEmitter = require('events');

const ee = new EventEmitter();
class DummyBoot {
  constructor(...args) {
    ee.args = args;
    return ee;
  }
}
ee.flash = () => {};

mockery.registerMock('bootload-hid', DummyBoot);

mockery.enable({
  warnOnUnregistered: false,
});

const cmd = require('..');
const conf = require('../package.json');

describe('bootloadHID', () => {
  beforeEach(() => {
    // reset test state
    ee.args = undefined;
    ee.flash = () => {};
  });

  test
    .stdout()
    .do(() => cmd.run(['--version']))
    .catch('EEXIT: 0')
    .it('prints version', (ctx) => {
      expect(ctx.stdout).to.contain(`bootload-hid-cli/${conf.version}`);
    });

  test
    .stdout()
    .do(() => cmd.run(['--help']))
    .catch('EEXIT: 0')
    .it('prints help', (ctx) => {
      expect(ctx.stdout).to.contain('USAGE');
    });

  test
    .stdout()
    .do(() => cmd.run(['-r', 'asdf.hex']))
    .it('reboots device', () => {
      expect(ee.args[0].manualReset).to.eq(false);
    });

  test
    .stdout()
    .do(() => cmd.run(['asdf.hex']))
    .do(() => ee.emit('flash:progress', null, 0, 128))
    .it('provides flashing progress', (ctx) => {
      expect(ee.args[0].manualReset).to.eq(true);
      expect(ctx.stdout).to.contain('0x0 ... 0x80');
    });

  test
    .stderr()
    .do(() => { ee.flash = (file, cb) => { cb(new Error('This is some flashing error')); }; })
    .do(() => cmd.run(['asdf.hex']))
    .it('warns user of flashing errors', (ctx) => {
      expect(ctx.stderr).to.contain('This is some flashing error');
    });
});
