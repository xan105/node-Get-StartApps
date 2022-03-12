declare IStartApp{
  name: string,
  appID: string
}

declare IOption{
  name?: string,
  appID?: string
}

export default getStartApps(search?: string | IOption): Promise<IStartApp[]>;
export has(search: string | IOption): Promise<boolean>;
export isValidAUMID(appID: string): boolean;