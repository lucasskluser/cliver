import Command, { flags } from '@oclif/command';
import EnvironmentVariable from '../config-types/environment-variable.type';
import VariableParser from '../parsers/variable.parser';
import Environment from '../config-types/environment.type';
import EnvironmentParser from '../parsers/environment.parser';
import ResourceParser from '../parsers/resource.parser';
import FileParser from '../parsers/file.parser';

export default class Load extends Command {
  static description = 'Loads an environment';

  static examples = ['$ enver load dev'];

  static args = [
    {
      name: 'environment',
      required: true,
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
      default: '.envrc'
    }),

    destination: flags.string({
      char: 'd',
      description: 'Export config file destination',
      default: '.env'
    })
  };

  async run() {
    try {
      const { args, flags } = this.parse(Load);
      const environmentArg = args.environment;
      const resourcesFlags = flags.resources;
      const fileFlag = flags.file;
      const destinationFlag = flags.destination;

      let variables: EnvironmentVariable[] = [];

      variables.push(...this.loadEnvironments([environmentArg, '*'], fileFlag));
      variables.push(...this.loadResources(resourcesFlags, fileFlag));
      variables = VariableParser.replaceTemplateVariables(variables);

      const fileLines: string[] = [];

      for (const variable of variables) {
        if (!variable.hide) {
          fileLines.push(`${variable.key}=${variable.value}`);
        }
      }

      FileParser.writeLocalEnvFile(fileLines, destinationFlag);
    } catch (error) {
      this.error(error);
    }
  }

  private loadEnvironments(environmentsKeys: string[], file: string): EnvironmentVariable[] {
    const loadedEnvironments: Environment[] = [];
    const variables: EnvironmentVariable[] = [];

    for (const environmentKey of environmentsKeys) {
      const loadedEnvironment = EnvironmentParser.parseEnvironment(
        environmentKey,
        file
      );

      if (loadedEnvironment) {
        loadedEnvironments.push(loadedEnvironment);
      }
    }

    for (const environment of loadedEnvironments) {
      Object.keys(environment).forEach((variable) => {
        variables.push(
          VariableParser.parseVariable(variable, environment[variable]),
        );
      });
    }

    return variables;
  }

  private loadResources(resourcesKeys: string[], file: string): EnvironmentVariable[] {
    const loadedResources: Environment[] = [];
    const variables: EnvironmentVariable[] = [];

    for (const resourceKey of resourcesKeys) {
      const loadedEnvironment = ResourceParser.parseResource(resourceKey, file);

      if (loadedEnvironment) {
        loadedResources.push(loadedEnvironment);
      }
    }

    for (const environment of loadedResources) {
      Object.keys(environment).forEach((variable) => {
        variables.push(
          VariableParser.parseVariable(variable, environment[variable]),
        );
      });
    }

    return variables;
  }
}
