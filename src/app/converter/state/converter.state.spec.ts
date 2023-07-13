import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ConverterState, InputStateModel } from './converter.state';
import { UpdateConvertedValue, UpdateTypedText } from './converter.actions';

describe('ConverterState', () => {
    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([ConverterState])]
        });
        store = TestBed.inject(Store);
    });

    it('should update typed text', () => {
        const text = 'New Typed Text';

        store.dispatch(new UpdateTypedText(text));

        const state: InputStateModel = store.selectSnapshot(ConverterState);
        expect(state.typedText).toEqual(text);
    });

    it('should update converted value', () => {
        const value = 'New Converted Value';

        store.dispatch(new UpdateConvertedValue(value));

        const state: InputStateModel = store.selectSnapshot(ConverterState);
        expect(state.convertedValue).toEqual(value);
    });

    describe('getTypedText', () => {
        it('should return the typedText value from the state', () => {
            const mockState: InputStateModel = { typedText: 'Integer', convertedValue: 'Text' };

            const result = ConverterState.getTypedText(mockState);

            expect(result).toBe('Integer');
        });
    });

    describe('getConvertedValue', () => {
        it('should return the convertedValue value from the state', () => {
            const mockState: InputStateModel = { typedText: 'Integer', convertedValue: 'Text' };
            const result = ConverterState.getConvertedValue(mockState);

            expect(result).toBe('Text');
        });
    });
});
