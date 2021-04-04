import { existsSync, readFileSync, writeFileSync } from 'fs';
import EnvironmentConfig from '../config-types/environment-config.type';

export default class FileParser {
  static loadConfigFile(configFile: string): EnvironmentConfig {
    if (!existsSync(configFile)) {
      throw new Error(
        `No environment file '${configFile}' found`,
      );
    }

    const localEnvironmentConfig = readFileSync('.envrc');
    return JSON.parse(localEnvironmentConfig.toString()) as EnvironmentConfig;
  }

  static writeLocalEnvFile(
    lines: string[],
    envFile: string,
  ) {
    if (lines.length > 0) {
      writeFileSync(
        envFile,
        lines.reduce((prev, next) => (prev += `\n${next}`)),
      );
    }
  }
}
