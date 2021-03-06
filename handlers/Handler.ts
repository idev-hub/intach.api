export default abstract class Handler {
  public abstract getGroups (res: IParamsMethodHandler): object
  public abstract getLessonsWeek (res: IParamsMethodHandler): object
  public abstract getLessons (res: IParamsMethodHandler): object
  public abstract getCorps (res: IParamsMethodHandler): object
}

export interface IParamsMethodHandler {
  params?: IParamsMethod,
  settings?: ISettingsHandler
}

export interface ISettingsHandler {
  [propName: string]: any;
}

export interface IParamsMethod {
  group?: string,
  date?: string,
  corps?: string,

  [propName: string]: any;
}
