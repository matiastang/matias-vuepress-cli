#!/usr/bin/env node
// 表明是node脚本，需要node环境

const program = require('commander');// cli工具
const inquirer = require('inquirer');// cli交互
const shell = require('shelljs');// [shell执行命令](https://www.npmjs.com/package/shelljs)
const package = require('../package.json');// package包

/*
* 指令
*/
program
    .version(package.version)
    .option('-v,--version', '查看版本号');

/*
* 交互式命令
*/

/**
 * docs指令相关
 */

/**
 * 询问是否创建.vuepress文件夹
 */
const vuepressPromptList = [{
    type: "confirm",
    message: ".vuepress",
    name: "vuepress",
    prefix: "是否创建",
    suffix: "文件夹？"
},{
    type: "confirm",
    message: "components",
    name: "components",
    prefix: "是否创建",
    suffix: "文件夹？",
    when: function(answers) { // 当vuepress为true的时候才会提问当前问题
        return answers.vuepress
    }
},{
    type: "confirm",
    message: "theme",
    name: "theme",
    prefix: "是否创建",
    suffix: "文件夹？",
    when: function(answers) { // 当vuepress为true的时候才会提问当前问题
        return answers.vuepress
    }
},{
    type: "confirm",
    message: "public",
    name: "public",
    prefix: "是否创建",
    suffix: "文件夹？",
    when: function(answers) { // 当vuepress为true的时候才会提问当前问题
        return answers.vuepress
    }
},{
    type: "confirm",
    message: "styles",
    name: "styles",
    prefix: "是否创建",
    suffix: "文件夹？",
    when: function(answers) { // 当vuepress为true的时候才会提问当前问题
        return answers.vuepress
    }
},{
    type: "confirm",
    message: "templates",
    name: "templates",
    prefix: "是否创建",
    suffix: "文件夹？(谨慎配置)",
    when: function(answers) { // 当vuepress为true的时候才会提问当前问题
        return answers.vuepress
    }
},{
    type: "confirm",
    message: "config.js",
    name: "config",
    prefix: "是否创建",
    suffix: "文件？",
    when: function(answers) { // 当vuepress为true的时候才会提问当前问题
        return answers.vuepress
    }
},{
    type: "confirm",
    message: "enhanceApp.js",
    name: "enhanceApp",
    prefix: "是否创建",
    suffix: "文件？",
    when: function(answers) { // 当vuepress为true的时候才会提问当前问题
        return answers.vuepress
    }
}];

/**
 * 默认指令
 */
const defaultCommand = () => {
    // docs相关
    let docsName = 'docs';
    let mkDocs = `mkdir -p ${docsName}`;//创建docs文件夹
    let cdDocs = `cd ${docsName}`;// cd到docs文件夹
    let docsReadme = 'touch README.md';// 创建docs->README.md
    let docsConfig = 'touch config.md';// 创建docs->config.md
    // guide相关
    let guideName = 'guide';
    let mkGuide = `mkdir -p ${guideName}`;//创建guide文件夹
    let cdGuide = `cd ${guideName}`// cd到guide文件夹
    let guideReadme = 'touch README.md';// 创建guide->README.md
    let toDocs = 'cd ..'//回到docs
    return `
        ${mkDocs}
        ${cdDocs}
        ${docsReadme}
        ${docsConfig}
        ${mkGuide}
        ${cdGuide}
        ${guideReadme}
        ${toDocs}
    `;
};

/**
 * 根据询问创建可选命令
 * @param {*} answers 
 */
