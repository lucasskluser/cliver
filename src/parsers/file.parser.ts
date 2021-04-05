import { existsSync, readFileSync, writeFileSync } from 'fs';
import EnvironmentConfig from '../config-types/environment-config.type';

export default class FileParser {
  static loadConfigFile(configFilePath: string): EnvironmentConfig {
    if (!existsSync(configFilePath)) {
      throw new Error(`No environment file '${configFilePath}' found`);
    }

    const configFile = readFileSync(configFilePath);
    let parsedConfig = JSON.parse(configFile.toString()) as EnvironmentConfig;
    parsedConfig = this.extendEnvironment(parsedConfig);
    
    return parsedConfig;
  }

  static writeLocalEnvFile(lines: string[], envFile: string) {
    if (lines.length > 0) {
      writeFileSync(
        envFile,
        lines.reduce((prev, next) => (prev += `\n${next}`)),
      );
    }
  }

  private static extendEnvironment(
    environment: EnvironmentConfig,
  ): EnvironmentConfig {
    if (environment.extends) {
      const extendedConfig = readFileSync(environment.extends);
      let parsedExtendedConfig = JSON.parse(
        extendedConfig.toString(),
      ) as EnvironmentConfig;

      if (parsedExtendedConfig.extends) {
        parsedExtendedConfig = this.extendEnvironment(parsedExtendedConfig);
      }

      environment.environments = {
        ...environment.environments,
        ...parsedExtendedConfig.environments,
      };

      environment.resources = {
        ...environment.resources,
        ...parsedExtendedConfig.resources,
      };
    }

    return environment;
  }
}
