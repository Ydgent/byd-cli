import path from 'path';
import downLoadGitRepo from 'download-git-repo';

import {
  compile,
  writeToFile,
  createDirSync
} from '../utils/utils.mjs';
import {
  bydIceRepo,
} from '../config/repo-config.mjs';
import {
  commandSpawn
} from '../utils/terminal.mjs';

export const download = (...args) => {
  return new Promise((resolve, reject) => {
    downLoadGitRepo(...args, () => {
      resolve();
    });
  });
}

export const createProjectAction = async (project) => {
  try {
    // 1.clone项目
    console.log("下载中～");
    await download(bydIceRepo, project, { clone: true });

    // 2.执行npm install
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    console.log("npm install");
    await commandSpawn(command, ['install'], { cwd: `./${project}` })

    // // 3.运行npm run start
    console.log("npm run start");
    commandSpawn(command, ['run', 'start'], { cwd: `./${project}` });
  } catch (error) {
    console.log(error);
  }
}

// 添加页面
export const addPageAction = async (name, dest) => {
  // 1.编译ejs模板
  const data = {name, lowerName: name.toLowerCase()};
  const pageResult = await compile('page.tsx.ejs', data);
  const cssResult = await compile('page.css.ejs', data);
  // 3.写入文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, 'index.tsx');
    const targetRoutePath = path.resolve(targetDest, 'index.module.css');
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRoutePath, cssResult);
  }
}

// 添加table页面
export const addTablePageAction = async (name, dest) => {
  // 1.编译ejs模板
  const data = {name, lowerName: name.toLowerCase()};
  const pageResult = await compile('table-page.tsx.ejs', data);
  const cssResult = await compile('page.css.ejs', data);

  // 3.写入文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, 'index.tsx');
    const targetRoutePath = path.resolve(targetDest, 'index.module.css');
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRoutePath, cssResult);
  }
}
