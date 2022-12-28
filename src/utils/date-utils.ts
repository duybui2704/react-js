function getQuarter(date = new Date()) {
    return Math.floor(date.getMonth() / 3 + 1);
}

function getYear(date = new Date()) {
    return date.getFullYear();
}

export default {
    getQuarter,
    getYear
};
