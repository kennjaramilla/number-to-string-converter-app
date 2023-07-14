import { TestBed } from '@angular/core/testing';
import { ConverterService } from './converter.service';

describe('ConverterService', () => {
    let service: ConverterService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ConverterService);
    });

    describe('convertToAlphabet', () => {
        it('should convert numbers to alphabet letters', () => {
            const numberStringInput = '0#1#2#26#27#52';
            const expectedOutput = 'ABCABA';

            const result = service.convertToAlphabet(numberStringInput);

            expect(result).toEqual(expectedOutput);
        });
    });
});
