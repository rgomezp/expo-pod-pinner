import { ConfigPlugin } from '@expo/config-plugins';
import { PodPinnerPluginProps } from '../types/types';
import { withPodPinnerIos } from './withPodPinnerIos';
import { validatePluginProps } from '../support/helpers';

const withPodPinner: ConfigPlugin<PodPinnerPluginProps> = (config, props) => {
  // if props are undefined, throw error
  if (!props) {
    throw new Error(
      'You are trying to use the Pod Pinner plugin without any props.'
    );
  }

  validatePluginProps(props);

  config = withPodPinnerIos(config, props);

  return config;
};

export default withPodPinner;
