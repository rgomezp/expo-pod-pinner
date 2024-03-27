import { PLUGIN_PROPS, isPodEntry } from "../types/types";

export function validatePluginProps(props: any): void {
  // check the type of each property
  if (typeof props.targetName !== "string") {
    throw new Error("Expo Pod Pinner: 'targetName' must be a string.");
  }

  if (props.pods && isPodEntry(props.pods)) {
    throw new Error("Expo Pod Pinner: 'pods' must be an object with string keys and string values.");
  }

  // check for extra properties
  const inputProps = Object.keys(props);

  for (const prop of inputProps) {
    if (!PLUGIN_PROPS.includes(prop)) {
      throw new Error(`Expo Pod Pinner: '${prop}' is not a valid property.`);
    }
  }
}

export function generateRegexFromString(input: string): RegExp {
  return new RegExp(input, "g");
}
