/* eslint-disable func-names */
import './range-slider.scss';

import Presenter from './Presenter/Presenter';
import Model from './Model/Model';
import View from './View/View';
import { IOptions } from './lib/interfaces';

(function ($) {
  // eslint-disable-next-line no-param-reassign
  $.fn.rangeSlider = function (options?: Partial<IOptions>) {
    const key = 'rangeSlider';
    const settings = options || {};

    return this.each(function () {
      if (!$.data(this, key)) {
        $.data(this, key, new Presenter(new Model(settings), new View(this)));
      }
    });
  };
})(jQuery);
