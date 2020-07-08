import React from "react";
import {GridContextConfig, GridContextProps} from "./types";

export const GridContext = React.createContext<GridContextConfig>(null);

export const useGrid = (): GridContextConfig => React.useContext(GridContext);

export const useMediaQuery = ({query}: {query: string}): boolean => {
	const [matches, setMatches] = React.useState<boolean>(false);

	const handleResize = React.useCallback(
		(e: MediaQueryListEvent): void => {
			setMatches(e.matches);
		},
		[setMatches]
	);

	React.useEffect(() => {
		const mq = window.matchMedia(query);
		setMatches(mq.matches);
		// compatibility
		if ("addEventListener" in mq) {
			mq.addEventListener("change", handleResize);
			return (): void => {
				mq.addEventListener("change", handleResize);
			};
		} else if ("addListener" in mq) {
			// @ts-ignore
			mq.addListener(handleResize);
			return (): void => {
				// @ts-ignore
				mq.addListener(handleResize);
			};
		}
	}, [query, setMatches, handleResize]);

	return matches;
};

export const GridProvider: React.FC<GridContextProps> = ({children, grid}) => {
	const xl = useMediaQuery({query: grid.mq.xl});
	const l = useMediaQuery({query: grid.mq.l});
	const m = useMediaQuery({query: grid.mq.m});
	const s = useMediaQuery({query: grid.mq.s});
	const viewport = {
		s: !m,
		su: s,
		m: !l && m,
		mu: m,
		l: !xl && l,
		lu: l,
		xl
	};

	return <GridContext.Provider value={{...grid, viewport}}>{children}</GridContext.Provider>;
};
