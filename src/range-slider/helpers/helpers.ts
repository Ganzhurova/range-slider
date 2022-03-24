import Component from '../View/Component';

const helpers = {
  getEventCoord(event: MouseEvent | TouchEvent): number {
    const pageCoord = `page${Component.direction.coord.toUpperCase()}`;
    const evt =
      event.type.search('touch') !== -1
        ? (<TouchEvent>event).touches[0]
        : <MouseEvent>event;

    return <number>evt[<keyof typeof evt>pageCoord];
  },

  getClosestValue(arrNumbers: number[], target: number) {
    return arrNumbers.reduce((prev: number, current: number) =>
      Math.abs(current - target) < Math.abs(prev - target) ? current : prev
    );
  },
};

export default helpers;
