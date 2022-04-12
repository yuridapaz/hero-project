import styled from 'styled-components';

export const HeaderDivStyled = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const HeadingStyled = styled.h1`
  font-size: 2rem;
  color: black;
  margin: 1rem;
`;

export const InputStyled = styled.input`
  width: 400px;
  height: 50px;
  padding: 10px;
  font-size: 1.2rem;
`;

export const HeaderDiv = ({ onChange }) => {
  return (
    <HeaderDivStyled>
      <HeadingStyled>Marvel Heroes</HeadingStyled>
      <InputStyled type="text" placeholder="Find your hero ..." onChange={onChange}></InputStyled>
    </HeaderDivStyled>
  );
};

export const ListNameStyled = styled.h2`
  font-size: 1.5rem;
  color: black;
  margin: 1rem;
`;

export const HeroDivStyled = styled.div`
  overflow: auto;
  display: flex;
  /* flex-direction: column; */
  padding: 20px;
  margin-bottom: 1.5rem;
`;

export const HeroCardStyled = styled.div`
  max-width: 150px;
  margin-right: 15px;
  background-color: aliceblue;
  position: relative;

  .hero-img-div {
    width: 150px;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .hero-card-description {
    padding: 5px;
    width: 150px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
      font-size: 1rem;
      text-align: center;
    }
  }

  .favorite-div {
    width: 100%;
    height: 64px;
    position: absolute;
    opacity: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(115, 157, 190);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease;
    span {
      font-size: 2rem;
      color: ${(props) => props.heartColor};
      cursor: pointer;
    }
  }

  &:hover {
    .favorite-div {
      opacity: 1;
      span {
        font-size: 2rem;
        cursor: pointer;
      }
    }
  }
`;

export const HeroCard = ({ imgSrc, title, onClick, btnText, heartColor }) => {
  return (
    <HeroCardStyled heartColor={heartColor}>
      <div className="hero-img-div">
        <img src={`${imgSrc}/portrait_xlarge.jpg`} alt="" />
      </div>
      <div className="hero-card-description">
        <h1 className="hero-name">{title}</h1>
      </div>
      <div className="favorite-div">
        {btnText} favorite
        <span onClick={onClick}>♥︎</span>
      </div>
    </HeroCardStyled>
  );
};