const answersCommand = (answers) => {
    let command = ''
    // 是否创建 .vuepress文件夹？
    if (!answers.vuepress) {
        return command;
    }
    let vuepressName = '.vuepress'
    let mkVuepress = `mkdir -p ${vuepressName}`;//创建vuepress文件夹
    let cdVuepress = `cd ${vuepressName}`;// cd到vuepress文件夹
    command = `
        ${mkVuepress}
        ${cdVuepress}
    `
    // 是否创建 components 文件夹？
    if (answers.components) {
        command = `
            ${command}
            mkdir -p components
        `;//创建vuepress文件夹
    }
    // 是否创建 theme 文件夹？
    if (answers.theme) {
        let themeName = 'theme'
        let mkTheme = `mkdir -p ${themeName}`;//创建theme文件夹
        let cdTheme = `cd ${themeName}`;// cd到theme文件夹
        let themeLayout = 'touch Layout.vue';// 创建theme->Layout.vue
        let toVuepress = 'cd ..'//回到.vuepress
        command = `
            ${command}
            ${mkTheme}
            ${cdTheme}
            ${themeLayout}
            ${toVuepress}
        `
    }
    // 是否创建 public 文件夹？
    if (answers.public) {
        command = `
            ${command}
            mkdir -p public
        `;//创建 public 文件夹
    }
    // 是否创建 styles 文件夹？
    if (answers.styles) {
        let stylesName = 'styles'
        let mkStyles = `mkdir -p ${stylesName}`;//创建 styles 文件夹
        let cdStyles = `cd ${stylesName}`;// cd到 styles 文件夹
        let stylesIndex = 'touch index.styl';// 创建 styles -> index.styl
        let stylesPalette = 'touch palette.styl';// 创建 styles -> palette.styl
        let toVuepress = 'cd ..'//回到.vuepress
        command = `
            ${command}
            ${mkStyles}
            ${cdStyles}
            ${stylesIndex}
            ${stylesPalette}
            ${toVuepress}
        `
    }
    // 是否创建 templates 文件夹？(谨慎配置)
    if (answers.templates) {
        let templatesName = 'styles'
        let mkTemplates = `mkdir -p ${templatesName}`;//创建 templates 文件夹
        let cdTemplates = `cd ${templatesName}`;// cd到 templates 文件夹
        let templatesDev = 'touch dev.html';// 创建 templates -> dev.html
        let templatesSSr = 'touch ssr.html';// 创建 templates -> ssr.html
        let toVuepress = 'cd ..'//回到.vuepress
        command = `
            ${command}
            ${mkTemplates}
            ${cdTemplates}
            ${templatesDev}
            ${templatesSSr}
            ${toVuepress}
        `
    }
    // 是否创建 config.js 文件？
    if (answers.config) {
        command = `
            ${command}
            touch config.js
        `;//创建 config.js 文件
    }
    // 是否创建 enhanceApp.js 文件？
    if (answers.enhanceApp) {
        command = `
            ${command}
            touch enhanceApp.js
        `;//创建 enhanceApp.js 文件
    }
    return command
}

/**
 * 根据询问结果创建docs文件夹
 * @param {*} answers 
 */
const initDocsAndfile = (answers) => {
    // 获取指令
    let docsDefault = defaultCommand();
    let ansCommand = answersCommand(answers)
    // 执行指令
    shell.exec(`
        ${docsDefault}
        ${ansCommand}
    `, (error, stdout, stderr) => {
        if (error) {
            console.error(`docs 指令 exec error: ${error}`)
            return
        }
        console.log(`${stdout}`)
        console.log(`${stderr}`)
    });
};

/**
 * docs指令事件
 */
const docsInitAction = () => {

    inquirer.prompt(vuepressPromptList).then((answers) => {
        initDocsAndfile(answers)
    })
};

// 添加docs指令
program
    .command('docs')
    .description('创建docs文件夹')
    .action(docsInitAction)

/**
 * scripts指令事件
 */
const scriptsAction = () => {
    // 执行指令
    shell.exec('gulp vuepressAddScripts', (error, stdout, stderr) => {
        if (error) {
            console.error(`scripts 指令 exec error: ${error}`)
            return
        }
        console.log(`${stdout}`)
        console.log(`${stderr}`)
    });
};

// 添加scripts指令
program
.command('scripts')
.description('package.json中添加verpress的编译运行指令')
.action(scriptsAction)
    

// program.parse 是将命令参数传入commander 管道中，一般放在最后执行。
program.parse(process.argv)