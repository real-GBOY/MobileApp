import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type Props = SvgProps & {
  size?: number;
  color?: string;
  rtl?: boolean;
};

const Search = ({ size = 24, color = "currentColor", rtl = false, ...rest }: Props) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    {...rest}
    style={[rest.style, rtl ? { transform: [{ rotate: "180deg" }] } : undefined]}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.7408 14.6247C12.396 15.7683 10.6536 16.4583 8.74999 16.4583C4.49279 16.4583 1.04166 13.0072 1.04166 8.75C1.04166 4.4928 4.49279 1.04166 8.74999 1.04166C13.0072 1.04166 16.4583 4.4928 16.4583 8.75C16.4583 10.6536 15.7683 12.396 14.6247 13.7408L18.7753 17.8914C19.0193 18.1355 19.0193 18.5312 18.7753 18.7753C18.5312 19.0193 18.1355 19.0193 17.8914 18.7753L13.7408 14.6247ZM2.29166 8.75C2.29166 5.18316 5.18315 2.29166 8.74999 2.29166C12.3168 2.29166 15.2083 5.18316 15.2083 8.75C15.2083 10.4909 14.5195 12.0708 13.3996 13.2323C13.3673 13.2542 13.3367 13.2794 13.308 13.3081C13.2794 13.3367 13.2542 13.3674 13.2323 13.3996C12.0708 14.5196 10.4908 15.2083 8.74999 15.2083C5.18315 15.2083 2.29166 12.3168 2.29166 8.75Z"
      fill={color}
    />
  </Svg>
);

export default React.memo(Search);

