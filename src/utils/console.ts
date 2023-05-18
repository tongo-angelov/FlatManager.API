export default class cConsole {
  static success = (data: any) => {
    console.log("\x1b[42m%s\x1b[0m", data);
  };
  static status = (data: any) => {
    console.log(data);
    // console.log("\x1b[44m%s\x1b[0m", data);
  };
  static warning = (data: any) => {
    console.log("\x1b[43m%s\x1b[0m", data);
  };
  static error = (data: any) => {
    console.log("\x1b[41m%s\x1b[0m", data);
  };
}
