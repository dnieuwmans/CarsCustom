const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const formatDate = (date: Date | null = null, format: string = '') => {
    // solve linting errors
    let d;

    // check if date is given
    if (date === null) {
        d = new Date();
    } else {
        d = date;
    }

    return format
        .replace(/%Y/g, String(d.getFullYear()))
        .replace(/%m/g, pad(String(d.getMonth() + 1), 2))
        .replace(/%M/g, months[d.getMonth()])
        .replace(/%d/g, pad(String(d.getDate()), 2))
        .replace(/%D/g, days[d.getDay() % 7])
        .replace(/%DD/g, daysLong[d.getDay() % 7])
        .replace(/%H/g, pad(String(d.getHours()), 2))
        .replace(/%i/g, pad(String(d.getMinutes()), 2))
        .replace(/%s/g, pad(String(d.getSeconds()), 2));
};

export const pad = (s: string, len: number = 2): string => {
    let string = String(s);

    while (string.length < len) {
        string = `0${s}`;
    }

    return string;
};
