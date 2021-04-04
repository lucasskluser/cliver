import Environment from './environment.type';

export default class EnvironmentConfig {
  environments!: { [key: string]: Environment };
  resources?: { [key: string]: Environment };

  constructor(config: EnvironmentConfig) {
    Object.assign(this, config);
  }
}
