1. zipped jqueryui tag 1.9.1 from github: https://github.com/jquery/jquery-ui/tree/1.9.1
2. downloaded and installed latest https://github.com/jrburke/jqueryui-amd/tree/latest
3. ran jquery-amd over unzipped jqueryui tag 1.9.1 resulting in jqueryui directory within 1.9.1

In essence, all js files have been wrapped with:

define(['jquery'], function (jQuery) {
...
});

See https://github.com/jrburke/jqueryui-amd/tree/latest
and http://www.requirejs.org/jqueryui-amd/example/webapp/app.html 

The conversion process transformed the following files:

    jqueryui-1.8.14/ui/jquery.ui.?.js --> jqueryui-1.8.14/jqueryui/?.js
    jqueryui-1.8.14/ui/jquery.effects.?.js --> jqueryui-1.8.14/jqueryui/effects/?.js
    jqueryui-1.8.14/ui/i18n/jquery.ui.datepicker-?.js --> jqueryui-1.8.14/jqueryui/datepicker-?.js
