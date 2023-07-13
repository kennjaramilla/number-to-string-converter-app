import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterComponent } from './converter.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UpdateConvertedValue, UpdateTypedText } from './state';
import { Subscription, of } from 'rxjs';

describe('ConverterComponent', () => {
    let component: ConverterComponent;
    let fixture: ComponentFixture<ConverterComponent>;
    let typedValueControl: FormControl;
    let convertedValueControl: FormControl;
    let converterServiceMock: any;
    let storeMock: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ConverterComponent],
            providers: [FormBuilder],
            imports: [NgxsModule.forRoot([])],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        typedValueControl = new FormControl();
        convertedValueControl = new FormControl();
        converterServiceMock = jasmine.createSpyObj('ConverterService', ['convertToAlphabet']);
        storeMock = jasmine.createSpyObj('Store', ['dispatch']);

        fixture = TestBed.createComponent(ConverterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        component.converterForm = {
            get: (name: string) => (name === 'typedValue' ? typedValueControl : convertedValueControl)
        } as any;
        component['_converterService'] = converterServiceMock;
        component['_store'] = storeMock;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('initialization', () => {
        it('should subscribe to typed value changes and update converted value', () => {
            typedValueControl.setValue('Integer');
            converterServiceMock.convertToAlphabet.and.returnValue('BA');
            storeMock.dispatch.and.stub();

            component.ngOnInit();

            typedValueControl.setValue('0#2');

            expect(typedValueControl.value).toBe('0#2');
            expect(convertedValueControl.value).toBe('BA');
            expect(storeMock.dispatch).toHaveBeenCalledWith(jasmine.any(UpdateConvertedValue));
            expect(converterServiceMock.convertToAlphabet).toHaveBeenCalledWith([0, 2]);
        });

        it('should handle typed value ending with #', () => {
            typedValueControl.setValue('123#');
            storeMock.dispatch.and.stub();

            component.ngOnInit();

            expect(typedValueControl.value).toBe('123#');
            expect(convertedValueControl.value).toBe(null);
            expect(storeMock.dispatch).not.toHaveBeenCalled();
        });
    });

    describe('appendNumber', () => {
        it('should append number to typed value and dispatch an action', () => {
            const keypadInput = '1';
            const defaultValue = 'Integer';
            const typedValueControl = component.converterForm.get('typedValue');
            typedValueControl?.setValue(defaultValue);

            component.appendNumber(keypadInput);

            expect(typedValueControl?.value).toBe(`${defaultValue.replace(defaultValue, '')}${keypadInput}`);
            expect(component['_store'].dispatch).toHaveBeenCalledWith(new UpdateTypedText(`${defaultValue.replace(defaultValue, '')}${keypadInput}`));
        });
    });

    describe('clearInput', () => {
        it('should do nothing when typedValueControl is not available', () => {
            spyOn(component.converterForm, 'get').and.returnValue(null);

            component.clearInput();

            expect(component.converterForm.get('typedValue')).toBeNull();
        });

        it('should do nothing when convertedValueControl is not available', () => {
            spyOn(component.converterForm, 'get').and.returnValue(null);

            component.clearInput();

            expect(component.converterForm.get('convertedValue')).toBeNull();
        });

        it('should not dispatch UpdateConvertedValue action when convertedValueControl or typedValue is not available', () => {
            spyOn(component.converterForm, 'get').and.returnValue(null);

            component.clearInput();

            expect(component['_store'].dispatch).not.toHaveBeenCalled();
        });

        it('should append number to typed value', () => {
            const keypadInput = '1';
            const defaultValue = 'Integer';
            const typedValueControl = component.converterForm.get('typedValue');
            typedValueControl?.setValue(defaultValue);

            component.appendNumber(keypadInput);

            expect(typedValueControl?.value).toBe(`1`);
        });

        it('should clear last character from typed value', () => {
            const typedValueControl = component.converterForm.get('typedValue');
            typedValueControl?.setValue('1#45#5');

            component.clearInput();

            expect(typedValueControl?.value).toBe('1#45#');
        });
    });

    describe('unsubscribe', () => {
        it('should unsubscribe from all subscriptions', () => {
            const subscription1 = new Subscription();
            const subscription2 = new Subscription();
            spyOn(subscription1, 'unsubscribe').and.stub();
            spyOn(subscription2, 'unsubscribe').and.stub();

            component['_subscriptions'] = [subscription1, subscription2];

            component.ngOnDestroy();

            expect(subscription1.unsubscribe).toHaveBeenCalled();
            expect(subscription2.unsubscribe).toHaveBeenCalled();
        });
    });
});
