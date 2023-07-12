import { FormControl } from '@angular/forms';

export interface ConverterForm {
    typedValue: FormControl<string>;
    resultValue: FormControl<string>;
}
