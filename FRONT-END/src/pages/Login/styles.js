import styled from "styled-components";

export const Container = styled.main`
  background-color: #121214;
  min-height: 100vh;
  flex-wrap: wrap;
  justify-content: center;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  padding: 32px;

  h1 {
    font-size: 54px;
    padding-top: 60px;
    font-weight: 900;
    font-family: Roboto, "sans-serif";
    color: rgb(225, 225, 230);
    text-align: center;
    padding-top: 12rem;
  }

  .blue {
    background: #0f2027;
    background: -webkit-linear-gradient(
      to bottom,
      #2c5364,
      #203a43,
      #0f2027
    );
    background: linear-gradient(
      to bottom,
      #2c5364,
      #203a43,
      #0f2027
    );

    height: 478px;
    width: 470px;
    margin-right: 1px;
  }
  @media (min-width: 280px) and (max-width: 1059px) {
    .blue {
      display: none;
    }
  }

  form {
    width: 100%;
    max-width: 480px;
    height: 478px;
    background: rgb(32, 32, 36);
    border-radius: 5px;
    padding: 64px;
  }

  input {
    width: 100%;
    height: 50px;
    font-size: 16px;
    background: rgb(18, 18, 20);
    border-color: rgb(18, 18, 20);
    color: rgb(255, 255, 255);
    padding: 0px 1em 0px 2.65em;
    border-radius: 5px;
  }

  p, h2 {
    text-align: center;
  }

  a {
    color: #00875f;
  }

  button {
    background: rgb(130, 87, 229);
    border-radius: 5px;
    margin: 2rem auto;
    border: 0px;
    color: rgb(255, 255, 255);
    font-weight: bold;
    height: 50px;
    transition: background 0.2s ease 0s, color 0.2s ease 0s;
    font-size: 16px;
    text-transform: uppercase;
  }

  label {
    position: relative;
    top: 20px;
  }
`;

export const IconSpan = styled.span `
  position: relative;
  top: 42px;
  left: 10px;
`