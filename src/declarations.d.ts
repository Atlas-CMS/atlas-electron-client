declare module 'electron-squirrel-startup';
declare module 'electron-json-storage';
declare module 'react-serialize';

declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}
