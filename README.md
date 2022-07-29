# React Native ML Kit

## Installation

```js
// clone the project from the github
git clone https://github.com/dimaportenko/react-native-mlkit-tutorial

// move to the project directory
cd react-native-mlkit-tutorial

// install the project's necessary packages(dependencies and devDependepencies)
npm install

// run these two scripts in the two separate terminal side by side
npm start

npm run android
```

## Project Files

### 1) `App.tsx`

- this is the root file of the Project, contains only Navigations

### 2) `screens/SelectImageScreen.tsx`

- this is the Initial Route or Home Screen of the App which contains three buttons
- - Named :
- - - **_`Take Image`_** :- takes image using the **_Camera_**
- - - **_`Select Image`_** :- select image from the device's **_Gallery_**
- - - **_`Process Image`_** :- it just takes the image either from the Gallery or Camera and will send it to the **_ProcessImageScreen_** and this file is responsible for Extracting the text from the Image

### 3) `src/screens/ProcessImageScreen.tsx`

- As I mentioned above, this file is responsible for Extracting Text from the Image and render desired output on this Screen.

- It Basically, invoke the **_'recognizeImage'_** function from the `src/mlkit/index.ts` file, takes its output and render it on the Screen.

### 4) `src/mlkit/index.ts`

- this file uses the `react-native`'s Core API named `NativeModules` and access it's Object `TextRecognitionModule` for recognizing the Text from the Image.

```js
import {NativeModules} from 'react-native';

const {TextRecognitionModule} = NativeModules;

/// ...other typescript code

export const recognizeImage = (url: string): Promise<Response> => {
  return TextRecognitionModule.recognizeImage(url);
};
```

### 5) `src/components/ui/*.tsx`

- these three files are responsible for creating some Reusable Components, nothing special

### 6) `src/naivgation/*.tsx`

- these two files are responsbile for creating the Stack Navigation .
