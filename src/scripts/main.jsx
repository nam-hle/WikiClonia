// // import ReactDOM from "react-dom";
// import React, { Component } from "react";
// import styled from "styled-components";

// const Theme = {
//   secondary: "#F50057",
//   primary: "#673AB7",
//   default: "#E0E0E0",
//   disabled: "#A7A7A7"
// };

// const lightness = s => {
//   const rgb = s =>
//     [1, 3, 5].map(i => parseInt(s.substring(i, i + 2), 16) / 255);
//   let [r, g, b] = rgb(s);
//   return 0.2126 * r + 0.7152 * g + 0.0722 * b;
// };

// const zip = (...a) => {
//   let res = [];
//   for (let i = 0; i < a[0].length; i++) {
//     let cur = [];
//     for (let j = 0; j < a.length; j++) {
//       cur.push(a[j][i]);
//     }
//     console.log(cur);
//     res.push(cur);
//   }
//   return res;
// };

// // function m() {
// //   let res = {};
// //   for (let i = 0; i < arguments.length; i++)
// //     if (arguments[i]) Object.assign(res, arguments[i]);
// //   return res;
// // }

// const BaseButton = styled.button`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;

//   margin: 10px;
//   padding: ${props => (props.size == "small" ? "3px 9px" : "6px 16px")};
//   border: none;
//   border-radius: 4px;

//   font-size: 0.875rem;
//   font-weight: 500;
//   line-height: 1.75;
//   letter-spacing: 1.75;
//   font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI",
//     Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
//   text-transform: uppercase;

//   transition-property: background-color box-shadow border;
//   transition-duration: 250ms;
//   transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

//   cursor: ${props => (props.disabled ? "default" : "pointer")};
// `;

// const BOX_SHADOW = {
//   COLOR: [0.2, 0.14, 0.12].map(alpha => `rgba(0, 0, 0, ${alpha})`),
//   LENGTH: {
//     DEFAULT: [
//       [0, 3, 1, -2],
//       [0, 2, 2, 0],
//       [0, 1, 5, 0]
//     ],
//     HOVER: [
//       [0, 2, 4, -1],
//       [0, 4, 5, 0],
//       [0, 1, 10, 0]
//     ],
//     ACTIVE: [
//       [0, 5, 5, -3],
//       [0, 8, 10, 1],
//       [0, 3, 14, 2]
//     ]
//   }
// };

// const createBoxShadow = (length, color = BOX_SHADOW.COLOR) =>
//   zip(length, color)
//     .map(([l, c]) => {
//       return l.map(e => `${e}px`).join(" ") + " " + c;
//     })
//     .join(", ");

// const PADDING = {
//   small: `3px 9px`,
//   medium: `5px 15px`,
//   large: `7px 21px`
// };

// const FONT_SIZE = {
//   small: `0.8125rem`,
//   medium: `0.875rem`,
//   large: `0.9365rem`
// };

// const ButtonContained = styled(BaseButton)`
//   background-color: ${props => Theme[props.color]};
//   color: ${props =>
//     props.disabled
//       ? Theme.disabled
//       : lightness(Theme[props.color]) > 0.5
//       ? "black"
//       : "white"};

//   padding: ${props => PADDING[props.size]};
//   font-size: ${props => FONT_SIZE[props.size]};

//   box-shadow: ${props =>
//     !props.disabled ? createBoxShadow(BOX_SHADOW.LENGTH.DEFAULT) : "none"};

//   &:hover {
//     box-shadow: ${props =>
//       !props.disabled ? createBoxShadow(BOX_SHADOW.LENGTH.HOVER) : "none"};
//   }

//   &:active {
//     box-shadow: ${props =>
//       !props.disabled ? createBoxShadow(BOX_SHADOW.LENGTH.ACTIVE) : "none"};
//   }
// `;

// const TextButton = styled(BaseButton)`
//   padding: ${props => PADDING[props.size]};
//   font-size: ${props => FONT_SIZE[props.size]};
//   background-color: white;
//   color: ${props =>
//     props.disabled
//       ? Theme.disabled
//       : props.color == "default"
//       ? "black"
//       : Theme[props.color]};
// `;

// const OutlinedButton = styled(TextButton)`
//   padding: ${props => PADDING[props.size]};
//   font-size: ${props => FONT_SIZE[props.size]};
//   border: 1px solid
//     ${props =>
//       props.disabled
//         ? Theme.disabled
//         : props.color == "default"
//         ? "black"
//         : Theme[props.color]};
// `;

// class Button extends Component {
//   render() {
//     const variant = this.props.variant || "default",
//       disabled = this.props.disabled || false,
//       color = this.props.color || "default",
//       size = this.props.size || "medium";

//     const props = { variant, disabled, color, size };
//     if (variant == "default")
//       return <TextButton {...props}>{this.props.children}</TextButton>;
//     else if (variant == "outlined")
//       return <OutlinedButton {...props}>{this.props.children}</OutlinedButton>;
//     return <ButtonContained {...props}>{this.props.children}</ButtonContained>;
//   }
// }

// // function test() {
// //   return [
// //     <div key={1}>
// //       <Button variant="contained">Default</Button>
// //       <Button variant="contained" color="primary">
// //         Primary
// //       </Button>
// //       <Button variant="contained" color="secondary">
// //         Secondary
// //       </Button>
// //       <Button variant="contained" disabled>
// //         Disabled
// //       </Button>
// //       <Button variant="contained" color="primary" href="#contained-buttons">
// //         Link
// //       </Button>
// //       <Button variant="contained" color="primary" disableElevation>
// //         Disable elevation
// //       </Button>
// //     </div>,
// //     <div key={2}>
// //       <Button>Default</Button>
// //       <Button color="primary">Primary</Button>
// //       <Button color="secondary">Secondary</Button>
// //       <Button disabled>Disabled</Button>
// //       <Button href="#text-buttons" color="primary">
// //         Link
// //       </Button>
// //     </div>,
// //     <div key={3}>
// //       <Button variant="outlined">Default</Button>
// //       <Button variant="outlined" color="primary">
// //         Primary
// //       </Button>
// //       <Button variant="outlined" color="secondary">
// //         Secondary
// //       </Button>
// //       <Button variant="outlined" disabled>
// //         Disabled
// //       </Button>
// //       <Button variant="outlined" color="primary" href="#outlined-buttons">
// //         Link
// //       </Button>
// //     </div>,
// //     <div key={4}>
// //       <Button size="small">Small</Button>
// //       <Button size="medium">Medium</Button>
// //       <Button size="large">Large</Button>
// //     </div>,
// //     <div key={5}>
// //       <Button variant="outlined" size="small" color="primary">
// //         Small
// //       </Button>
// //       <Button variant="outlined" size="medium" color="primary">
// //         Medium
// //       </Button>
// //       <Button variant="outlined" size="large" color="primary">
// //         Large
// //       </Button>
// //     </div>,
// //     <div key={6}>
// //       <Button variant="contained" size="small" color="primary">
// //         Small
// //       </Button>
// //       <Button variant="contained" size="medium" color="primary">
// //         Medium
// //       </Button>
// //       <Button variant="contained" size="large" color="primary">
// //         Large
// //       </Button>
// //     </div>
// //   ];
// // }

// // ReactDOM.render(test(), document.getElementById("content"));
