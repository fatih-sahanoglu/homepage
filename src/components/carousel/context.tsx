import React from "react";
import {CarouselConfig} from "./types";

export const CarouselContext = React.createContext(null);
export const CarouselProvider: React.FC<{config: CarouselConfig}> = ({children, config}) => (
	<CarouselContext.Provider value={config}>{children}</CarouselContext.Provider>
);
