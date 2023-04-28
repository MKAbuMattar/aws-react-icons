import fs from 'fs';
import fsAsync from 'fs/promises';
import { JSDOM } from 'jsdom';
import { RecursiveDirectory, recursiveDirectory } from 'recursive-directory';
import svgtojsx from 'svg-to-jsx';

type ObjConfig = {
  name: string;
  fullpath: string;
  filepath: string;
  filename: string;
  dirname: string;
};

const generateSvgComponent = async (rootDir: string) => {
  if (fs.existsSync(`${__dirname}/../build`)) {
    fs.rmSync(`${__dirname}/../build`, { recursive: true });
  }

  const index: [string, string][] = [];
  const objConfig: ObjConfig[] = [];

  const config: RecursiveDirectory = (await recursiveDirectory(
    rootDir,
    true,
  )) as RecursiveDirectory;

  config.forEach((item) => {
    objConfig.push({
      name: item.filename
        .split('-')
        .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
        .join('')
        .replace(/.svg/g, ''),
      fullpath: item.fullpath,
      filepath: item.filepath,
      filename: item.filename,
      dirname: item.dirname,
    });
  });

  await fsAsync.mkdir(`${__dirname}/../build`);
  await fsAsync.mkdir(`${__dirname}/../build/icons`);

  await Promise.all(
    objConfig.map(async (entry) => {
      const name = `${entry.name}`;

      const icon = await fsAsync.readFile(
        `${__dirname}/../icons/${entry.filename}`,
      );

      const { document } = await new JSDOM(icon).window;

      const dir = `${__dirname}/../build/icons`;

      const reactName = `${name}`;

      index.push([reactName, `./icons/${reactName}`]);

      const svg = document.getElementsByTagName('svg')[0];
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.removeAttribute('xmlns:xlink');

      const svgTemplate = `const React = require("react");
module.exports = function ${reactName}({size = "24", ...props}){
  props = {
    ...props,
    style: {
      ...(props.style ? props.style : {}),
    }
  }
  return (${(await svgtojsx(svg.outerHTML)).replace(
    '<svg',
    '<svg {...props} width={size} height={size}',
  )});
}`;

      await fsAsync.writeFile(`${dir}/${reactName}.jsx`, svgTemplate);

      const definitions = `import React from "react";
interface Props extends React.SVGProps<SVGElement> {
  size?: number | string;
}
declare const ${reactName}: React.FunctionComponent<Props>;
export default ${reactName};`;

      await fsAsync.writeFile(`${dir}/${reactName}.d.ts`, definitions);

      await fsAsync.writeFile(
        `${__dirname}/../build/index.js`,
        index.map((e) => `const ${e[0]} = require("${e[1]}")`).join(';\n') +
          ';\n' +
          `module.exports = {${index.map((e) => e[0]).join(',')}}`,
      );
      await fsAsync.writeFile(
        `${__dirname}/../build/index.d.ts`,
        index
          .map((e) => `export { default as ${e[0]} } from "${e[1]}"`)
          .join(';\n'),
      );
    }),
  );
};

(async () => {
  await generateSvgComponent('icons');
})();
