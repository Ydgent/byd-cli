#!/usr/bin/env node
import path from 'path';
import { program } from 'commander';
import fse from 'fs-extra';
import { fileURLToPath } from 'url';

import { helpOptions } from './lib/core/help.mjs';
import { createCommands } from './lib/core/create.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async function () {
  const bydPackageInfo = await fse.readJSON(path.join(__dirname, './package.json'));

  // 查看版本号
  program.version(bydPackageInfo.version, '-v, -V, -version, -Version');

  // 帮助和可选信息
  helpOptions();

  // 创建其他指令
  createCommands();

  program.parse(process.argv);
})();

