export interface SelectProps {
    selector: string | HTMLElement,
    url: string,
    placeHolder: string,
    templateOption: string,
    onSelect?: (itemSelect?: Option) => void;
}

export interface Option {
    element: HTMLElement,
    data: any,
}

export interface BaseSelect {
    container: HTMLElement | null,
    action: BaseAction,
    input: HTMLElement,
    inputContainer: HTMLElement,
    label: HTMLElement,
    labelTrigger: HTMLElement,
    contentWrapper: HTMLElement,
    placeHolder: string,
    optionsWrapper: HTMLElement,
    options: Option[]
    timeout?: number;
    templateOption: string,
    url: string
    onSelect?: (itemSelect: Option) => void,
}

export interface BaseAction {
    trigger: () => Promise<any>,
}