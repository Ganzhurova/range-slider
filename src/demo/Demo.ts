import Presenter from '../range-slider/Presenter/Presenter';
import template from './template';

class Demo {
  private instance: Presenter;

  private panel!: HTMLFormElement;

  private inputs: HTMLInputElement[] = [];

  constructor(sliderInstance: Presenter, index: number) {
    this.instance = sliderInstance;

    this.initPanel(index);
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

  private bindValues() {
    const { inputs } = this;

    this.instance.update({
      onStart(data) {
        for (let i = 0; i < inputs.length; i += 1) {
          const input = inputs[i];
          const key = <keyof typeof data>input.name;

          if (input.type === 'checkbox') {
            input.checked = <boolean>data[key];
          } else {
            input.value = String(<number>data[key]);
          }
        }
      },
    });
  }
}

export default Demo;
