const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export default function getProperDate(date) {
    let arr = date.split("-");
    return `${parseInt(arr[2])} ${months[parseInt(arr[1]) - 1]} ${parseInt(
        arr[0]
    )}`;
}