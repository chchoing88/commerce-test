declare module "iscroll" {
  const iscroll: {
    new (element: Element | string, options?: IScrollOptions): IScroll;
  };

  export = iscroll;
}
