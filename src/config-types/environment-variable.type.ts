export default class EnvironmentVariable {
  /**
   * Chave da variável de ambiente
   */
  key!: string;

  /**
   * Valor da variável de ambiente
   */
  value!: string;

  /**
   * Indica se a variável é oculta (?)
   */
  hide!: boolean;

  /**
   * Indica se a variável é apenas leitura (!)
   */
  readOnly!: boolean;

  /**
   * Indica se a variável deve ser apenas inclusão
   */
  includeOnly!: boolean;

  /**
   * Variable origin (environment or resource name)
   */
  origin!: string;

  constructor() {
    Object.assign(this, {
      hide: false,
      readOnly: false,
      includeOnly: false,
    });
  }
}
