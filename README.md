# wattbox-cli
A command line interface to control the WattBox surge protector

Designed to work with the [telnet API](https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/PowerManagement/ProtocolsAndDrivers/SnapAV_Wattbox_API_V2.4.pdf) included with the WattBox 150 and 250 IPW models. It allows commands to be sent to the WattBox in the context of a script.

## Running
Download the latest release from the [releases page](https://github.com/Iler-Networking-Computing/wattbox-cli/releases/latest). Run using the following syntax:

```
wbcli -h <WattBox IP address> -u <username> -p <password> -c <command>
```

Additional arguments may be available depending on which command you are running. Run `wbcli --help` for additional details.

## Building
Make sure [pkg](https://www.npmjs.com/package/pkg) is installed and run `npm run build`. Executables for Windows, Linux, and MacOS will be output to the `/builds` directory.