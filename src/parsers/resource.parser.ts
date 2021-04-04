import Environment from '../config-types/environment.type';
import FileParser from './file.parser';

export default class ResourceParser {
  static parseResource(resourceName: string, file: string): Environment | undefined {
    const configFile = FileParser.loadConfigFile(file);
    const resources = configFile.resources;

    if (!resources) {
      return undefined;
    }

    let foundedResource: Environment | undefined = undefined;

    Object.keys(resources).forEach((globalResourceKey) => {
      const globalResourceKeys = globalResourceKey.split('|');

      if (globalResourceKey === resourceName || globalResourceKeys.includes(resourceName)) {
        return foundedResource = resources[globalResourceKey];
      }
    });

    return foundedResource;
  }
}
