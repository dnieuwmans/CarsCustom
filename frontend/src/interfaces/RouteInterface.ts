export default interface RouteInterface {
  name: string;
  title: string;
  icon?: string;
  parent?: string;
  onlyAtRoute?: boolean;
}
