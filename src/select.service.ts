import { Injectable }               from '@angular/core';

@Injectable()
export class Angular2SelectService {
    private selectedValue: string;
    private selectedText: string;
    private selectorVisible: boolean;
    private selectorAnimState: string = 'hidden';

    constructor() {}

    getSelectedValue(): string {
        return this.selectedValue;
    }
    setSelectedValue(v: string) {
        this.selectedValue = v;
    }
    getSelectedText(): string {
        return this.selectedText;
    }
    setSelectedText(v: string) {
        this.selectedText = v;
    }
    isSelectorVisible(): boolean {
        return this.selectorVisible;
    }
    showSelector() {
        this.selectorVisible = true;
        setTimeout(() => { this.selectorAnimState = 'visible'; }, 100);
    }
    hideSelector() {
        this.selectorAnimState = 'hidden';
        setTimeout(() => { this.selectorVisible = false; }, 300);
    }
    getSelectorAnimState(): string {
        return this.selectorAnimState;
    }
}
