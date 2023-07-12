import { Selector } from '@ngxs/store';
import { InputStateModel } from './converter.state';

export class ConverterSelectors {
    @Selector()
    static getTypedText(state: InputStateModel): string {
        return state.typedText;
    }

    @Selector()
    static getConvertedValue(state: InputStateModel): string {
        return state.convertedValue;
    }
}
