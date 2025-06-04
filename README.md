<div align="center">
  <a href="https://aws-icon.vercel.app/">
    <img src="https://raw.githubusercontent.com/MKAbuMattar/aws-react-icons/main/src/assets/aws-react-icons.svg" alt="AWS React Icons Logo" height="140" />
  </a>

  <h1>AWS React Icons</h1>

<a href="https://aws-icon.vercel.app/">https://aws-icon.vercel.app/</a>

  <br/>

  <p>AWS React Icons, a React library for AWS icons based on the official AWS icon set (SVG) and built with TypeScript, Build from <a href="https://aws.amazon.com/architecture/icons/"><span>AWS Architecture Icons | Version Q1 2025</span></a></p>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/aws-react-icons" target="_blank">
    <img src="https://img.shields.io/badge/npm-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt=""/>
  </a>

  <a href="https://github.com/MKAbuMattar/aws-react-icons" target="_blank">
    <img src="https://img.shields.io/badge/github-%23181717.svg?style=for-the-badge&logo=github&logoColor=white" alt=""/>
  </a>

  <a href="https://github.com/MKAbuMattar/aws-react-icons/releases">
    <img alt="GitHub release" src="https://img.shields.io/github/v/release/MKAbuMattar/aws-react-icons?color=%23d52128&label=Latest%20release&style=for-the-badge" />
    </a>

  <a href="/LICENSE">
    <img alt="GitHub" src="https://img.shields.io/github/license/MKAbuMattar/aws-react-icons?color=%23d52128&style=for-the-badge">
  </a>

  <a href="https://github.com/MKAbuMattar/aws-react-icons/stargazers">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/MKAbuMattar/aws-react-icons?color=%23d52128&label=github%20stars&style=for-the-badge">
  </a>
</div>

## 📦 Install package

```bash
#npm
npm install --save aws-react-icons

#yarn
yarn add aws-react-icons

#pnpm
pnpm add aws-react-icons
```

## 📖 Usage

```tsx
// single import
import ArchitectureServiceAmazonEC2 from 'aws-react-icons/icons/ArchitectureServiceAmazonEC2';

const App = () => {
  return (
    <div>
      <ArchitectureServiceAmazonEC2 size={30} />
    </div>
  );
};

export default App;
```

OR

```tsx
// multiple imports
import {
  ArchitectureServiceAmazonEC2,
  ArchitectureServiceAWSCloudFormation,
} from 'aws-react-icons';

const App = () => {
  return (
    <div>
      <ArchitectureServiceAmazonEC2 size={30} />
      <ArchitectureServiceAWSCloudFormation size={30} />
    </div>
  );
};

export default App;
```

## 📚 Icons Props

| Prop name | Type           | Default value | Description           |
| --------- | -------------- | ------------- | --------------------- |
| size      | number/ string | 24            | The size of the icon. |

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📜 Credits

- [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/)
