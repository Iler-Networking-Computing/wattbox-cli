# wattbox-cli
A command line interface to control the WattBox surge protector

## Running
Download the latest release from the [releases page](https://github.com/Iler-Networking-Computing/wattbox-cli/releases/latest). Run using the following syntax:

```
wbcli -h <WattBox IP address> -u <username> -p <password> -c <command>
```

Additional arguments may be available depending on which command you are running. Run `wbcli --help` for additional details.

## Building
Make sure [pkg](https://www.npmjs.com/package/pkg) is installed and run `npm run build`. Executables for Windows, Linux, and MacOS will be output to the `/builds` directory.