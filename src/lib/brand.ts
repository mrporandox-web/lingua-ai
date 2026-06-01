export const APP_NAME = "Lyra";

export const APP_DESCRIPTION =
  "AI-репетитор английского, который запоминает, как тебе удобнее учиться.";

export const TARGET_LANGUAGE = {
  id: "en",
  nameRu: "Английский",
  nameEn: "English",
  greeting: "Hello!",
} as const;

export const LANGUAGE_OPTIONS = [TARGET_LANGUAGE] as const;
