// ==UserScript==
// @name         Fuck Anti-debugger
// @namespace    https://omn.cc/
// @version      1.1
// @updateURL    https://raw.githubusercontent.com/KawaiiSh1zuku/fuck-anti-debugger/main/index.js
// @downloadURL  https://raw.githubusercontent.com/KawaiiSh1zuku/fuck-anti-debugger/main/index.js
// @description  Fuck most anti-debuggers which try to interrupt your intrusion.
// @author       Sh1zuku
// @match        *
// @grant        unsafeWindow
// @run-at       document-start
// @match        *://*/*
// ==/UserScript==

(function() {
    var ad = false;
    var _constructor = unsafeWindow.Function.prototype.constructor;
    // Hook Function.prototype.constructor
    unsafeWindow.Function.prototype.constructor = function() {
        var fnContent = arguments[0];
        if (fnContent) {
            if (fnContent.includes('debugger')) { // Is there any code attempting to bring up browser debugger?
                if (!ad) {
                    console.log(`${'\n'} %c FAD %c Found Anti-Debugger! ${'\n'}`, 'color: #ffffff; background: #bf6060; padding:5px 0;', 'color: #ffffff; background: #d68f8f; padding:5px 0;');
                    ad = true; // Print only once.
                }
                var caller = Function.prototype.constructor.caller; // Non-standard hack to get the function caller
                var callerContent = caller.toString();
                if (callerContent.includes(/\bdebugger\b/gi)) { // Check if there is any debugger statements.
                    callerContent = callerContent.replace(/\bdebugger\b/gi, ''); // Remove all debugger expressions
                    eval('caller = ' + callerContent); // Replace the function
                }
                return (function () {});
            }
        }
        // Pass down the normal constructor.
        return _constructor.apply(this, arguments);
    };
})();
