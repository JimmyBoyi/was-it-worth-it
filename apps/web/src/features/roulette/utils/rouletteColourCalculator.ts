export function getRouletteColour(numberAsString: string): string {
    const num = Number(numberAsString);
    if (num === 0) return 'green';

    // For numbers ranging from 1 to 10 and 19 to 28, odd numbers are red and even are black
    // So in the ranges from 11 to 18 and 29 to 36, odd numbers are black and even are red
    if ((num >= 1 && num <= 10) || (num >= 19 && num <= 28)) {
        return num % 2 !== 0 ? 'red' : 'black';
    } else {
        return num % 2 !== 0 ? 'black' : 'red';
    }
}