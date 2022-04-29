import Presenter from '../range-slider/Presenter/Presenter';
import template from './template';

class Demo {
  private instance: Presenter;

  private panel!: HTMLFormElement;

  private inputs: HTMLInputElement[] = [];

  constructor(sliderInstance: Presenter, index: number) {
    this.instance = sliderInstance;

    this.initPanel(index);
    this.addEventListeners();
    this.bindValues();
  }

  private initPanel(index: number) {
    const panelEl = document.createElement('div');
    panelEl.classList.add('slider__panel', 'panel');
    panelEl.innerHTML = template;

    const sliderEl = document.querySelector(`.js-slider-${index + 1}`);
    sliderEl?.append(panelEl);

    this.panel = document.forms[index];
    this.inputs = <HTMLInputElement[]>[...this.panel.elements];
  }

  private addEventListeners() {
    this.inputs.forEach((input) => {
      const key = input.name;

      input.addEventListener('change', () => {
        if (input.type === 'checkbox') {
          this.instance.update({ [key]: input.checked });

          if (key === 'isDouble') {
            this.blockToField(input.checked);
          }
        } else {
          const value = +input.value;
          this.instance.update({ [key]: value });
        }
      });
    });
  }

  private bindValues() {
    const { panel } = this;
    const { inputs } = this;
    const blockToField = this.blockToField.bind(this);

    this.instance.update({
      onStart(data) {
        inputs.forEach((item) => {
          const input = item;
          const key = <keyof typeof data>input.name;

          if (input.type === 'checkbox') {
            input.checked = <boolean>data[key];

            if (key === 'isDouble') {
              blockToField(input.checked);
            }
          } else {
            input.value = String(<number>data[key]);
          }
        });
      },
      onChange(data) {
        panel.from.value = data.from;
        panel.to.value = data.to;
      },
    });
  }

  private blockToField(isDouble: boolean) {
    this.panel.to.disabled = !isDouble;

    if (isDouble) {
      this.panel.to.style.color = '';
    } else {
      this.panel.to.style.color = 'transparent';
    }
  }
}

export default Demo;
