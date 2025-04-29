import { PodPinnerLog } from './PodPinnerLog';
import { FileManager } from './FileManager';
import { PodPinnerPluginProps } from '../types/types';

export async function updatePodfile(iosPath: string, props: PodPinnerPluginProps) {
  const podfileContent = await FileManager.readFile(`${iosPath}/Podfile`);
  let updatedPodfile = podfileContent;

  function addPodSpec(podRegex: RegExp, spec: string, podDeclaration: string, podName: string) {
    const match = podRegex.exec(updatedPodfile);
    if (match && match[1]) {
      // If the pod is already in the Podfile, check if the version needs updating.
      if (match[1] !== spec) {
        updatedPodfile = updatedPodfile.replace(podRegex, podDeclaration);
        PodPinnerLog.log(`Updated version for ${podName} in Podfile.`);
      } else {
        PodPinnerLog.log(`${podName} already has spec ${spec} in Podfile. No update needed.`);
      }
    } else {
      // If the pod isn't in the Podfile, add it under the specified target.
      const targetRegex = new RegExp(`target\\s+'${props.targetName.replace(/'/g, "\\'")}'\\s+do`, 'g');
      const targetMatch = targetRegex.exec(updatedPodfile);
      if (targetMatch) {
        updatedPodfile = updatedPodfile.replace(targetRegex, `$&\n  ${podDeclaration}`);
        PodPinnerLog.log(`Added ${podName} to ${props.targetName} target in Podfile.`);
      } else {
        PodPinnerLog.error(`Target "${props.targetName}" not found in Podfile.`);
      }
    }
  }

  props.pods?.forEach((pod) => {
    const podName = Object.keys(pod)[0];
    const version = pod[podName];
    const podDeclaration = `pod '${podName}', '${version}'`;
    const podRegex = new RegExp(`pod\\s+'${podName}'\\s*,\\s*'([^']*)'`, 'g');
    addPodSpec(podRegex, version, podDeclaration, podName);
  });
  props.specs?.forEach((pod) => {
    const podName = Object.keys(pod)[0];
    const spec = pod[podName];
    const podDeclaration = `pod '${podName}', ${spec}`;
    const podRegex = new RegExp(`pod\\s+'${podName}'\\s*,\\s*'([^']*)'`, 'g');
    addPodSpec(podRegex, spec, podDeclaration, podName);
  });

  // Only write to the Podfile if changes have been made.
  if (updatedPodfile !== podfileContent) {
    await FileManager.writeFile(`${iosPath}/Podfile`, updatedPodfile);
    PodPinnerLog.log("Podfile updated successfully.");
  } else {
    PodPinnerLog.log("No changes made to the Podfile.");
  }
}
