export class UpdateTypedText {
    static readonly type = '[Inputs] Update Typed Text';
    constructor(public text: string) {}
}

export class UpdateConvertedValue {
    static readonly type = '[Inputs] Update Converted Value';
    constructor(public value: string) {}
}
