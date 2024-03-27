import {
  ConfigPlugin,
  withDangerousMod
} from "@expo/config-plugins";
import * as path from 'path';
import { updatePodfile } from "../support/updatePodfile";
import { PodPinnerLog } from "../support/PodPinnerLog";
import { PodPinnerPluginProps } from "../types/types";

const withPodPinnerPodfile: ConfigPlugin<PodPinnerPluginProps> = (config, props) => {
  return withDangerousMod(config, [
    'ios',
    async config => {
      const iosRoot = path.join(config.modRequest.projectRoot, "ios")
      // Pass props to updatePodfile
      await updatePodfile(iosRoot, props).catch(err => { PodPinnerLog.error(err) });

      return config;
    },
  ]);
}

export const withPodPinnerIos: ConfigPlugin<PodPinnerPluginProps> = (config, props) => {
  config = withPodPinnerPodfile(config, props)
  return config;
};