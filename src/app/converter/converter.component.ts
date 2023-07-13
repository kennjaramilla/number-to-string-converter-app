import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConverterService } from './converter.service';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ConverterState, UpdateConvertedValue, UpdateTypedText } from './state';

@Component({
    selector: 'app-converter',
    templateUrl: './converter.component.html',
    styleUrls: ['./converter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConverterComponent implements OnInit, OnDestroy {
    converterForm: FormGroup;
    buttonKeys: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '#', '0', '<-'];

    typedText$: Observable<string>;
    convertedValue$: Observable<string>;
    private _subscriptions: Subscription[] = [];

    constructor(
        private _formBuilder: FormBuilder,
        private _converterService: ConverterService,
        private _store: Store
    ) {
        this.converterForm = this._formBuilder.group({
            typedValue: '',
            convertedValue: ''
        });

        this.typedText$ = this._store.select(ConverterState.getTypedText);
        this.convertedValue$ = this._store.select(ConverterState.getConvertedValue);

        this._subscriptions.push(
            this.typedText$.subscribe((typedText: string) => this.converterForm.patchValue({ typedValue: typedText })),
            this.convertedValue$.subscribe((convertedValue: string) => this.converterForm.patchValue({ convertedValue }))
        );
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

        if (!typedValueControl) return;

        const currentValue = typedValueControl.value;

        // Check if the typedValue already ends with "#"
        if (currentValue.endsWith('#') && keypadInput === '#') {
            return;
        }

        const defaultValue = 'Integer';
        const updatedTypedValue = typedValueControl.value.replace(defaultValue, '') + keypadInput;

        console.log('You typed', keypadInput);

        typedValueControl.setValue(updatedTypedValue);
        this._store.dispatch(new UpdateTypedText(updatedTypedValue));
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
     * Subscribes to changes in the typed value and updates the converted value accordingly.
     * Converts the typed value to alphabet using the ConverterService.
     */
    private _subscribeToTypedValueChanges(): void {
        const typedValueControl = this.converterForm.get('typedValue');
        const convertedValueControl = this.converterForm.get('convertedValue');

        if (!typedValueControl || !convertedValueControl) return;

        typedValueControl.valueChanges.subscribe((value: string) => {
            if (value.endsWith('#')) return;

            if (!value) {
                typedValueControl.setValue('Integer');
                convertedValueControl.setValue('Text');
                return;
            }

            // Split the string by '#' and map each resulting string to a number
            const numbers = value.split('#').map(Number);
            const convertedValue = this._converterService.convertToAlphabet(numbers);

            convertedValueControl.setValue(convertedValue);
            this._store.dispatch(new UpdateConvertedValue(convertedValue));
        });
    }

    ngOnDestroy(): void {
        this._subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }
}
