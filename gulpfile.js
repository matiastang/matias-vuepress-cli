// 使用gulp-load-plugins
const gulp = require('gulp')
const plugins = require('gulp-load-plugins')();
const gulpfs = require('fs');
const gulpTaskList = gulpfs.readdirSync('./gulp/tasks/');// 获取 gulp/tasks/ 目录下所有的文件名称列表

// 用到的插件全部挂载到plugins上
// plugins.uglify = require('gulp-uglify');// 获取 uglify 模块（用于压缩 JS）
// plugins.babel = require('gulp-babel');// babel
// plugins.rename = require('gulp-rename');// 重命名
// plugins.stripDebug = require('gulp-strip-debug');
// plugins.vvinylPaths = require('vinyl-paths');
// plugins.del = require('del');
plugins.bump = require('gulp-bump');// 更新version
plugins.shell = require('shelljs');// 执行脚本命令

/**
 * @description: 同步任务
 * @param {*} obj
 * @param {*} func
 * @param {array} arguments
 * @return {*}
 */
const gulpTask = (obj, func, ...arguments) => {
    /*
    如果任务（task）不返回任何内容，则必须使用 callback 来指示任务已完成。在如下示例中，callback 将作为唯一一个名为 cb() 的参数传递给你的任务（task）。
    */
    return () => {
        return obj[func](...arguments);
    };
};

/**
 * @description: 异步任务
 * @param {*} async
 * @param {*} func
 * @param {array} arguments
 * @return {*}
 */
const gulpAsyncTask = (obj, func, ...arguments) => {
    return async (cb) => {
        await (obj[func])(...arguments, cb);
    };
};

/**
 * 获取某个文件的 task 
 * @param {*} fileObj 
 * @returns 
 */
const gulpFileTasks = function(fileObj) {
    let tasks = {}
    // 遍历文件内的tasks
    for (const key in fileObj) {
        if (Object.hasOwnProperty.call(fileObj, key)) {
            const element = fileObj[key];
            /*
            使用这个：Object.prototype.toString.call(fn);如果输出"[object AsyncFunction]"那就是async函数，否则是普通函数
            let fn = async () => {}
            fn.constructor.name 返回的是 Function
            Object.prototype.toString.call(fn) 也是返回 Function
            看起来这个判定对于箭头函数不奏效
            */
            let funcString = Object.prototype.toString.call(element);
            if (funcString.endsWith('AsyncFunction]')) {
                // 异步Task
                tasks[key] = gulpAsyncTask(fileObj, key, gulp, plugins)
            } else {
                // 同步Task
                tasks[key] = gulpTask(fileObj, key, gulp, plugins)
            }
        }
    }
    // for (let [key, value] of Object.entries(fileObj)) {
    //     console.log(`key: ${key}, value: ${value}`)
    //     console.log(typeof value);
    //     if (value.startsWith('[Function')) {
    //         tasks[key] = gulpTask(fileObj, key, gulp, plugins)
    //     } else {
    //         tasks[key] = gulpAsyncTask(fileObj, key, gulp, plugins)
    //     }
    // }
    return tasks
};

/**
 * 获取 tasks 文件夹下的所有文件的所有 task
 * @returns 
 */
const gulpFilesTasks = () => {
    let tasks = {}
    // 遍历文件列表
    gulpTaskList.forEach(function(fileName) {
        // 获取文件
        let fileObj = require(`./gulp/tasks/${fileName}`);
        // 获取文件中的 tasks
        let fileTasks = gulpFileTasks(fileObj);
        // 挂载 tasks
        Object.assign(tasks, fileTasks);
    });
    return tasks;
}

// 得到所有 tasks
let allTasks = gulpFilesTasks();

// 导出所有 tasks
module.exports = allTasks;