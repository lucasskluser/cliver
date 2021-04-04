export default class EnvironmentResource {
  [key: string]: { [key: string]: string };

  constructor(resource: EnvironmentResource) {
    Object.assign(this, resource);
  }
}
