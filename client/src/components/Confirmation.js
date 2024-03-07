import styled from "styled-components";
import { useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";

const Confirmation = ({ darkMode }) => {
  const [order, setOrder] = useState(null);
  const [total, setTotal] = useState(0);

  //here we conditionally fetch the order collection which was pushed from the cart when the user makes a purchase
  useEffect(() => {
    fetch(`/get-order`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.length > 0) {
          let subtotal = 0;
          let moneyPer = 0;
          setOrder(data.data);
          data.data[0].result.forEach((item) => {
            moneyPer = Number(item.price.replace("$", ""));
            if (item.cartAmount > 1) {
              subtotal += moneyPer * item.cartAmount;
            } else {
              subtotal += moneyPer;
            }
          });
          setTotal(parseFloat(subtotal * 1.15).toFixed(2));
        }
      });
  }, []);

  if (!order) {
    return <StyledLoader color="#433ede" />;
  }
  return (
    <StyledOrder darkMode={darkMode}>
      <h1>{order[0] ? "Order Confirmed!" : "Nothing to see here!"}</h1>
      <StyledSub>Your total is {total}</StyledSub>
      {order[0]
        ? order[0].result.map((item) => {
            return (
              <ul>
                <StyledImg src={item.imageSrc} alt="product" />
                <li key={item.id}>
                  <h2>
                    {item.name} x {item.cartAmount}
                  </h2>
                </li>
              </ul>
            );
          })
        : ""}
    </StyledOrder>
  );
};

const StyledImg = styled.img`
  box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
  border-radius: 5px;
`;

const StyledLoader = styled(ClimbingBoxLoader)`
  position: absolute;
  top: 300px;
  left: 45%;
  z-index: 5;
`;
const StyledSub = styled.h3`
  margin-left: 100px;
  margin-top: -40px;
`;

const StyledOrder = styled.div`
  position: absolute;
  top: 80px;
  right: 0;
  left: 0;
  bottom: 0;
  height: auto;
  border: ${(props) =>
    props.darkMode ? "100px solid #2C2A30" : "100px solid #e6e6fa"};
  background-color: ${(props) => (props.darkMode ? "#330B26" : "#c1bfff")};
  height: 100vh;
  h1 {
    margin: 50px 100px;
  }
  ul {
    padding: 10px;
    position: relative;
    display: flex;
    margin-left: 50px;
    li {
      display: flex;
      list-style-type: none;
      margin: 20px;
      position: relative;
      max-width: 60%;

      img {
        margin: 0 20px 20px 20px;

        width: 200px;
        height: 200px;
      }
    }
  }

  transition: all 0 ease;
  @media (max-width: 768px) {
    top: 198px;
  }
`;

export default Confirmation;
