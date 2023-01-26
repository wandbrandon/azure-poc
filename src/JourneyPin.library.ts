export interface JourneyPin {
  id: string;
  function?: string;
  sequence: number;
  description: string;
  type?: string;
  ucid?: string;
  status?: JourneyPinStatus;
  start?: Date;
  end?: Date;
  duration?: number;
  input?: unknown;
  output?: unknown;
}

export enum JourneyPinStatus {
  ERROR = "ERROR",
  NODATA = "NODATA",
  SUCCESS = "SUCCESS",
}

export function JourneyPin(
  id: string,
  description: string,
  sequence: number,
  type: string
): any {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    descriptor =
      descriptor || Object.getOwnPropertyDescriptor(target, propertyKey);
    const targetMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      let result;
      let error;
      let status = JourneyPinStatus.SUCCESS;

      const t0 = performance.now();
      try {
        result = targetMethod.apply(this, args);
        if (result == null) {
          status = JourneyPinStatus.NODATA;
        }
      } catch (e: any) {
        status = JourneyPinStatus.ERROR;
        error = e;
        result = e.message;
      }
      const t1 = performance.now();

      let ucidIndex = args.indexOf("ucid");
      let ucid = "";
      if (ucidIndex > -1) {
        ucid = args[ucidIndex];
      }

      const jpin: JourneyPin = {
        id,
        description,
        sequence,
        status,
        type,
        ucid,
        start: new Date(t0),
        end: new Date(t1),
        duration: t1 - t0,
        input: args,
        function: propertyKey,
        output: result,
      };

      console.log(jpin);

      if (error != undefined) {
        throw error;
      }
      return result;
    };
    return descriptor;
  };
}

export function JourneyPinAsync(
  id: string,
  description: string,
  sequence: number,
  type: string
): any {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    descriptor =
      descriptor || Object.getOwnPropertyDescriptor(target, propertyKey);
    const targetMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      let result;
      let error;
      let status = JourneyPinStatus.SUCCESS;

      const t0 = performance.now();
      try {
        result = await targetMethod.apply(this, args);
        if (result == null) {
          status = JourneyPinStatus.NODATA;
        }
      } catch (e: any) {
        status = JourneyPinStatus.ERROR;
        error = e;
        result = e.message;
      }
      const t1 = performance.now();

      let ucidIndex = args.indexOf("ucid");
      let ucid = "";
      if (ucidIndex > -1) {
        ucid = args[ucidIndex];
      }

      const jpin: JourneyPin = {
        id,
        description,
        sequence,
        status,
        type,
        ucid,
        start: new Date(t0),
        end: new Date(t1),
        duration: t1 - t0,
        input: args,
        function: propertyKey,
        output: result,
      };

      console.log(jpin);

      if (error != undefined) {
        throw error;
      }
      return result;
    };
    return descriptor;
  };
}
