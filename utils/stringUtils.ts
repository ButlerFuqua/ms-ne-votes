export const getMinFiveDigitStringFromNumber = (num: number | string) => {
    let numString = `${num}`;
    while(numString.length < 5){
        numString = `0${numString}`
    }
    return numString

}