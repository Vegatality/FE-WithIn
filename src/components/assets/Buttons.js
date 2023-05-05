import { darken, lighten } from "polished";
import React from "react";
import styled, { css } from "styled-components";

// color, outline

const colorStyles = css`
  ${({ theme, bgcolor, color }) => {
    // const textColor = color ? theme[color] : "initial";
    // const bgColor = color ? theme[bgcolor] : "initial";
    return css`
      color: ${color && theme[color]};
      background: ${bgcolor && theme[bgcolor]};
      &:hover {
        background: ${color && lighten(0.1, theme[color])};
      }
      &:active {
        background: ${color && darken(0.1, theme[color])};
      }
    `;
  }}
`;

// text-overflow: hidden; white-space:  글씨 넘어가면 ... 처리해줌.... ellipsis
// padding 으로 하는 이유: 글자 수가 늘어나도 틀어지지 않음!
// width로 하면 글씨가 틀어질 수 있음.

const sizes = {
  large: {
    fontSize: "larger",
    width: "600px",
    paddingBlock: "40px",
    paddingInline: "none",
  },
  medium: {
    fontSize: "larger",
    width: "200px",
    paddingBlock: "15px",
    paddingInline: "60px",
  },
  small: {
    fontSize: "large",
    paddingBlock: "20px",
    paddingInline: "90px",
  },
};

const sizeStyles = css`
  ${({ size }) => {
    // console.log(size);
    return css`
      /* 이거 property 없는데 왜 오류 안뜨나 봤더니 기본값을 설정해놨었음. */
      /* font-weight: ${sizes[size].fontWeight || "initial"}; */
      font-size: ${sizes[size].fontSize};
      width: ${sizes[size].width};
      height: ${sizes[size].height};
      padding-block: ${sizes[size].paddingBlock};
      padding-inline: ${sizes[size].paddingInline};
    `;
  }}
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  /* display: inline-flex; */
  font-weight: bolder;
  border: none;
  border-radius: ${(props) => props.radius && `${props.radius}px`};
  margin-left: ${({ noMargin }) => (noMargin ? "0px" : "20px")};
  align-self: ${({ position }) => position && "flex-end"};
  cursor: pointer;

  /* 첫 번째를 기준으로 두 번째 요소의 CSS를 결정. 그래서 noMargin 속성 프로퍼티를 첫 번째한테 줘야 함 */

  /* 크기 */
  ${sizeStyles}

  /* 색상 */
    ${colorStyles} /* 위치 */
`;

const iconicOption = (iconOption, size) => {
  if (iconOption) {
    if (size === "large") {
      return "⭐";
    }
  } else {
    return "";
  }
};

function Buttons({ children, size, color, bgcolor, iconOption = false, position, noMargin, ...rest }) {
  return (
    <StyledButton size={size} color={color} bgcolor={bgcolor} position={position} {...rest}>
      {children + " " + iconicOption(iconOption, size)}
    </StyledButton>
  );
}

// Buttons.defaultProps = {
//     // icon 기본값 false로 설정
//     iconOption: false,
// };

export default Buttons;
