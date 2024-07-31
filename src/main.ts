import { BaseAction, BaseSelect, Option, SelectProps } from "./types";
import { createHTMLElement } from "./utils/create-element";
import { replaceTemplate } from "./utils/replace-template";
import './styles/input.css'

class Select implements BaseSelect {
  action: BaseAction;
  container: HTMLElement | null;
  input: HTMLInputElement;
  contentWrapper: HTMLElement;
  label: HTMLElement;
  labelTrigger: HTMLElement;
  inputContainer: HTMLElement;
  placeHolder: string;
  timeout?: number
  options: Option[];
  templateOption: string;
  optionsWrapper: HTMLElement;
  request: { url: string; headers?: any; };
  onSelect?: (itemSelect?: Option) => void;



  constructor({
    selector,
    request,
    placeHolder,
    templateOption,
    onSelect
  }: SelectProps) {
    this.container = document.querySelector(`${selector}`);
    this.request.url = request.url;
    this.options = [];
    this.templateOption = templateOption;
    this.onSelect = onSelect;
    this.createElements();

    if (placeHolder) {
      this.input.placeholder = placeHolder;
    }
    this.timeout = undefined;

    this.input.addEventListener("input", () => this.trigger());
  }

  trigger() {
    const value = this.input.value.trim();

    this.optionsWrapper.innerHTML = "";
    this.options = [];

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(async () => {
      const { url, headers } = this.request;

      try {
        const request = await fetch(url, {
          body: JSON.stringify({
            Text: value
          }),
          headers: headers
          
        });

        const response = await request.json();

        response.forEach(option => {
          this.createOptions(option)
        });

      } catch (error) {
        console.error(error.message);
      }

    }, 500);

  }

  createOptions(option) {
    const optionElement = createHTMLElement('div', {
      classes: ['select-option-custom'],
      dataAttributes: {
        id: option.id,
      }
    });

    optionElement.addEventListener("click", () => {

      if (this.onSelect) this.onSelect(option);
    })

    const contentReplace = replaceTemplate({ template: this.templateOption, values: option });

    optionElement.innerHTML = contentReplace;

    this.options.push({
      data: option,
      element: optionElement
    });

    this.update();
  }

  update() {
    this.options.forEach(options => {
      this.optionsWrapper.append(options.element);
    });
  }

  createElements() {
    this.input = createHTMLElement('input', {
      classes: ['select-input-custom'],
      dataAttributes: {
        id: 'samfisfsfn',
      }
    });

    this.optionsWrapper = createHTMLElement('div', {
      classes: ['select-wrapper-option-custom'],
    });

    this.labelTrigger = createHTMLElement('div', {
      classes: ['input-wrapper-custom'],
      dataAttributes: {
        for: 'samfisfsfn'
      }
    });

    this.inputContainer = createHTMLElement('label', {
      classes: ['input-container-custom'],
      dataAttributes: {
        for: 'samfisfsfn'
      }
    });

    this.labelTrigger.append(this.input);
    this.inputContainer.append(this.labelTrigger);
    this.container?.append(this.inputContainer, this.optionsWrapper);
    this.container?.classList.add("select-container-custom")
  }
}