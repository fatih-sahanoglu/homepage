import styled from "styled-components";
import React from "react";
import {Icons} from "./icons";
import {Icon} from "./index";

interface SocialLinkProps {
	icon: keyof Icons;
}

const SocialLink = styled.a.attrs(({icon}: SocialLinkProps) => ({
	children: <Icon icon={icon} />
}))<SocialLinkProps>`
	display: inline-flex;
	color: currentColor;
`;

export default SocialLink;
