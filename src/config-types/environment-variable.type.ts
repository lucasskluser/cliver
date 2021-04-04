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
  readonly!: boolean;

  constructor() {
    Object.assign(this, {
      hide: false,
      readonly: false
    });
  }
}