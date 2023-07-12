import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConverterService {
    /**
     * Converts an array of numbers to their corresponding uppercase letters in the alphabet.
     *
     * @param {number[]} numbers - The array of numbers to be converted.
     * @returns {string} The converted string of uppercase letters.
     */
    convertToAlphabet(numbers: number[]): string {
        const letterLength = 26;
        return numbers.map((number) => String.fromCharCode(65 + (number % letterLength))).join('');
    }
}
