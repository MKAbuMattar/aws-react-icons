import fs from 'node:fs';
import path from 'node:path';
import { RecursiveDirectory, recursiveDirectory } from 'recursive-directory';

function removeSpecialCharacters(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, '');
}

(async () => {
  const files: RecursiveDirectory = (await recursiveDirectory(
    './aws-icons',
    true,
  )) as RecursiveDirectory;

  type Data = {
    name: string;
    component: string;
    importComponent: string;
    categorys: string[];
  };

  const data: Data[] = [];
  let name = '';
  let component = '';
  let importComponent = '';
  let categorys: string[] = [];
  let obj: Data;

  let prefix = '';

  files.forEach((file) => {
    const { fullpath, filename } = file;

    if (fullpath.includes('Architecture-Group-Icons')) {
      prefix = 'ArchitectureGroup';
    } else if (fullpath.includes('Architecture-Service-Icons')) {
      prefix = 'ArchitectureService';
    } else if (fullpath.includes('Category-Icons')) {
      prefix = 'Category';
    } else if (fullpath.includes('Resource-Icons')) {
      prefix = 'Resource';
    }

    name = removeSpecialCharacters(
      `${prefix} ${filename
        .replace(/([A-Z]+)(?=[A-Z][a-z0-9])/g, (match) =>
          match.length > 1 ? match.charAt(0) + match.slice(1) + ' ' : match,
        )
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace('.svg', '')
        .replace('32', '')
        .replaceAll('Io T', 'IoT ')
        .replace('AP Is', 'APIs')
        .replace('HTTP 2', 'HTTP2 ')
        .replace('S3', 'S3 ')
        .replace('FSxfor', 'FSx for')
        .replace('RA 3', 'RA3')
        .replace('EC2', 'EC2 ')
        .replace('Lo Ra WAN', 'LoRaWAN')
        .trim()}`,
    );

    component = removeSpecialCharacters(
      `${prefix}${filename.replace('.svg', '')}`,
    );

    importComponent = `import ${component} from 'aws-react-icons/icons/${component}';`;

    if (fullpath.includes('Architecture-Group-Icons')) {
      prefix = 'Architecture Group';
    } else if (fullpath.includes('Architecture-Service-Icons')) {
      categorys.push('Architecture Service');
    } else if (fullpath.includes('Category-Icons')) {
      categorys.push('Category');
    } else if (fullpath.includes('Resource-Icons')) {
      categorys.push('Resource');
    }

    if (fullpath.includes('Arch_')) {
      categorys.push(
        fullpath.split('Arch_')[1].split('/')[0].replace(/-/g, ' ').trim(),
      );
      if (
        fullpath.split('Arch_')[1].split('/')[0].replace(/-/g, ' ').trim() ===
        'Internet of Things'
      ) {
        categorys.push('IoT');
      }
    } else if (fullpath.includes('Res_')) {
      categorys.push(
        fullpath.split('Res_')[1].split('/')[0].replace(/-/g, ' ').trim(),
      );
    } else if (fullpath.includes('Arch-')) {
      categorys.push(`${name}`);
    }

    if (
      component.toLowerCase().includes('DatabaseMigrationService'.toLowerCase())
    ) {
      categorys.push('DMS');
    }

    obj = {
      name: name,
      component: component,
      importComponent: importComponent,
      categorys: categorys,
    };

    categorys = [];

    data.push(obj);
  });

  data.sort((a, b) => a?.categorys[1]?.localeCompare(b.categorys[1]));

  data.sort((a, b) => a?.categorys[0]?.localeCompare(b.categorys[0]));

  fs.writeFileSync(
    path.resolve(__dirname, 'build.config.json'),
    JSON.stringify(
      {
        data,
      },
      null,
      2,
    ),
  );
})();
