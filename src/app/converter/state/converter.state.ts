import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UpdateConvertedValue, UpdateTypedText } from './converter.actions';

export interface InputStateModel {
    typedText: string;
    convertedValue: string;
}

@State<InputStateModel>({
    name: 'converter',
    defaults: {
        typedText: 'Integer',
        convertedValue: 'Text'
    }
})
export class ConverterState {
    @Action(UpdateTypedText)
    updateTypedText(ctx: StateContext<InputStateModel>, action: UpdateTypedText): void {
        const state = ctx.getState();
        ctx.setState({ ...state, typedText: action.text });
    }

    @Action(UpdateConvertedValue)
    updateConvertedValue(ctx: StateContext<InputStateModel>, action: UpdateConvertedValue): void {
        const state = ctx.getState();
        ctx.setState({ ...state, convertedValue: action.value });
    }
}
