export default class EnvironmentConfig {
  environments!: { [key: string]: { [key: string]: string } };
  resources?: { [key: string]: { [key: string]: string } };
  extends?: string;
  command?: {
    load?: {
      environment?: string,
      resources?: string[],
      include?: string[],
      destination?: string,
      file?: string
    }
  }

  constructor(config: EnvironmentConfig) {
    Object.assign(this, config);
  }
}
