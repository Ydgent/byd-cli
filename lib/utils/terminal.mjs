/**
 * 执行终端命令相关的代码
 */
import { spawn } from 'child_process';

// npm install 
export const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args);
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on("close", () => {
      resolve();
    })
  })
}

// const commandExec = (...args) => {
//   return new Promise((resolve, reject) => {
//     const childProcess = spawn(...args);
//     childProcess.stdout.pipe(process.stdout);
//     childProcess.stderr.pipe(process.stderr);
//     childProcess.on("close", () => {
//       resolve();
//     })
//   })
// }
