import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConverterForm } from '../converter-form.interface';

@Component({
    selector: 'app-keypad-button',
    templateUrl: './keypad-button.component.html',
    styleUrls: ['./keypad-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeypadButtonComponent {
    @Input() buttonLabel: string = '';
    @Input() converterForm!: FormGroup<ConverterForm>;
    @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

    onButtonClick(): void {
        this.buttonClick.emit();
    }
}
