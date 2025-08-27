import moment from 'moment';

let mockedTime;

function get(time, format) {
  if (null === time) {
    time = undefined;
  }
  if (null === format) {
    format = undefined;
  }
  return moment.utc(time || mockedTime, format);
}

function set(time, format) {
  if (null === time) {
    time = undefined;
  }
  if (null === format) {
    format = undefined;
  }
  mockedTime = undefined;
  if (null !== time) {
    mockedTime = moment.utc(time, format);
  }
  return get(time, format);
}

export default {
  raw: moment,
  get: get,
  set: set
};
