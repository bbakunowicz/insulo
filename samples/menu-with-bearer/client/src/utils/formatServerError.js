const formatServerError = (err) => {
  let error = [{message: err.message}];
  if (typeof err == 'object' && typeof err.response == 'object' && typeof err.response.data == 'object' && Array.isArray(err.response.data.errors)){
      const errArr = err.response.data.errors;
      for (let i = 0; i<errArr.length; i++) {
        if (typeof errArr[i] == 'object' && !errArr[i].message && errArr[i].msg) {
          errArr[i].message = errArr[i].msg;
        }
      }
      error = errArr;
  }

  return error;
}

export default formatServerError;