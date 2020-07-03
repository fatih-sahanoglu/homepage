import styled from "styled-components";
import {removeInternals} from "../../utils/styled-components";
import {COLCOUNT, COLSPAN} from "./constants";

export const Stage = styled.div.withConfig({
	shouldForwardProp: removeInternals
})`
  ${COLCOUNT}: var(${COLSPAN});
  width: 100vw;
  margin-left: calc((-100vw + 100%) / 2);
  margin-right: calc((-100vw + 100%) / 2);
`;
