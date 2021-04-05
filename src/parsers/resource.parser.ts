import Environment from '../config-types/environment.type';
import FileParser from './file.parser';

export default class ResourceParser {
  static parseResource(
    resourceName: string,
    file: string,
  ): Environment | undefined {
    const configFile = FileParser.loadConfigFile(file);
    const resources = configFile.resources;

    if (!resources) {
      return undefined;
    }

    let foundedResource: Environment | undefined = undefined;

    Object.keys(resources).forEach((resourceKey) => {
      let variableName: string | undefined = undefined;
      const resourceKeys = resourceKey.split('|');

      if (resourceName.includes(':')) {
        variableName = resourceName.split(':')[1];
        resourceName = resourceName.split(':')[0];
      }

      if (resourceKey === resourceName || resourceKeys.includes(resourceName)) {
        if (variableName) {
          const resourceVariables = resources[resourceKey];

          Object.keys(resourceVariables).forEach((variable) => {
            if (variable !== variableName) {
              delete resourceVariables[variable];
            } else {
              resourceVariables[variable.replace(/([@#$])/gi, '')] = resourceVariables[variable]
              delete resourceVariables[variable];
            }
          });

          return (foundedResource = {
            title: resourceKey,
            variables: { ...resourceVariables },
          });
        }

        return (foundedResource = {
          title: resourceKey,
          variables: { ...resources[resourceKey] },
        });
      }
    });

    return foundedResource;
  }
}
