import { HTML } from '../lib/html';
import Model from '../Model/Model';
import View from '../View/View';
import Presenter from './Presenter';

let presenter: Presenter;
const el = document.createElement('div');

beforeEach(() => {
  const options = {};
  presenter = new Presenter(el, options);
});

describe('Presenter', () => {
  test('must respond to the view event', () => {
    const mockOnChange = jest.fn();
    const options = { onChange: mockOnChange };
    presenter.update(options);

    const thumbEl = el.querySelector(`.${HTML.thumb.className}`);
    thumbEl?.dispatchEvent(
      new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      })
    );
    document.dispatchEvent(
      new MouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(mockOnChange).toBeCalled();
  });
});

describe('Presenter: update', () => {
  test('must exit the method if there are no options', () => {
    const spyUpdateState = jest.spyOn(Model.prototype, 'updateState');
    presenter.update();

    expect(spyUpdateState).not.toBeCalled();
    spyUpdateState.mockRestore();
  });

  test('should call the model method "updateState"', () => {
    const options = { isDouble: true };
    const spyUpdateState = jest.spyOn(Model.prototype, 'updateState');
    presenter.update(options);

    expect(spyUpdateState).toBeCalled();
    spyUpdateState.mockRestore();
  });

  test('should call a function onStart', () => {
    const mockOnStart = jest.fn();
    const options = { onStart: mockOnStart };
    const spyGetState = jest.spyOn(Model.prototype, 'getState');

    presenter.update(options);

    expect(mockOnStart).toBeCalled();
    expect(spyGetState).toBeCalled();
    spyGetState.mockRestore();
  });
});

test('Presenter: destroy should call the view method "destroy"', () => {
  const spyDestroy = jest.spyOn(View.prototype, 'destroy');
  presenter.destroy();

  expect(spyDestroy).toBeCalled();
  spyDestroy.mockRestore();
});
