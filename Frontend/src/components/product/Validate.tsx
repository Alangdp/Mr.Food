import { Option } from '../../types/Product.type';

export default class ValidateExtraOptions {
  declare options: Option[];
  declare maxOptions: number;
  declare minOptions: number;
  declare obrigatory: boolean;
  declare selectedOptions: number;
  declare selectedOptionsList: string[];
  declare extraValue: number;

  constructor(
    options: Option[],
    maxOptions: number,
    minOptions: number,
    obrigatory: boolean,
  ) {
    this.options = options;
    this.maxOptions = maxOptions;
    this.minOptions = minOptions;
    this.obrigatory = obrigatory;
    this.selectedOptions = 0;
    this.selectedOptionsList = [];
    this.extraValue = 0;
  }

  public getStatusByIndex(index: number): boolean {
    if (index < 0 || index >= this.options.length) return false;

    const option = this.options[index];

    return this.selectedOptionsList.includes(option.name);
  }

  public toggleOption(index: number, status: boolean): boolean {
    if (index < 0 || index >= this.options.length) return false;
    const option = this.options[index];

    const previousSelectedOptions = this.selectedOptions;
    const previousSelectedOptionsList = [...this.selectedOptionsList];
    const previousExtraValue = this.extraValue;

    if (!status) {
      if (!this.selectedOptionsList.includes(option.name)) {
        this.selectedOptions++;
        this.selectedOptionsList.push(option.name);
        this.extraValue += option.price;
      }
      return true;
    } else {
      if (this.selectedOptionsList.includes(option.name)) {
        this.selectedOptions--;
        this.selectedOptionsList = this.selectedOptionsList.filter(
          selectedOption => selectedOption !== option.name,
        );
        this.extraValue -= option.price;
      }
    }

    if (!this.validateOptions()) {
      this.selectedOptions = previousSelectedOptions;
      this.selectedOptionsList = previousSelectedOptionsList;
      this.extraValue = previousExtraValue;
      return false;
    }

    return true;
  }

  public validateOptions(): boolean {
    if (this.obrigatory && this.selectedOptions < 1) return false;
    if (this.selectedOptions > this.maxOptions) return false;
    if (this.selectedOptions < this.minOptions) return false;
    if (this.extraValue < 0) return false;

    return true;
  }
}
