export const internalProps = [
	"flex",
	"raw",
	"xs",
	"s",
	"m",
	"l",
	"xl",
	"order",
	"alignItems",
	"alignSelf",
	"clip",
	"reverse",
	"justify",
	"removeGutter",
	"removePadding",
	"addGutter",
	"addPadding",
	"noWrap",
	"inline",
	"backgroundColor",
	"invertBackground",
	"inline"
];

export const removeInternals = (prop: string): boolean => !internalProps.includes(prop);
