const bcrypt = require("bcrypt");
const saltRounds = 10;

const  encryptString = async (myPlaintextPassword)=> {
   const hash = await bcrypt.hash(myPlaintextPassword.myString,saltRounds);
   return hash;
};

const compareString =async (myString,hash)=> {
    const result = await bcrypt.compare(myString,hash);
    return result;
};


module.exports = {
    encryptString,
    compareString
}