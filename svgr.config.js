/** @format */

module.exports = {
  native: true,
  icon: false,
  expandProps: "end",
  replaceAttrValues: {
    "#000": "{props.color}",
    currentColor: "{props.color}",
  },
  template: "./svgr-template.js",
};