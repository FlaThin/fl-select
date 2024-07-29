type HTMLElementOptions = {
    classes?: string[];
    dataAttributes?: Record<string, string>;
};

export function createHTMLElement<T extends keyof HTMLElementTagNameMap>(
    elementType: T,
    options: HTMLElementOptions = {}
): HTMLElementTagNameMap[T] {
    const { classes = [], dataAttributes = {} } = options;

    const element = document.createElement(elementType);

    if (classes.length > 0) {
        element.classList.add(...classes);
    }

    for (const [key, value] of Object.entries(dataAttributes)) {
        element.setAttribute(`data-${key}`, value);
    }

    return element;
}