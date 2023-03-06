const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Jakarta');
const dateNow = moment().format('YYYY-MM-DD');
const hourNow = Number(moment().format('HH'));
const minutesNow = Number(moment().format('mm'));

const fullDate = moment().format('YYYY-MM-DD HH:mm:ss');

module.exports = {
    dateNow,
    hourNow,
    minutesNow,
    fullDate,
};
