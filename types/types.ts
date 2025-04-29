export type PodEntry = { [podName: string]: string };

export type SpecEntry = { [podName: string]: string };

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

export function isSpecEntry(entry: any): entry is SpecEntry {
  // Spec and Pod have the same types
  return isPodEntry(entry);
}

export type PodPinnerPluginProps = {
  targetName: string;
  pods?: PodEntry[];
  specs?: SpecEntry[];
};

export const PLUGIN_PROPS: string[] = [
  "targetName",
  "pods",
  "specs",
];
