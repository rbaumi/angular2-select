export declare class Angular2SelectService {
    private selectedValue;
    private selectedText;
    private selectorVisible;
    private selectorAnimState;
    constructor();
    getSelectedValue(): string;
    setSelectedValue(v: string): void;
    getSelectedText(): string;
    setSelectedText(v: string): void;
    isSelectorVisible(): boolean;
    showSelector(): void;
    hideSelector(): void;
    getSelectorAnimState(): string;
}
