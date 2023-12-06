import { program } from 'commander';

export const helpOptions = () => {
  // 增加自己的options
  program.option('-b --byd', 'a byd cli（脚手架工具）');
  program.option('-d --dest <dest>', 'a destination folder（目标文件夹）, 例如: -d /src/components')

  program.on('--help', function () {
    console.log("");
    console.log("Other:")
    console.log("  具体使用文档请参考（https://github.com/Ydgent/byd-cli.git）");
  });
}
