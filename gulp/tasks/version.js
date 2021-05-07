/*
 * @Author: tangdaoyong
 * @Date: 2021-05-07 15:18:36
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-07 15:33:40
 * @Description: version 相关(更新package.json中的版本号：x.y.z-alpha.0)
 */
// package.json文件的相对路径
const packageUrl = '../../package.json';
/**
 * 更新预发布版本号, 开发中版本, 可能会有较大改动.
 * @param {*} gulp 
 * @param {*} plugins 
 * @param {*} cb 
 */
const versionPrerelease = function (gulp, plugins, cb) {
    gulp.src(packageUrl)
        .pipe(plugins.bump({
            type: 'prerelease'
        }))
        .pipe(gulp.dest('./'));
    cb();
};

/**
 * 更新 Z 版本号, 修复bug, 兼容老版本
 * @param {*} gulp 
 * @param {*} plugins 
 * @param {*} cb 
 */
const versionPatch = function (gulp, plugins, cb) {
    gulp.src(packageUrl)
        .pipe(plugins.bump({
            type: 'patch'
        }))
        .pipe(gulp.dest('./'));
    cb();
}
/**
 * 更新 Y 版本号, 兼容老版本
 * @param {*} gulp 
 * @param {*} plugins 
 * @param {*} cb 
 */
const versionMinor = function (gulp, plugins, cb) {
    gulp.src(packageUrl)
        .pipe(plugins.bump({
            type: 'minor'
        }))
        .pipe(gulp.dest('./'));
    cb();
}
/**
 * 更新 X 版本号, 不兼容老版本
 * @param {*} gulp 
 * @param {*} plugins 
 * @param {*} cb 
 */
const versionMajor = function (gulp, plugins, cb) {
    gulp.src(packageUrl)
        .pipe(plugins.bump({
            type: 'major'
        }))
        .pipe(gulp.dest('./'));
    cb();
}
// 导出
module.exports = {
    versionPrerelease,
    versionPatch,
    versionMinor,
    versionMajor
}