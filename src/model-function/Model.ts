import { ModelInformation } from "./ModelInformation.js";
import { FunctionObserver } from "../core/FunctionObserver.js";

export interface ModelSettings {
  /**
   * Observers that are called when the model is used in run functions.
   */
  observers?: Array<FunctionObserver>;
}

export interface Model<SETTINGS extends ModelSettings> {
  modelInformation: ModelInformation;
  readonly settings: SETTINGS;

  /**
   * Returns settings that should be recorded in observability events.
   * Security-related settings (e.g. API keys) should not be included here.
   */
  get settingsForEvent(): Partial<SETTINGS>;

  /**
   * The `withSettings` method creates a new model with the same configuration as the original model, but with the specified settings changed.
   *
   * @example
   * const model = new OpenAITextGenerationModel({
   *   model: "text-davinci-003",
   *   maxCompletionTokens: 500,
   * });
   *
   * const modelWithMoreTokens = model.withSettings({
   *   maxCompletionTokens: 1000,
   * });
   */
  withSettings(additionalSettings: Partial<SETTINGS>): this;
}
