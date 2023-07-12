import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConverterService } from './converter.service';

@Component({
    selector: 'app-converter',
    templateUrl: './converter.component.html',
    styleUrls: ['./converter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConverterComponent implements OnInit {
    converterForm: FormGroup;
    buttonKeys: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '#', '0', '<-'];

    constructor(
        private _formBuilder: FormBuilder,
        private _converterService: ConverterService
    ) {
        this.converterForm = this._formBuilder.group({
            typedValue: ['Integer'],
            resultValue: ['Text']
        });
    }

    ngOnInit(): void {
        this._subscribeToTypedValueChanges();
    }

    /**
     * Updates the typed value with the given keypad input.
     * Removes the default value 'Integer' and appends the keypad input to the typed value.
     *
     * @param {string} keypadInput - The keypad input to append to the typed value.
     */
    appendNumber(keypadInput: string): void {
        const typedValueControl = this.converterForm.get('typedValue');

        if (typedValueControl) {
            const defaultValue = 'Integer';
            const updatedTypedValue = typedValueControl.value.replace(defaultValue, '') + keypadInput;
            typedValueControl.setValue(updatedTypedValue);
        }
    }

    /**
     * Clears the last character from the typed value if it is not empty and not equal to 'Integer'.
     */
    clearInput(): void {
        const typedValueControl = this.converterForm.get('typedValue');

        if (!typedValueControl) return;

        const currentValue: string = typedValueControl.value;

        if (currentValue.length > 0 && currentValue !== 'Integer') {
            const updatedValue: string = currentValue.slice(0, -1);
            typedValueControl.setValue(updatedValue);
        }
    }

    /**
     * Subscribes to changes in the typed value and updates the result value accordingly.
     * Converts the typed value to alphabet using the ConverterService.
     */
    private _subscribeToTypedValueChanges(): void {
        const typedValueControl = this.converterForm.get('typedValue');
        const resultValueControl = this.converterForm.get('resultValue');

        if (!typedValueControl || !resultValueControl) return;

        typedValueControl.valueChanges.subscribe((value: string) => {

            console.log('You typed', typedValueControl?.value);

            if (value.endsWith('#')) return;

            if (!value) {
                typedValueControl.setValue('Integer');
                resultValueControl.setValue('Text');
                return;
            }

            // Split the string by '#' and map each resulting string to a number
            const numbers = value.split('#').map(Number);
            const convertedValue = this._converterService.convertToAlphabet(numbers);

            resultValueControl.setValue(convertedValue);
        });
    }
}
