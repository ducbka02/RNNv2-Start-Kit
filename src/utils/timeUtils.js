import moment, { months } from 'moment';
import { NOW } from '../global/Constants'

const getTimeNowFormat = () => {
    const year = moment().get('year');
    const month = moment().get('month') + 1;
    const date = moment().get('date');
    const hour = moment().get('hour');
    const minute = moment().get('minute');
    const second = moment().get('second');
    const timeFormat = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
    return timeFormat;
};

const formatTimeToRegular = (time) => {
    const year = moment(time).get('year');
    const month = moment(time).get('month') + 1;
    const date = moment(time).get('date');
    const hour = moment(time).get('hour');
    const minute = moment(time).get('minute');
    const second = moment(time).get('second');
    const timeFormat = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
    return timeFormat;
};

const getTimeToServer = (time, extra = 0) => {
    if (time === NOW) {
        const hour = `${moment().add(extra, 'h').get('hour')}`;
        const minute = `${moment().add(extra, 'h').get('minute')}`;
        return `${hour}:${minute}`;
    } else {
        const hour = `${moment(time).add(extra, 'h').get('hour')}`;
        const minute = `${moment(time).add(extra, 'h').get('minute')}`;
        return `${hour}:${minute}`;
    }
};

const getDateToServer = (time, extra = 0) => {
    if (time === NOW) {
        const year = moment().add(extra, 'h').get('year');
        const month = moment().add(extra, 'h').get('month') + 1;
        const date = moment().add(extra, 'h').get('date');
        return `${date}-${month}-${year}`;
    } else {
        const year = moment(time).add(extra, 'h').get('year');
        const month = moment(time).add(extra, 'h').get('month') + 1;
        const date = moment(time).add(extra, 'h').get('date');
        return `${date}-${month}-${year}`;
    }
};

const getDateTimeRangeShowBooksSuccess = (time, extra = 0) => {
    if (time === NOW) {
        const monthStart = moment().get('month') + 1;
        const dateStart = moment().get('date');
        const hourStart = `00${moment().get('hour')}`.slice(-2);
        const minuteStart = `00${moment().get('minute')}`.slice(-2);

        const monthEnd = moment().add(extra, 'h').get('month') + 1;
        const dateEnd = moment().add(extra, 'h').get('date');
        const hourEnd = `00${moment().add(extra, 'h').get('hour')}`.slice(-2);
        const minuteEnd = `00${moment().add(extra, 'h').get('minute')}`.slice(-2);

        return `${monthStart}月${dateStart}日${hourStart}:${minuteStart} - ${monthEnd}月${dateEnd}日 ${hourEnd}:${minuteEnd}`;
    } else {
        const monthStart = moment(time).get('month') + 1;
        const dateStart = moment(time).get('date');
        const hourStart = `00${moment(time).get('hour')}`.slice(-2);
        const minuteStart = `00${moment(time).get('minute')}`.slice(-2);

        const monthEnd = moment(time).add(extra, 'h').get('month') + 1;
        const dateEnd = moment(time).add(extra, 'h').get('date');
        const hourEnd = `00${moment(time).add(extra, 'h').get('hour')}`.slice(-2);
        const minuteEnd = `00${moment(time).add(extra, 'h').get('minute')}`.slice(-2);

        return `${monthStart}月${dateStart}日 ${hourStart}:${minuteStart} - ${monthEnd}月${dateEnd}日 ${hourEnd}:${minuteEnd}`;
    }
};

const getDateTimeEndShowBooksSuccess = (time, extra = 0) => {
    if (time === NOW) {
        const yearEnd = moment().add(extra, 'h').get('year');
        const monthEnd = moment().add(extra, 'h').get('month') + 1;
        const dateEnd = moment().add(extra, 'h').get('date');
        const hourEnd = `00${moment().add(extra, 'h').get('hour')}`.slice(-2);
        const minuteEnd = `00${moment().add(extra, 'h').get('minute')}`.slice(-2);

        return `${yearEnd}年${monthEnd}月${dateEnd}日${hourEnd}時${minuteEnd}分`;
    } else {
        const yearEnd = moment(time).add(extra, 'h').get('year');
        const monthEnd = moment(time).add(extra, 'h').get('month') + 1;
        const dateEnd = moment(time).add(extra, 'h').get('date');
        const hourEnd = `00${moment(time).add(extra, 'h').get('hour')}`.slice(-2);
        const minuteEnd = `00${moment(time).add(extra, 'h').get('minute')}`.slice(-2);

        return `${yearEnd}年${monthEnd}月${dateEnd}日${hourEnd}時${minuteEnd}分`;
    }
};

const getTimeToBookRooms = (time) => {
    if (time === NOW) {
        const month = moment().get('month') + 1;
        const date = moment().get('date');
        const hour = `00${moment().get('hour')}`.slice(-2);
        const minute = `00${moment().get('minute')}`.slice(-2);
        return `${month}月 ${date} - ${hour}:${minute}`;
    } else {
        const month = moment(time).get('month') + 1;
        const date = moment(time).get('date');
        const hour = `00${moment(time).get('hour')}`.slice(-2);
        const minute = `00${moment(time).get('minute')}`.slice(-2);
        return `${month}月 ${date} - ${hour}:${minute}`;
    }
}

const formatTimeToTopShow = (time) => {
    if (time === NOW) return time;
    const month = moment(time).get('month') + 1;
    const date = moment(time).get('date');
    const hour = `00${moment(time).get('hour')}`.slice(-2);
    const minute = `00${moment(time).get('minute')}`.slice(-2);
    return `${month}月 ${date} - ${hour}:${minute}`;
};

const getDateAfter14Day = () => {
    return moment().add(13, 'd').toDate();
};

export {
    getTimeNowFormat,
    formatTimeToRegular,
    getTimeToServer,
    getDateToServer,
    getDateTimeRangeShowBooksSuccess,
    getDateTimeEndShowBooksSuccess,
    getTimeToBookRooms,
    formatTimeToTopShow,
    getDateAfter14Day
};
