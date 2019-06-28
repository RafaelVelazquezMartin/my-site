export class Technology {
  public name: string;
  public type: string;
  public logo: string;
  public slug: string;

  constructor(name: string, type: string, logo: string) {
    this.name = name;
    this.type = type;
    this.logo = logo;
    this.slug = this.slugify(name);
  }

  slugify(str: string) {
    return str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
}
