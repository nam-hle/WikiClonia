"use strict";

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// class Square extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { open: false, value: this.props.value };
//   }
//   render() {
//     return (
//       <button
//         className="square"
//         key={this.props.val}
//         style={{
//           width: "30px",
//           height: "30px",
//           padding: "0",
//           display: "block",
//           margin: "0",
//           boxSizing: "border-box",
//           borderWidth: "1px"
//         }}
//         onClick={this.props.onClick}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }
// class Btn extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       show: true
//     };
//   }
//   render() {
//     return (
//       <button value="Show" onClick={this.props.onClick}>
//         Show
//       </button>
//     );
//   }
// }
// class Board extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       answer: [...Array(this.props.R)].map(() =>
//         [...Array(this.props.C)].map(() => (Math.random() * 3) | 0)
//       ),
//       squares: [...Array(this.props.R)].map(() =>
//         [...Array(this.props.C)].map(() => null)
//       ),
//       cntOpen: 0,
//       curOpen: [],
//       solved: []
//     };
//   }
//   handelShowBtn() {
//     alert("You just pressed Show Button");
//   }
//   handelClick(r, c) {
//     let squares = this.state.squares.slice();
//     let { cntOpen, answer, curOpen, solved } = this.state;
//     if (cntOpen == 0) {
//       squares[r][c] = answer[r][c];
//       cntOpen++;
//       curOpen = [r, c];
//     } else {
//       if (answer[curOpen[0]][curOpen[1]] == answer[r][c]) {
//         solved.push(curOpen, [r, c]);
//       }
//       curOpen = [];
//       cntOpen = 0;
//       squares = [...Array(this.props.R)].map(() =>
//         [...Array(this.props.C)].map(() => null)
//       );
//       solved.forEach(e => (squares[e[0]][e[1]] = answer[e[0]][e[1]]));
//     }
//     setTimeout(
//       () => this.setState({ squares, cntOpen, curOpen, solved }),
//       2000
//     );
//   }
//   renderSquare(r, c, v, k) {
//     return (
//       <Square
//         row={r}
//         col={c}
//         value={v}
//         key={k}
//         onClick={() => this.handelClick(r, c)}
//       />
//     );
//   }
//   renderRow(r) {
//     return [...Array(this.props.C)].map((_, i) =>
//       // this.renderSquare(r, i, (Math.random() * 10)|0)
//       this.renderSquare(r, i, this.state.squares[r][i])
//     );
//   }
//   render() {
//     const { R } = this.props;
//     return (
//       <div>
//         {[...Array(R)].map((_, i) => {
//           return (
//             <div className="row-square" key={i} style={{ display: "flex" }}>
//               {this.renderRow(i)}
//             </div>
//           );
//         })}
//         <Btn onClick={() => this.handelShowBtn()} />
//       </div>
//     );
//   }
// }
// class Game extends Component {
//   render() {
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board R={3} C={5} />
//         </div>
//         <div className="game-info"></div>
//       </div>
//     );
//   }
// }
//
//
//
//
//
//
var HNBaseButton = /*#__PURE__*/function (_Component) {
  _inherits(HNBaseButton, _Component);

  function HNBaseButton() {
    _classCallCheck(this, HNBaseButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(HNBaseButton).apply(this, arguments));
  }

  _createClass(HNBaseButton, [{
    key: "render",
    value: function render() {
      var style = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: "20px",
        border: "none",
        lineHeight: "24px",
        padding: "6px 16px",
        color: "white",
        backgroundColor: "#F50057",
        fontSize: "14px",
        borderRadius: "4px",
        cursor: 'pointer',
        fontWeight: '500',
        fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif"
      };
      return _react["default"].createElement("button", {
        disable: true,
        style: style
      }, "SECONDARY");
    }
  }]);

  return HNBaseButton;
}(_react.Component);

_reactDom["default"].render(_react["default"].createElement(HNBaseButton, null), document.getElementById("content"));

var x = _react["default"].createElement(HNBaseButton, null);

console.log(x.props);