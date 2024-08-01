import { Option } from '../../types/Product.type';

export default class ValidateExtraOptions {
  options: Option[];
  maxOptions: number;
  minOptions: number;
  obrigatory: boolean;
  selectedOptions: number;
  selectedOptionsList: string[];
  extraValue: number;
  groupName: string;

  constructor(
    options: Option[],
    maxOptions: number,
    minOptions: number,
    obrigatory: boolean,
    groupName: string,
  ) {
    this.groupName = groupName;
    this.options = options;
    this.maxOptions = maxOptions;
    this.minOptions = minOptions;
    this.obrigatory = obrigatory;
    this.selectedOptions = 0;
    this.selectedOptionsList = [];
    this.extraValue = 0;
  }

  public getStatus(option: string): boolean {
    return this.selectedOptionsList.includes(option);
  }

  public setStatus(action: 'add' | 'remove', option: string) {
    const indexOnSelectedOptionsList = this.selectedOptionsList.indexOf(option);

    const elementToAdd = this.options.find(item => item.name === option);
    if (!elementToAdd)
      return { status: false, message: 'Elemento não encontrado' };

    if (action === 'add' && indexOnSelectedOptionsList === -1) {
      this.selectedOptionsList.push(elementToAdd.name);
      this.selectedOptions++;
      this.extraValue +=
        this.options.find(item => item.name === option)?.price || 0;

      const valiationStatus = this.validateOptions();

      if (!valiationStatus.status) {
        this.selectedOptions = this.selectedOptions - 1;
        this.selectedOptionsList = this.selectedOptionsList.filter(
          item => item !== option,
        );
        this.extraValue -=
          this.options.find(item => item.name === option)?.price || 0;
      }

      return valiationStatus;
    } else if (action === 'remove') {
      this.selectedOptionsList = this.selectedOptionsList.filter(
        item => item !== option,
      );
      this.selectedOptions--;
      this.extraValue -=
        this.options.find(item => item.name === option)?.price || 0;
    }

    return this.validateOptions();
  }

  public validateOptions() {
    if (this.obrigatory && this.selectedOptions < this.minOptions) {
      // console.log(
      //   `Validação falhou: obrigatoriedade de seleção e opções selecionadas (${this.selectedOptions}) é menor que o mínimo permitido (${this.minOptions})`,
      // );
      return { status: false, message: 'ob' };
    }

    if (this.selectedOptions > this.maxOptions) {
      // console.log(
      //   `Validação falhou: opções selecionadas (${this.selectedOptions}) é maior que o máximo permitido (${this.maxOptions})`,
      // );
      return { status: false, message: 'max' };
    }

    if (this.selectedOptions < this.minOptions) {
      // console.log(
      //   `Validação falhou: opções selecionadas (${this.selectedOptions}) é menor que o mínimo permitido (${this.minOptions})`,
      // );
      return { status: false, message: 'min' };
    }

    if (this.extraValue < 0) {
      // console.log(
      //   `Validação falhou: valor extra (${this.extraValue}) é negativo`,
      // );
      return { status: false, message: 'negative' };
    }

    return { status: true, message: 'ok' };
  }
}
