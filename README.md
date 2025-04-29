<h1 align="center">Welcome to Expo Pod Pinner 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/expo-pod-pinner" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/expo-pod-pinner.svg">
  </a>
  <a href="https://github.com/rgomezp/expo-pod-pinner#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/rgomezp/expo-pod-pinner/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
</p>

> A Config Plugin for Expo to specify and pin pod versions directly in your project's Podfile without leaving the managed workflow.

## Overview
This plugin is an [Expo Config Plugin](https://docs.expo.dev/guides/config-plugins/) designed to enhance your Expo managed workflow by allowing direct modification of the `Podfile` to pin specific CocoaPods dependencies to desired versions. With Expo Pod Pinner, you can ensure consistent dependency versions across installations and updates, enhancing project stability.

## Supported Environments:
- [The Expo run commands](https://docs.expo.dev/workflow/customizing/) (`expo run:[android|ios]`)
- [Custom clients](https://blog.expo.dev/introducing-custom-development-clients-5a2c79a9ddf8)
- [EAS Build](https://docs.expo.dev/build/introduction/)

## Install
```sh
npx expo install expo-pod-pinner
```

## Configuration in app.json / app.config.js
### Plugin
Add the plugin to your [plugin array](https://docs.expo.dev/versions/latest/config/app/) in your project's configuration file. Configure any desired plugin props as follows:


**app.json**
```json
{
  "plugins": [
    [
      "expo-pod-pinner",
      {
        "targetName": "YourTargetName",
        "pods": [
          { "PodName": "0.0.0" }
        ]
      }
    ]
  ]
}

```

or

**app.config.js**
```js
export default {
  ...
  plugins: [
      [
        "expo-pod-pinner",
        {
          "targetName": "YourTargetName",
          "pods": [
            { "PodName": "Version" }
          ]
      }
      ]
  ]
};
```

### Optional: additional Podfile configuration

[Podfiles](https://guides.cocoapods.org/using/the-podfile.html) can do a lot more than just pinning versions. If you want to specify a pod with a complete Podfile specification, you can do so by using the `specs` prop. For example, to specify a pod with a git source and branch: 

**app.config.js**
```js
export default {
  ...
  plugins: [
      [
        "expo-pod-pinner",
        {
          "targetName": "YourTargetName",
          "specs": [
            { "Alamofire": ":git => 'https://github.com/Alamofire/Alamofire.git', :branch => 'dev'" }
          ]
      }
      ]
  ]
};
```

### Plugin Props
Configure the plugin using the following props in the plugin config object:

| Prop         | Type   | Description                                                                            |
|--------------|--------|----------------------------------------------------------------------------------------|
| `targetName` | string | The name of the target in your Podfile where the pods should be added.                 |
| `pods`       | array  | An array of objects specifying the pod names and their versions.                       |
| `specs`      | array  | An array of objects specifying the pod names and their complete Podfile specification. |

## Prebuild (optional)
Prebuilding in Expo will result in the generation of the native runtime code for the project (and `ios` and `android` directories being built). By prebuilding, we automatically link and configure the native modules that have implemented CocoaPods, autolinking, and other config plugins. You can think of prebuild like a native code bundler.

When you run `expo prebuild` we enter into a custom managed workflow which provides most of the benefits of bare workflows and managed workflows at the same time.

#### Why should I prebuild?
It may make sense to prebuild locally to inspect config plugin changes and help in debugging issues.

#### Run
```sh
npx expo prebuild
```

```sh
# nukes changes and rebuilds
npx expo prebuild --clean
```

**EAS Note:** if you choose to stay in a fully managed workflow by not prebuilding, EAS will still run `npx expo prebuild` at build time. You can also prebuild locally but remain in a fully managed workflow by adding the `android` and `ios` directories to your .gitignore.

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/rgomezp/expo-pod-pinner/issues).

## Show your support

Give a ⭐️ if this project helped you!


