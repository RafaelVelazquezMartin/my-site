import { Image } from "./Image";
import { Technology } from "./Technology";

export class Project {
  public _id: string;
  public name: string;
  public description: string;
  public images: Image[];
  public stack: Technology[];
  public importance: number;
  public author: string;
  public slug: string;

  constructor(
    name: string,
    desc: string,
    images: Image[],
    stack: Technology[],
    importance: number
  ) {
    this.name = name;
    this.description = desc;
    this.images = images;
    this.stack = stack;
    this.importance = importance;
    this.slug = this.slugify(name);
  }

  slugify(str: string) {
    return str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
}
