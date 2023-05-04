function _extends() {
  return (
    (_extends = Object.assign
      ? Object.assign.bind()
      : function (a) {
          for (var b, c = 1; c < arguments.length; c++)
            for (var d in ((b = arguments[c]), b))
              Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
          return a;
        }),
    _extends.apply(this, arguments)
  );
}
const React = require('react');
module.exports = function (a) {
  let { size: c = '24', ...b } = a;
  return (
    (b = { ...b, style: { ...(b.style ? b.style : {}) } }),
    /*#__PURE__*/ React.createElement(
      'svg',
      _extends({}, b, {
        width: c,
        height: c,
        viewBox: '0 0 64 64',
        xmlns: 'http://www.w3.org/2000/svg',
      }),
      /*#__PURE__*/ React.createElement(
        'g',
        { fill: 'none', fillRule: 'evenodd' },
        /*#__PURE__*/ React.createElement('path', {
          d: 'M0 0h64v64H0z',
          fill: '#01A88D',
        }),
        /*#__PURE__*/ React.createElement('path', {
          d: 'M52 28.422c-3.927 3.331-9.219 4.283-14 2.601v2.078c1.562.485 3.16.747 4.755.747 3.263 0 6.48-1.001 9.245-2.916V50c0 1.103-.897 2-2 2H14c-1.103 0-2-.897-2-2V36.222l1.445-1.926A14.282 14.282 0 0 1 28 28.903v-2.049a16.28 16.28 0 0 0-16 6.053V14c0-1.103.897-2 2-2h36c1.103 0 2 .897 2 2v14.422ZM50 10H14c-2.206 0-4 1.795-4 4v36c0 2.206 1.794 4 4 4h36c2.206 0 4-1.794 4-4V14c0-2.205-1.794-4-4-4ZM39.744 25.708c-.377.376-1.01.401-1.437-.024l-2.624-2.452a.998.998 0 0 0-1.683.73V40.5c0 3.033-2.468 5.5-5.5 5.5a5.506 5.506 0 0 1-5.5-5.5c0-3.033 2.468-5.5 5.5-5.5a5.45 5.45 0 0 1 2.114.423A1.002 1.002 0 0 0 32 34.5V18.906c0-.52.424-.944.944-.944h.009c.026.003.052.004.077.005.184.006.449.06.677.288l6.038 6.038v.001c.19.188.293.439.293.706a.99.99 0 0 1-.294.708Zm-4.623-8.867a2.983 2.983 0 0 0-1.908-.867 1.038 1.038 0 0 0-.157-.012h-.112A2.948 2.948 0 0 0 30 18.906v14.245A7.432 7.432 0 0 0 28.5 33c-4.136 0-7.5 3.364-7.5 7.5s3.364 7.5 7.5 7.5 7.5-3.364 7.5-7.5V26.265l.917.856c1.134 1.135 3.112 1.132 4.242.001A2.982 2.982 0 0 0 42.038 25c0-.801-.312-1.555-.879-2.121l-6.038-6.038Z',
          fill: '#FFF',
        }),
      ),
    )
  );
};
