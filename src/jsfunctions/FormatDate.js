// use date string as argument
function dateFormatter(dateValue) {
        const date = new Date(dateValue);
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"]
        const monthName = monthsOfYear[date.getMonth()];
        const dayName = daysOfWeek[date.getDay()];
        const year = date.getUTCFullYear();
        const day = date.getUTCDate().toString().padStart(2, '0');
        const formattedDate = `${dayName} ${day} ${monthName} ${year}`;
        return formattedDate;
    }
export { dateFormatter };