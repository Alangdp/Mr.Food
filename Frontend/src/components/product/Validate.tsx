import { Item } from '@/types/Product.type';
import { ExtraOption } from './Cart.type';

export default class ValidateExtraOptions {
  options: ExtraOption[];
  maxOptions: number;
  minOptions: number;
  obrigatory: boolean;
  selectedOptions: number;
  selectedOptionsList: ExtraOption[];
  extraValue: number;
  groupName: string;

  constructor(
    options: Item[],
    maxOptions: number,
    minOptions: number,
    obrigatory: boolean,
    groupName: string,
  ) {
    const extraOptions: ExtraOption[] = [
      ...options.map(item => {
        console.log(item);
        return {
          name: item.name,
          value: item.price,
          // Todo convert to dynamic
          quantity: 1,
        };
      }),
    ];

    this.groupName = groupName;
    this.options = extraOptions;
    this.maxOptions = maxOptions;
    this.minOptions = minOptions;
    this.obrigatory = obrigatory;
    this.selectedOptions = 0;
    this.selectedOptionsList = [];
    this.extraValue = 0;
  }

  public getStatus(option: ExtraOption): boolean {
    return this.selectedOptionsList.findIndex(
      item => item.name === option.name,
    ) !== -1
      ? true
      : false;
  }

  public setStatus(action: 'add' | 'remove', option: ExtraOption) {
    const indexOnSelectedOptionsList = this.selectedOptionsList.findIndex(
      item => item.name === option.name,
    );

    const elementToAdd = this.options.find(item => item.name === option.name);
    if (!elementToAdd)
      return { status: false, message: 'Elemento não encontrado' };

    if (action === 'add' && indexOnSelectedOptionsList === -1) {
      console.log(option, 'OPTION');
      // Todo convert to dynamic
      option.quantity = 1;
      this.selectedOptionsList.push(elementToAdd);
      this.selectedOptions++;
      this.extraValue +=
        this.options.find(item => item.name === option.name)?.value || 0;

      const valiationStatus = this.validateOptions();

      if (!valiationStatus.status) {
        this.selectedOptions = this.selectedOptions - 1;
        this.selectedOptionsList = this.selectedOptionsList.filter(
          item => item !== option,
        );
        this.extraValue -=
          this.options.find(item => item.name === option.name)?.value || 0;
      }

      return valiationStatus;
    } else if (action === 'remove') {
      this.selectedOptionsList = this.selectedOptionsList.filter(
        item => item !== option,
      );
      this.selectedOptions--;
      this.extraValue -=
        this.options.find(item => item.name === option.name)?.value || 0;
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
