# ecom

Project name is `ecom` which `is an ecommerce project`.

## Prerequisites

Before you begin, ensure you have met the following requirements:

<!--- These are just example requirements. Add, duplicate or remove as required --->

- You have installed the latest version of `nodejs`
- You have a `<Windows/Linux/Mac>` machine.
- > **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Library Used to create custom component to reduce framework or library dependency

[Shopify Restyle](https://shopify.github.io/restyle/fundamentals/)

## Getting Started

#### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To install the dependencies & start Metro, run the following command from the _root_ of your project dir:

```bash
yarn
```

```bash
yarn start
```

#### Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your project dir. Run the following command to start your _Android_ or _iOS_ app:

#### For Android

```bash
yarn android
```

#### For iOS

Navigate to iOS directory

```bash
pod install
```

From root:

```
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
