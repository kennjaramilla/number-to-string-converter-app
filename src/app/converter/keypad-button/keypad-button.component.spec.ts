import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadButtonComponent } from './keypad-button.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('KeypadButtonComponent', () => {
    let component: KeypadButtonComponent;
    let fixture: ComponentFixture<KeypadButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [KeypadButtonComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(KeypadButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onButtonClick', () => {
        it('should emit buttonClick event', () => {
            spyOn(component.buttonClick, 'emit');

            component.onButtonClick();

            expect(component.buttonClick.emit).toHaveBeenCalled();
        });
    });
});
