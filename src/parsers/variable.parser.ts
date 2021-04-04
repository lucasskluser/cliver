import EnvironmentVariable from '../config-types/environment-variable.type';

export default class VariableParser {
  static parseVariable(
    variableName: string,
    variableValue: string,
  ): EnvironmentVariable {
    const variable: EnvironmentVariable = new EnvironmentVariable();

    // Hide annotation
    if (variableName.startsWith('@')) {
      variable.hide = true;
    }

    // Readonly annotation
    if (variableName.startsWith('#')) {
      variable.readonly = true;
    }

    const EMPTY_STRING = '';

    variable.key = variableName.replace(/([@#])/gi, EMPTY_STRING);
    variable.value = variableValue;

    return variable;
  }

  static replaceTemplateVariables(
    variables: EnvironmentVariable[],
  ): EnvironmentVariable[] {
    let templatesFounds: number = 0;

    do {
      for (const variable of variables) {
        if (!variable.readonly) {
          const replaceRegex = RegExp(/(?<={{)([^{}][a-zA-Z_0-9-]+)(?=}})/gi);
          const variablesToReplace = variable.value.match(replaceRegex);

          if (variablesToReplace) {
            templatesFounds += variablesToReplace.length;

            for (const variableToReplace of variablesToReplace) {
              const foundedVariable = variables.find(
                (v) => v.key === variableToReplace,
              );

              if (foundedVariable) {
                variable.value = variable.value.replace(
                  `{{${variableToReplace}}}`,
                  foundedVariable.value,
                );

                templatesFounds--;
              }
            }
          }
        }
      }
    } while (
      variables.find(
        (variable) =>
          variable.value.match(/(?<={{)([^{}][a-zA-Z_0-9-]+)(?=}})/gi) &&
          !variable.readonly,
      )
    );

    return variables;
  }
}
