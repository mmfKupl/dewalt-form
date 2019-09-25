export class ButtonData {
  constructor(
    public title = 'untitled',
    public onClick = (...p: any[]) => {},
    public disabled: ((...p: any[]) => boolean) | boolean,
    public link = '',
    public order = 1,
    public isNext?: boolean
  ) {}
}
