import Command, { flags } from '@oclif/command';
import EnvironmentVariable from '../config-types/environment-variable.type';
import VariableParser from '../parsers/variable.parser';
import Environment from '../config-types/environment.type';
import EnvironmentParser from '../parsers/environment.parser';
import ResourceParser from '../parsers/resource.parser';
import FileParser from '../parsers/file.parser';

export default class Load extends Command {
  static description = 'Loads an environment';

  static examples = ['$ cliver load', '$ cliver load dev', '$ cliver load dev -r database -i public_api:key'];

  static args = [
    {
      name: 'environment',
      required: false,
      description: 'Environment that should be loaded',
    },
  ];

  static flags = {
    resources: flags.string({
      char: 'r',
      description: 'Resource that should be loaded',
      multiple: true,
    }),

    file: flags.string({
      char: 'f',
      description: 'File that contains environment config',
      default: '.envrc',
    }),

    destination: flags.string({
      char: 'd',
      description: 'Environment file destination',
      default: '.env',
    }),

    include: flags.string({
      char: 'i',
      description: 'Resource that should be included in environment',
      multiple: true,
    }),
  };

  async run() {
    try {
      const { args, flags } = this.parse(Load);
      
      let fileFlag = flags.file;
      let environmentArg = undefined;
      let resourcesFlags = undefined;
      let includesFlag = undefined;
      let destinationFlag = undefined;

      const configFile = FileParser.loadConfigFile(fileFlag);

      if (configFile.command && configFile.command.load) {
        const loadConfigs = configFile.command.load;
        
        if (loadConfigs.environment) {
          environmentArg = loadConfigs.environment;
        }

        if (loadConfigs.resources) {
          resourcesFlags = loadConfigs.resources;
        }

        if (loadConfigs.include) {
          includesFlag = loadConfigs.include;
        }

        if (loadConfigs.file) {
          fileFlag = loadConfigs.file;
        }

        if (loadConfigs.destination) {
          destinationFlag = loadConfigs.destination;
        }
      }

      environmentArg = args.environment ?? environmentArg;
      resourcesFlags = flags.resources ??resourcesFlags;
      includesFlag = flags.include ?? includesFlag;
      destinationFlag = flags.destination ?? destinationFlag;

      if (!environmentArg) {
        throw new Error('No environment defined and no local config file found');
      }

      let variables: EnvironmentVariable[] = [];

      variables.push(...this.loadEnvironments([environmentArg, '*'], fileFlag));
      let resourcesToLoad: string[] = [];

      if (resourcesFlags) {
        resourcesToLoad = resourcesToLoad.concat(resourcesFlags);
      }

      if (includesFlag) {
        resourcesToLoad = resourcesToLoad.concat(includesFlag);
      }

      if (resourcesToLoad.length > 0) {
        variables.push(
          ...this.loadResources(
            this.removeDuplicatesFromArray(resourcesToLoad),
            fileFlag,
          ),
        );
      }

      variables = VariableParser.replaceTemplateVariables(variables);

      const fileLines: string[] = [];

      for (const variable of variables) {
        if (!variable.hide && !variable.includeOnly) {
          if (
            !includesFlag || !includesFlag
              .map((include) => `resource:${include}`)
              .includes(variable.origin)
          ) {
            fileLines.push(`${variable.key}=${variable.value}`);
          }
        } else if (
          includesFlag &&
          variable.includeOnly &&
          includesFlag
            .map((include) => `resource:${include}`)
            .includes(variable.origin)
        ) {
          fileLines.push(`${variable.key}=${variable.value}`);
        }
      }

      FileParser.writeLocalEnvFile(fileLines, destinationFlag);
    } catch (error) {
      this.error(error);
    }
  }

  private loadEnvironments(
    environmentsKeys: string[],
    file: string,
  ): EnvironmentVariable[] {
    const loadedEnvironments: Environment[] = [];
    const variables: EnvironmentVariable[] = [];

    for (const environmentKey of environmentsKeys) {
      const loadedEnvironment = EnvironmentParser.parseEnvironment(
        environmentKey,
        file,
      );

      if (loadedEnvironment) {
        loadedEnvironments.push(loadedEnvironment);
      }
    }

    for (const environment of loadedEnvironments) {
      Object.keys(environment.variables).forEach((variable) => {
        variables.push(
          VariableParser.parseVariable(
            variable,
            environment.variables[variable],
            `environment:${environment.title}`,
          ),
        );
      });
    }

    return variables;
  }

  private loadResources(
    resourcesKeys: string[],
    file: string,
  ): EnvironmentVariable[] {
    const loadedResources: Environment[] = [];
    const variables: EnvironmentVariable[] = [];

    for (const resourceKey of resourcesKeys) {
      const loadedEnvironment = ResourceParser.parseResource(resourceKey, file);

      if (loadedEnvironment) {
        loadedResources.push(loadedEnvironment);
      }
    }

    for (const environment of loadedResources) {
      Object.keys(environment.variables).forEach((variable) => {
        variables.push(
          VariableParser.parseVariable(
            variable,
            environment.variables[variable],
            `resource:${environment.title}`,
          ),
        );
      });
    }

    return variables;
  }

  private removeDuplicatesFromArray(array: string[]): string[] {
    var newArray = [];

    for (var i = 0; i < array.length; i++) {
      if (newArray.indexOf(array[i]) == -1) {
        newArray.push(array[i]);
      }
    }

    return newArray;
  }
}
