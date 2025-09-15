type Comp<P = {}> = (props: P) => ReactElement | null;
type CompC<P = {}> = Comp<React.PropsWithChildren<P>>;
