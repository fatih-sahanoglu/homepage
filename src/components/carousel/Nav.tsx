import React from "react";
import styled, {css} from "styled-components";
import {Column, ColumnProps} from "../grid";
import {IconButton} from "../icon-button";
import {useCarousel} from "./hooks";

export const Nav: React.FC = ({children}) => <>{children}</>;

export const NavButton = styled(IconButton)`
	padding: 4px;
	width: 32px;
	height: 32px;
	visibility: visible;
	pointer-events: all;
	background: rgba(255, 255, 255, 0.8);
	color: black;
	border-radius: 50%;
`;

export const CarouselPrev: React.FC = () => {
	const {goToPrev, activeSlide} = useCarousel();
	return <NavButton onClick={goToPrev} icon="chevronLeft" disabled={activeSlide <= 0} />;
};

export const CarouselNext: React.FC = () => {
	const {goToNext, activeSlide, slidesCount, visiblePanels} = useCarousel();
	return (
		<NavButton
			onClick={goToNext}
			icon="chevronRight"
			disabled={activeSlide >= slidesCount - visiblePanels}
		/>
	);
};

export const CarouselNav: React.FC = ({children, ...props}) => {
	return (
		<Column {...props} flex raw>
			<CarouselPrev />
			{children}
			<CarouselNext />
		</Column>
	);
};
export const CarouselPageNumbers: React.FC<ColumnProps> = props => {
	const {activeSlide, slidesCount} = useCarousel();
	const current = `${activeSlide + 1}`.padStart(2, "0");
	const all = `${slidesCount}`.padStart(2, "0");
	return (
		<>
			<strong>{current}</strong>/{all}
		</>
	);
};
