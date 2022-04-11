/* eslint-disable func-names */

import Presenter from './Presenter/Presenter';
import { IOptions } from './lib/interfaces';

(function ($) {
  // eslint-disable-next-line no-param-reassign
  $.fn.rangeSlider = function (options?: Partial<IOptions>) {
    const key = 'rangeSlider';

    return this.each(function () {
      if (!$.data(this, key)) {
        $.data(this, key, new Presenter(this, options));
      }
    });
  };
})(jQuery);
