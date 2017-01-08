'use strict';

/**
 * 根据配置替换字符串
 * @param  {Object}   options  插件配置
 * @param  {Object}   modified 修改了的文件列表（对应watch功能）
 * @param  {Object}   total    所有文件列表
 * @param  {Function} next     调用下一个插件
 * @return {undefined}
 */
module.exports = function(options, modified, total, next) {
    var patterns = options.patterns;
    if (patterns) {
        modified.forEach(function(file) {
            if (file.isText() || typeof(file.getContent()) === 'string') {
                var content = file.getContent();

                patterns.forEach(function(pattern) {
                    if (fis.util.is(pattern.match, 'String')) {
                        pattern.match = new RegExp(fis.util.escapeReg(pattern.match), 'g');
                    }
                    if (!fis.util.is(pattern.match, 'RegExp')) {
                        fis.log.error('fis3-deploy-gfe-replace: match must a string or RegExp.');
                    }

                    var result = content.replace(pattern.match, pattern.replacement);
                    if (result !== content) {
                        content = result;
                        fis.log.debug('Replace from %s to %s in file [%s]', pattern.match, pattern.replacement, file);
                    }
                });

                file.setContent(content);
            }
        });
    }
    
    next();
};
