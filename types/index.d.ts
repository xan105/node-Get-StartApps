declare interface IStartApp{
  name: string,
  appID: string
}

declare interface IOption{
  name?: string,
  appID?: string
}

export default function getStartApps(search?: string | IOption): Promise<IStartApp[]>;
export function has(search: string | IOption): Promise<boolean>;
export function isValidAUMID(appID: string): boolean;