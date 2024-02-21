import each from "lodash/each";
import get from "lodash/get";
import set from "lodash/set";

type Config = {
  uploadUrl: string;
  apiUrl: string;
  socketUrl: string;
  saveTranslations: boolean;
  fallbackLocale: string;
  locales: string[];
  defaultNamespace: string;
  namespaces: string[];
  termsUrl: string;
  meetingActiveBtnDurationInMin: {
    startTimeBuffer: number;
    endTimeBuffer: number;
  };
};

const config: Config = {
  uploadUrl: "http://localhost",
  apiUrl: "http://localhost/api",
  socketUrl: "http://localhost",
  saveTranslations: true,
  fallbackLocale: "en",
  locales: ["en"],
  defaultNamespace: "client",
  namespaces: ["*", "client"],
  termsUrl: "/terms",
  meetingActiveBtnDurationInMin: {
    startTimeBuffer: 15,
    endTimeBuffer: 60,
  },
};

export const loadConfig = async () =>
  fetch(`${window.location.origin}/config.json`)
    .then((response) => response.json())
    .then((data) => each(data, (v, k) => set(config, k, v)));

export const configGet = (key?: string) => (key ? get(config, key) : config);
export const configSet = (key: string, value: any) => set(config, key, value);
