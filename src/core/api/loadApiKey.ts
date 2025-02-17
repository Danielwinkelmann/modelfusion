export function loadApiKey({
  apiKey,
  environmentVariableName,
  apiKeyParameterName = "apiKey",
  description,
}: {
  apiKey: string | undefined;
  environmentVariableName: string;
  apiKeyParameterName?: string;
  description: string;
}): string {
  apiKey ??= process.env[environmentVariableName];

  if (apiKey == null) {
    throw new Error(
      `${description} API key is missing. Pass it using the '${apiKeyParameterName}' parameter or set it as an environment variable named ${environmentVariableName}.`
    );
  }

  return apiKey;
}
