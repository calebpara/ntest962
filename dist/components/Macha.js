"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useClient = exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _streamChat = require("stream-chat");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Macha = () => {
  const [showModal, setShowModal] = (0, _react.useState)(false);

  const onClick = () => setShowModal(true);

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, showModal ? /*#__PURE__*/_react.default.createElement("div", {
    className: {
      backgroundColor: "red",
      padding: "8px",
      zIndex: "100",
      position: "absolute",
      height: "400px",
      width: "600px",
      top: 0,
      left: 0
    }
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: {
      color: "red"
    }
  }, "this is the modal")) : /*#__PURE__*/_react.default.createElement("div", {
    onClick: onClick,
    style: {
      height: "160px",
      cursor: "pointer",
      width: "220px",
      backgroundColor: "black",
      borderRadius: "16px",
      position: "absolute",
      bottom: 0,
      right: 0,
      margin: "16px",
      zIndex: "100"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      backgroundColor: "red",
      margin: "8px",
      position: "absolute",
      padding: "4px",
      borderRadius: "8px"
    }
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: {
      color: "white",
      fontSize: "15px"
    }
  }, "Live"))));
};

var _default = Macha;
exports.default = _default;

const useClient = _ref => {
  let {
    apiKey,
    userData,
    tokenOrProvider
  } = _ref;
  const [chatClient, setChatClient] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    const client = new _streamChat.StreamChat(apiKey); // prevents application from setting stale client (user changed, for example)

    let didUserConnectInterrupt = false;
    const connectionPromise = client.connectUser(userData, tokenOrProvider).then(() => {
      if (!didUserConnectInterrupt) setChatClient(client);
    });
    return () => {
      didUserConnectInterrupt = true;
      setChatClient(null); // wait for connection to finish before initiating closing sequence

      connectionPromise.then(() => client.disconnectUser()).then(() => {
        console.log('connection closed');
      });
    };
  }, [apiKey, userData.id, tokenOrProvider]);
  return chatClient;
};

exports.useClient = useClient;