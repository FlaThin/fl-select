require("./index.css");

function $3a03ba239f2b4fce$export$ab2fe02786cfa43c(elementType, options = {}) {
    const { classes: classes = [], dataAttributes: dataAttributes = {} } = options;
    const element = document.createElement(elementType);
    if (classes.length > 0) element.classList.add(...classes);
    for (const [key, value] of Object.entries(dataAttributes))element.setAttribute(`data-${key}`, value);
    return element;
}


function $16122cc0d78f49cc$export$8872cdb3a9605aec({ template: template, values: values }) {
    return template.replace(/{([^{}]*)}/g, function(match, key) {
        return typeof values[key] !== "undefined" ? values[key] : match;
    });
}



class $63dafec9a989d546$var$Select {
    constructor({ selector: selector, request: request, placeHolder: placeHolder, templateOption: templateOption, onSelect: onSelect }){
        this.container = document.querySelector(`${selector}`);
        this.request.url = request.url;
        this.options = [];
        this.templateOption = templateOption;
        this.onSelect = onSelect;
        this.createElements();
        if (placeHolder) this.input.placeholder = placeHolder;
        this.timeout = undefined;
        this.input.addEventListener("input", ()=>this.trigger());
    }
    trigger() {
        const value = this.input.value.trim();
        this.optionsWrapper.innerHTML = "";
        this.options = [];
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(async ()=>{
            const { url: url, headers: headers } = this.request;
            try {
                const request = await fetch(url, {
                    body: JSON.stringify({
                        Text: value
                    }),
                    headers: headers
                });
                const response = await request.json();
                response.forEach((option)=>{
                    this.createOptions(option);
                });
            } catch (error) {
                console.error(error.message);
            }
        }, 500);
    }
    createOptions(option) {
        const optionElement = (0, $3a03ba239f2b4fce$export$ab2fe02786cfa43c)("div", {
            classes: [
                "select-option-custom"
            ],
            dataAttributes: {
                id: option.id
            }
        });
        optionElement.addEventListener("click", ()=>{
            if (this.onSelect) this.onSelect(option);
        });
        const contentReplace = (0, $16122cc0d78f49cc$export$8872cdb3a9605aec)({
            template: this.templateOption,
            values: option
        });
        optionElement.innerHTML = contentReplace;
        this.options.push({
            data: option,
            element: optionElement
        });
        this.update();
    }
    update() {
        this.options.forEach((options)=>{
            this.optionsWrapper.append(options.element);
        });
    }
    createElements() {
        this.input = (0, $3a03ba239f2b4fce$export$ab2fe02786cfa43c)("input", {
            classes: [
                "select-input-custom"
            ],
            dataAttributes: {
                id: "samfisfsfn"
            }
        });
        this.optionsWrapper = (0, $3a03ba239f2b4fce$export$ab2fe02786cfa43c)("div", {
            classes: [
                "select-wrapper-option-custom"
            ]
        });
        this.labelTrigger = (0, $3a03ba239f2b4fce$export$ab2fe02786cfa43c)("div", {
            classes: [
                "input-wrapper-custom"
            ],
            dataAttributes: {
                for: "samfisfsfn"
            }
        });
        this.inputContainer = (0, $3a03ba239f2b4fce$export$ab2fe02786cfa43c)("label", {
            classes: [
                "input-container-custom"
            ],
            dataAttributes: {
                for: "samfisfsfn"
            }
        });
        this.labelTrigger.append(this.input);
        this.inputContainer.append(this.labelTrigger);
        this.container?.append(this.inputContainer, this.optionsWrapper);
        this.container?.classList.add("select-container-custom");
    }
}


