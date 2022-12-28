function formatLoanMoney(number: string) {
    if (!number) {
        return '';
    }
    return (
        `${parseInt(number.replace(/\./g, ''), 10)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} vnđ`
    );
}
function formatMoney(number: string | number | undefined) {
    if (!number) {
        return '0 đ';
    }
    return (
        `${Math.ceil(Number(number))
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ`
    );
}
function formatMoneyNotSuffixes(number: string | number | undefined) {
    if (!number) {
        return '0';
    }
    return (
        `${Math.ceil(Number(number))
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
    );
}

function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatForEachWordCase(str: string) {
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

function formatUpperCaseCharacter(str: string) {
    return str = str.toUpperCase?.();
}

function formatRoundNumberToDecimalMillion(number: number) { // from 1440000 to round 1.44

    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const format = (Math.abs(Number(number)) / 1.0e+6).toFixed(2);

    return formatter.format(Number(format));
}

export default {
    formatLoanMoney,
    formatMoney,
    formatMoneyNotSuffixes,
    capitalizeFirstLetter,
    formatForEachWordCase,
    formatUpperCaseCharacter,
    formatRoundNumberToDecimalMillion
};
