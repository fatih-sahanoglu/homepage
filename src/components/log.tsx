import React from "react";

export const Log: React.FC<{data: {}}> = ({data}) => (
	<pre>
		<code>{JSON.stringify(data, null, 4)}</code>
	</pre>
);
