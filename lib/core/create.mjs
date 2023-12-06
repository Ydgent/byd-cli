import { program } from 'commander';

import {
  createProjectAction,
  addPageAction,
  addTablePageAction,
} from './actions.mjs';

export const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action((project) => {
      createProjectAction(project);
    });
  
  program
    .command('addpage <page>')
    .description('add page, 例如: byd addpage Home [-d src/pages]')
    .action((page) => {
      addPageAction(page, program.dest || 'src/pages');
    });

  program
    .command('addtablepage <page>')
    .description('add tablepage, 例如: byd addtablepage Home [-d src/pages]')
    .action((page) => {
      addTablePageAction(page, program.dest || 'src/pages');
    });
}
