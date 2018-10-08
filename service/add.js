/**
 * Created by mxj on 2018/10/8.
 */

exports.add = function (a, b) {
  if (typeof a === 'number' && typeof b === 'number')
  {
    return a + b;
  }
  else
  {
    return undefined;
  }
};

