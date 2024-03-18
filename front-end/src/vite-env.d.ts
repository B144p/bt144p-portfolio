/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WAKATIME_SHARE_ID: string;
  readonly VITE_WAKA_SHARE_ACTIVITY_PATH: string;
  readonly VITE_WAKA_SHARE_LANGUAGES_PATH: string;
  readonly VITE_WAKA_SHARE_OS_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
