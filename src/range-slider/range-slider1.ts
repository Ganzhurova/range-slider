/* eslint-disable func-names */
import './range-slider.scss';

import { IOptions } from './lib/interfaces';
import { ObjKey } from './lib/types';
// import Presenter from './Presenter/Presenter';
// import Model from './Model/Model';
// import View from './View/View';

(function ($) {
  const methods = {
    init(options?: Partial<IOptions>) {
      console.log(options);
      console.log(this);
    },
    update(options: Partial<IOptions>) {
      console.log(options);
      console.log(this);
    },
  };

  type Methods = typeof methods;
  type MethodKey = ObjKey<Methods>;

  // eslint-disable-next-line no-param-reassign
  $.fn.rangeSlider = function (
    method: MethodKey,
    ...args: Parameters<Methods[MethodKey]>
  ) {
    if (methods[method]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (<any>methods)[method].apply(this, args);
    }
    return this;
  };

  // $.fn.rangeSlider = function (options: IOptions) {
  //   const key = 'rangeSlider';

  //   return this.each(function () {
  //     if (!$.data(this, key)) {
  //       $.data(this, key, new Presenter(new Model(options), new View(this)));
  //     }
  //   });

  //   // if (!this.data(key)) {
  //   //   this.data(key, new Presenter(new Model(options), new View(this[0])));

  //   //   // return this.data(key);
  //   // }
  //   // console.log(this);
  //   // // console.log(this.update());

  //   // return this;
  // };
})(jQuery);
