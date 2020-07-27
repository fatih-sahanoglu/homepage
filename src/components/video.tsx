import React from "react";

interface VideoProps {
	video: number | string;
	width?: number | string;
	height?: number | string;
	autopause?: boolean;
	autoplay?: boolean;
	title?: boolean;
	controls?: boolean;
	loop?: boolean;
	muted?: boolean;
	responsive?: boolean;
}

export const Video: React.FC<VideoProps> = ({video, ...props}) => {
	const container = React.useRef<HTMLDivElement>();
	const [player, setPlayer] = React.useState<any>(null);
	React.useEffect(() => {
		if (typeof window !== "undefined") {
			(async () => {
				const {default: Player} = await import("@vimeo/player");
				const vimeo = new Player(container.current, {
					id: video,
					...props
				});
				setPlayer(vimeo);
			})();
			return () => {
				player && player.destroy();
			};
		}
	}, [container, setPlayer]);
	return <div ref={container} />;
};
