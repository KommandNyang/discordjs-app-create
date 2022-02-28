import os from 'os';
import chalk from 'chalk';
import * as child from 'child_process';
import * as path from 'path';

import fs from 'fs';

/**
 * @param {Object} options
 * @param {string} options.rootdir
 * @param {string} options.prjdir
 * @param {string} options.djsVersion
 * @param {boolean} options.useDisbut
 * @param {boolean} options.useDokdo
 * @param {boolean} options.useKommando
 */
export const initProject = (options) => {
    console.log(chalk.cyan.bold('Initializing project...'));
    console.log(chalk.cyan.bold(`Operating System : ${os.platform()}`));
    if (os.platform() === "win32") {
        console.log(chalk.cyan.bold('Running setupModules.bat'));
        try {
            let chp = child.execSync(`start ${options.rootdir}\\modules\\common\\setupModules.bat`, {
                env: {
                    PROJECT_DIR: path.isAbsolute(options.prjdir) ? options.prjdir : process.cwd() + "\\" + options.prjdir,
                    DJSVER: options.djsVersion,
                    USEKOMM: options.useKommando,
                    USEDOK: options.useDokdo,
                    USEDISBUT: options.useDisbut
                }
            });
        } catch {
            console.error(chalk.red.bold("Setup failed. \n") + chalk.cyan.bold('Please try again\n') + chalk.cyan.bold('If the problem persists, create an issue on https://github.com/KommandNyang/discordjs-app-create'));
        } finally {
            console.log(chalk.cyan.bold("Module setup succeeded.\n"));
        }
    } else {
        console.log(chalk.cyan.bold('Running setupModules.sh'));
        try {
            let chp = child.execSync(`sh ${options.rootdir}/modules/common/setupModules.sh`, {
                env: {
                    PROJECT_DIR: path.isAbsolute(options.prjdir) ? options.prjdir : process.cwd() + "/" + options.prjdir,
                    DJSVER: options.djsVersion,
                    USEKOMM: options.useKommando,
                    USEDOK: options.useDokdo,
                    USEDISBUT: options.useDisbut
                }
            });
        } catch {
            console.error(chalk.red.bold("Setup failed. \n") + chalk.cyan.bold('Please try again with Administrator permission\n') + chalk.cyan.bold('If the problem persists, create an issue on https://github.com/KommandNyang/discordjs-app-create'));
            process.exit(1);
        } finally {
            console.log(chalk.cyan.bold("Module setup succeeded.\n"));
        }
    }
}

export const editPackageJson = (prjdir, prjname) => {
    let packageJson;
    try {
        let pkgjson = fs.readFileSync(`${prjdir}/package.json`, 'utf8');
        packageJson = JSON.parse(pkgjson);
    } catch {
        console.error(chalk.red.bold("Setup failed. \n") + chalk.cyan.bold('Please try again with root permission\n') + chalk.cyan.bold('If the problem persists, create an issue on https://github.com/KommandNyang/discordjs-app-create'));
        process.exit(1);
    }
    packageJson.name = prjname;
    packageJson.scripts.start = "node .";
    packageJson.main = "src/main.js";

    try {
        fs.writeFileSync(`${prjdir}/package.json`, JSON.stringify(packageJson));
    } catch {
        console.error(chalk.red.bold('Failed to edit package.json') + chalk.cyan.bold('Please try again\n') + chalk.cyan.bold('If the problem persists, create an issue on https://github.com/KommandNyang/discordjs-app-create'));
        process.exit(1);
    } finally {
        console.log(chalk.cyan.bold('Edited package.json!'));
    }
}