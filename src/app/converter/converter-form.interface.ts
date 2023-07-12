import { FormControl } from '@angular/forms';

export interface ConverterForm {
    typedValue: FormControl<string>;
    convertedValue: FormControl<string>;
}
