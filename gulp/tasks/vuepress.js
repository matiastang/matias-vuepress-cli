/*
 * @Author: tangdaoyong
 * @Date: 2021-05-07 16:09:51
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-07 16:42:09
 * @Description: Vuepress相关
 */
const constant = require('../constant/constant');
/**
 * 添加Vuepress相关运行指令
 * @param {*} gulp 
 * @param {*} plugins 
 * @param {*} cb 
 */
const vuepressAddScripts = function (gulp, plugins, cb) {
    gulp.src(constant.packageUrl)
        .pipe(plugins.jeditor(function(json) {
            json.scripts = Object.assign({
                "docs:dev": "vuepress dev docs",
                "docs:build": "vuepress build docs"
            }, json.scripts)
            return json; // must return JSON object.
        }))
        .pipe(gulp.dest('./'));
    cb();
};

// 导出
module.exports = {
    vuepressAddScripts
}