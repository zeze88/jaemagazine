const emailCheck = (email) => {
  let _reg =
    /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[-_.0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
  _reg.test(email);
};

export default emailCheck;
