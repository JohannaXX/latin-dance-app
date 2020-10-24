export const timeUntilNow = ( givenDate ) => {
    const date1 = Date.now();
    const date2 = new Date(givenDate);
    const seconds = Math.abs(date1 - date2) / 1000

    if (seconds < 60) {

        return `${Math.floor(seconds)} seconds ago`

    } else if (seconds < (60*60)) {
       
        return `${Math.floor(seconds/ 60)} minutes ago`
    
    } else if (seconds < (60*60*24)) {
        const day1 = new Date(date1)
        const day2 = new Date(date2)
        if (day1.getDay() === day2.getDay() ) {
            return `${Math.floor(seconds/ (60*60))} hours ago`
        }
    } else {
        const date = new Date(givenDate)
        return date.toLocaleString().split(',').join(' -')
    }

}