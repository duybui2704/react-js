function getQuarter(date = new Date()) {
    return Math.floor(date.getMonth() / 3 + 1);
}

function getYear(date = new Date()) {
    return date.getFullYear();
}
function getCurrentTime(date = new Date()) {
    return date.getTime();
}
export default {
    getQuarter,
    getYear,
    getCurrentTime
};
