export const getMinFiveDigitStringFromNumber = (num: number | string) => {
    let numString = `${num}`;
    while(numString.length < 5){
        numString = `0${numString}`
    }
    return numString
}

// assuming format '2023-03-16'
export const getDateFromDateString = (dateString: string)  => {
    if(!dateString){
        return;
    }
    const dateValues = dateString.split('-').map(Number);
    return new Date(dateValues[0], dateValues[1], dateValues[2])
}