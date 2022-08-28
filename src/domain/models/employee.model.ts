export interface IEmployee {
  id: string;
  name: string;
  email: string;
  position: string;
  createdAt: Date;
}

export default class Employee implements IEmployee {
  public id: string = '';
  public name: string = '';
  public email: string = '';
  public position: string = '';
  public createdAt!: Date;

  constructor(data?: IEmployee | undefined) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.position = data.position;
      this.createdAt = data.createdAt;
    }
  }
}
