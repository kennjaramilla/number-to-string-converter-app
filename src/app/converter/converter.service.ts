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
    convertToAlphabet(numberStringInput: string): string {
        const letterLength = 26;
        const numbers = this._convertToNumberArray(numberStringInput);
        return numbers.map((number) => String.fromCharCode(65 + (number % letterLength))).join('');
    }

    // Split the string by '#' and map each resulting string to a number
    private _convertToNumberArray(numberInputs: string): number[] {
        return numberInputs.split('#').map(Number);
    }
}
