import Environment from '../config-types/environment.type';
import FileParser from './file.parser';

export default class EnvironmentParser {
  static parseEnvironment(
    environment: string,
    file: string,
  ): Environment | undefined {
    const configFile = FileParser.loadConfigFile(file);
    let foundedEnvironment: Environment | undefined = undefined;

    Object.keys(configFile.environments).forEach((environmentKey) => {
      const environmentKeys = environmentKey.split('|');

      for (const key of environmentKeys) {
        if (key === environment) {
          return (foundedEnvironment = {
            title: environmentKey,
            variables: { ...configFile.environments[environmentKey] },
          });
        }
      }
    });

    return foundedEnvironment;
  }
}
