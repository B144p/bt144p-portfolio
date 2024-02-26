import { Card } from "antd";
import { styled } from "styled-components";

type IGlassCard = {
  minHeight: string;
  maxWidth: string;
};

const GlassCard = styled(Card)<IGlassCard>`
  width: min(100%, ${(props) => props.maxWidth});
  min-height: ${(props) => props.minHeight};
  position: absolute;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

export default GlassCard;
