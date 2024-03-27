export type PodEntry = { [podName: string]: string };

export function isPodEntry(entry: any): entry is PodEntry {
  if (typeof entry !== "object") {
    return false;
  }

  for (const [podName, version] of Object.entries(entry)) {
    if (typeof podName !== "string" || typeof version !== "string") {
      return false;
    }
  }

  return true;
}

export type PodPinnerPluginProps = {
  targetName: string;
  pods: PodEntry[];
};

export const PLUGIN_PROPS: string[] = [
  "targetName",
  "pods"
];
