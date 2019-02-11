import transition from "styled-transition-group";

export default transition.section`   
    &:enter {
        opacity: 0.01;
        transform: scale(0.9) translateY(-100%);
    }
    &:enter-active {
        opacity: 1;
        transform: scale(1) translateY(0%);
        transition: all 300ms ease-in-out;
      
    }
    &:exit {
        opacity: 1;
        transform: scale(1) translateY(0%);
    }
    &:exit-active {
        opacity: 0.01;
        transform: scale(0.9) translateY(-100%);
        transition: all 300ms ease-in-out;
     
    }
  `;
