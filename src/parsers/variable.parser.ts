import EnvironmentVariable from '../config-types/environment-variable.type';

export default class VariableParser {
  static parseVariable(
    variableName: string,
    variableValue: string,
    variableOrigin: string,
  ): EnvironmentVariable {
    const variable: EnvironmentVariable = new EnvironmentVariable();

    // Hide annotation
    if (variableName.startsWith('@')) {
      variable.hide = true;
    }

    // Read only annotation
    if (variableName.startsWith('#')) {
      variable.readOnly = true;
    }

    // Include only annotation
    if (variableName.startsWith('$')) {
      variable.includeOnly = true;
    }

    const EMPTY_STRING = '';

    variable.key = variableName.replace(/([@#$])/gi, EMPTY_STRING);
    variable.value = variableValue;
    variable.origin = variableOrigin;

    return variable;
  }

  static replaceTemplateVariables(
    variables: EnvironmentVariable[],
  ): EnvironmentVariable[] {
    const MAX_LOOP = 5000;
    let loopCount = 0;

    do {
      for (const variable of variables) {
        if (!variable.readOnly) {
          const replaceRegex = RegExp(/(?<={{)([^{}][a-zA-Z_0-9-]+)(?=}})/gi);
          const variablesToReplace = variable.value.match(replaceRegex);

          if (variablesToReplace) {
            for (const variableToReplace of variablesToReplace) {
              const foundedVariables = variables.filter(
                (v) => v.key === variableToReplace,
              );

              if (foundedVariables && foundedVariables.length > 0) {
                const foundedVariableSameOrigin = foundedVariables.find(
                  v => v.origin === variable.origin
                );

                variable.value = variable.value.replace(
                  `{{${variableToReplace}}}`,
                  foundedVariableSameOrigin?.value ?? foundedVariables[0].value,
                );
              }
            }
          }
        }
      }

      loopCount++;
    } while (
      variables.find(
        (variable) =>
          variable.value.match(/(?<={{)([^{}][a-zA-Z_0-9-]+)(?=}})/gi) &&
          !variable.readOnly,
      ) &&
      loopCount <= MAX_LOOP
    );

    return variables;
  }
}
