export interface RouterType {
    title: string;
    path: string;
    element: JSX.Element;
    loader?: (params: any) => Promise<any>;
  }