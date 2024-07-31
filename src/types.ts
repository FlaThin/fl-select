export interface SelectProps {
    selector: string | HTMLElement,
    request: {
        url: string,
        headers?: any,
    },
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
    request: {
        url: string,
        headers?: any
    }
    
    onSelect?: (itemSelect: Option) => void,
}

export interface BaseAction {
    trigger: () => Promise<any>,
}