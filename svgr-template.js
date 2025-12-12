const template = ({ template }, opts, { componentName, props, jsx }) => {
  const typeScriptTpl = template.smart({ plugins: ["typescript"] });

  return typeScriptTpl.ast`
import React from "react";
import Svg, { SvgProps } from "react-native-svg";

type Props = SvgProps & {
  size?: number;
  color?: string;
  rtl?: boolean;
};

const ${componentName} = ({ size = 24, color = "currentColor", rtl = false, ...rest }: Props) => (
  <Svg
    width={size}
    height={size}
    fill="none"
    {...rest}
    style={[rest.style, rtl ? { transform: [{ rotate: "180deg" }] } : undefined]}
  >
    ${jsx.children}
  </Svg>
);

export default React.memo(${componentName});
`;
};

module.exports = template;

