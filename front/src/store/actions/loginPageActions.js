import * as socketConn from "../../socketConnection/socketConn";

//PoroceedWithLogin is called in
export const proceedWithLogin = (data) => {
  socketConn.login(data);
};
