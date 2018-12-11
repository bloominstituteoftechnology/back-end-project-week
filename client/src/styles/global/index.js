import { createGlobalStyle } from "styled-components";
import styledSanitize from "styled-sanitize";

export const GlobalStyle = createGlobalStyle`

${styledSanitize}

@import url('https://fonts.googleapis.com/css?family=Roboto');

* {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}

*:focus {
  outline: none;
}

html {
  font-size: 62.5%;
}

body {
  font-size: 1.6rem;
  font-family: Roboto, sans-serif;
  width: 100%;
}

h1,
h2,
h3 {
  font-weight: 800;
  word-wrap: none;
  word-break: normal;
}

#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: #36b9bd;

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 2px;
}

#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px #36b9bd, 0 0 5px #36b9bd;
  opacity: 1;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
  -ms-transform: rotate(3deg) translate(0px, -4px);
  transform: rotate(3deg) translate(0px, -4px);
}

#nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 15px;
  right: 15px;
}

#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: #36b9bd;
  border-left-color: #36b9bd;
  border-radius: 50%;

  -webkit-animation: nprogress-spinner 400ms linear infinite;
  animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

@-webkit-keyframes nprogress-spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes nprogress-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

[data-reach-dialog-overlay] {
  background: rgba(210, 210, 210, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 111;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

[data-reach-dialog-content] {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 500px;
  height: 200px;
  background: #fbfafb;
};
 
 .transition {
    width: 75%;
    padding: 50px 10px;
    background: #f2f1f2;
    display: flex;
    flex-direction: column;
 }
 `;
