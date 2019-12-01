(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

require('./iframe-load');

module.exports =
/*#__PURE__*/
function () {
  function Editor() {
    _classCallCheck(this, Editor);

    this.iframe = document.querySelector('iframe');
  }

  _createClass(Editor, [{
    key: "open",
    value: function open(page) {
      var _this = this;

      this.iframe.load('../' + page, function () {
        var body = _this.iframe.contentDocument.body;
        var textNodes = [];

        function recursy(element) {
          element.childNodes.forEach(function (node) {
            if (node.nodeName === '#text' && node.nodeValue.replace(/\s+/g, '').length > 0) {
              textNodes.push(node);
            } else {
              recursy(node);
            }
          });
        }

        recursy(body);
        textNodes.forEach(function (node) {
          var wrapper = _this.iframe.contentDocument.createElement('text-editor');

          node.parentNode.replaceChild(wrapper, node);
          wrapper.appendChild(node);
          wrapper.contentEditable = 'true';
        });
      });
    }
  }]);

  return Editor;
}();

},{"./iframe-load":2}],2:[function(require,module,exports){
"use strict";

/*eslint-disable */
HTMLIFrameElement.prototype.load = function (url, callback) {
  var iframe = this;

  try {
    iframe.src = url + "?rnd=" + Math.random().toString().substring(2);
  } catch (error) {
    if (!callback) {
      return new Promise(function (resolve, reject) {
        reject(error);
      });
    } else {
      callback(error);
    }
  }

  var maxTime = 60000;
  var interval = 200;
  var timerCount = 0;

  if (!callback) {
    return new Promise(function (resolve, reject) {
      var timer = setInterval(function () {
        if (!iframe) return clearInterval(timer);
        timerCount++;

        if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
          clearInterval(timer);
          resolve();
        } else if (timerCount * interval > maxTime) {
          reject(new Error("Iframe load fail!"));
        }
      }, interval);
    });
  } else {
    var timer = setInterval(function () {
      if (!iframe) return clearInterval(timer);

      if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
        clearInterval(timer);
        callback();
      } else if (timerCount * interval > maxTime) {
        callback(new Error("Iframe load fail!"));
      }
    }, interval);
  }
};

},{}],3:[function(require,module,exports){
"use strict";

var Editor = require('./editor');

window.editor = new Editor();

window.onload = function () {
  window.editor.open('index.html');
};

},{"./editor":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL2VkaXRvci5qcyIsImFwcC9zcmMvaWZyYW1lLWxvYWQuanMiLCJhcHAvc3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBLE9BQU8sQ0FBQyxlQUFELENBQVA7O0FBRUEsTUFBTSxDQUFDLE9BQVA7QUFBQTtBQUFBO0FBQ0ksb0JBQWE7QUFBQTs7QUFDVCxTQUFLLE1BQUwsR0FBYyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixDQUFkO0FBQ0g7O0FBSEw7QUFBQTtBQUFBLHlCQUtTLElBTFQsRUFLYztBQUFBOztBQUNOLFdBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsUUFBUSxJQUF6QixFQUErQixZQUFNO0FBQ2pDLFlBQU0sSUFBSSxHQUFHLEtBQUksQ0FBQyxNQUFMLENBQVksZUFBWixDQUE0QixJQUF6QztBQUNBLFlBQUksU0FBUyxHQUFHLEVBQWhCOztBQUVBLGlCQUFTLE9BQVQsQ0FBaUIsT0FBakIsRUFBMEI7QUFDdEIsVUFBQSxPQUFPLENBQUMsVUFBUixDQUFtQixPQUFuQixDQUEyQixVQUFDLElBQUQsRUFBVTtBQUNqQyxnQkFBSSxJQUFJLENBQUMsUUFBTCxLQUFrQixPQUFsQixJQUE2QixJQUFJLENBQUMsU0FBTCxDQUFlLE9BQWYsQ0FBdUIsTUFBdkIsRUFBK0IsRUFBL0IsRUFBbUMsTUFBbkMsR0FBNEMsQ0FBN0UsRUFBK0U7QUFDM0UsY0FBQSxTQUFTLENBQUMsSUFBVixDQUFlLElBQWY7QUFDSCxhQUZELE1BRU87QUFDSCxjQUFBLE9BQU8sQ0FBQyxJQUFELENBQVA7QUFDSDtBQUNKLFdBTkQ7QUFPSDs7QUFDRCxRQUFBLE9BQU8sQ0FBQyxJQUFELENBQVA7QUFFQSxRQUFBLFNBQVMsQ0FBQyxPQUFWLENBQWtCLFVBQUMsSUFBRCxFQUFVO0FBQ3hCLGNBQU0sT0FBTyxHQUFHLEtBQUksQ0FBQyxNQUFM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ZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwicmVxdWlyZSgnLi9pZnJhbWUtbG9hZCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBFZGl0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmlmcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZScpO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW4ocGFnZSl7XHJcbiAgICAgICAgdGhpcy5pZnJhbWUubG9hZCgnLi4vJyArIHBhZ2UsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYm9keSA9IHRoaXMuaWZyYW1lLmNvbnRlbnREb2N1bWVudC5ib2R5O1xyXG4gICAgICAgICAgICBsZXQgdGV4dE5vZGVzID0gW107XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiByZWN1cnN5KGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZU5hbWUgPT09ICcjdGV4dCcgJiYgbm9kZS5ub2RlVmFsdWUucmVwbGFjZSgvXFxzKy9nLCAnJykubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHROb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY3Vyc3kobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVjdXJzeShib2R5KTtcclxuXHJcbiAgICAgICAgICAgIHRleHROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB3cmFwcGVyID0gdGhpcy5pZnJhbWUuY29udGVudERvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHQtZWRpdG9yJyk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHdyYXBwZXIsIG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgIHdyYXBwZXIuY29udGVudEVkaXRhYmxlID0gJ3RydWUnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTsiLCIvKmVzbGludC1kaXNhYmxlICovXHJcbkhUTUxJRnJhbWVFbGVtZW50LnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKHVybCwgY2FsbGJhY2spIHtcclxuICAgIGNvbnN0IGlmcmFtZSA9IHRoaXM7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmcmFtZS5zcmMgPSB1cmwgKyBcIj9ybmQ9XCIgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDIpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWF4VGltZSA9IDYwMDAwO1xyXG4gICAgY29uc3QgaW50ZXJ2YWwgPSAyMDA7XHJcblxyXG4gICAgbGV0IHRpbWVyQ291bnQgPSAwO1xyXG5cclxuICAgIGlmICghY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaWZyYW1lKSByZXR1cm4gY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICB0aW1lckNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWZyYW1lLmNvbnRlbnREb2N1bWVudCAmJiBpZnJhbWUuY29udGVudERvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZXJDb3VudCAqIGludGVydmFsID4gbWF4VGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJJZnJhbWUgbG9hZCBmYWlsIVwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGludGVydmFsKTtcclxuICAgICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFpZnJhbWUpIHJldHVybiBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICAgICAgaWYgKGlmcmFtZS5jb250ZW50RG9jdW1lbnQgJiYgaWZyYW1lLmNvbnRlbnREb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aW1lckNvdW50ICogaW50ZXJ2YWwgPiBtYXhUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhuZXcgRXJyb3IoXCJJZnJhbWUgbG9hZCBmYWlsIVwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBpbnRlcnZhbCk7XHJcbiAgICB9XHJcbn0iLCJjb25zdCBFZGl0b3IgPSByZXF1aXJlKCcuL2VkaXRvcicpO1xyXG5cclxud2luZG93LmVkaXRvciA9IG5ldyBFZGl0b3IoKTtcclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgIHdpbmRvdy5lZGl0b3Iub3BlbignaW5kZXguaHRtbCcpO1xyXG59OyJdfQ==
