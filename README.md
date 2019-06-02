# bootload-hid-cli
> Utility for flashing BootloadHID devices

[![Build Status](https://travis-ci.org/zvecr/bootload-hid-cli.svg?branch=master)](https://travis-ci.org/zvecr/bootload-hid-cli)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=zvecr/bootload-hid-cli)](https://dependabot.com)
![Code Status](https://img.shields.io/badge/status-alpha-red.svg)

## CURRENTLY ALPHA: USE AT OWN RISK

NodeJS implementation of <https://www.obdev.at/products/vusb/bootloadhid.html>.

## Install

```shell
$ npm install -g bootload-hid-cli
```

## Usage

```shell
$ bootloadHID --help
Utility for flashing BootloadHID devices

USAGE
  $ bootload-hid-cli FILE

ARGUMENTS
  FILE  intel format hex file

OPTIONS
  -h, --help             show CLI help
  -r, --leaveBootLoader  reboot device once flashing has finished
  -v, --version          show CLI version

DESCRIPTION
  ...
  BootloadHID is a USB boot loader for AVR microcontrollers.
  The uploader tool requires no kernel level driver on Windows and can therefore be run without installing any DLLs.


```

### Example output
```shell
$ bootloadHID -r firmware.hex
Page size   = 128 (0x80)
Device size = 32768 (0x8000); 30720 bytes remaining
Uploading 18688 (0x4900) bytes starting at 0 (0x0)
0x0 ... 0x80
0x80 ... 0x100
0x100 ... 0x180
0x180 ... 0x200
0x200 ... 0x280
0x280 ... 0x300
0x300 ... 0x380
0x380 ... 0x400
0x400 ... 0x480

...

0x4780 ... 0x4800
0x4800 ... 0x4880
0x4880 ... 0x4900
```
