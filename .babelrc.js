/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-10-14 14:39:44
 * @LastEditors: qingyang
 * @LastEditTime: 2020-10-14 15:59:17
 */
const path = require('path')
// const context = path.resolve(__dirname, 'src')
module.exports = {
    presets: [
        "react-app"
      ],
  plugins: [
    [
      'react-css-modules',
      {
        generateScopedName: '[local]-[hash:base64:5]',
        webpackHotModuleReloading: true,
        filetypes: {
         ".less": {
              "syntax": "postcss-less"
            }
        },
        // handleMissingStyleName: "throw",
        // autoResolveMultipleImports: true
      }
    ],
    ["module-resolver", {
        "alias": {
          "@": path.join(__dirname, 'src'),
        }
      }]

  ]
}