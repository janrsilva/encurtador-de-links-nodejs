import { LinkService } from './../services/link-service';
import { IDB } from './db-interface';

class User { }

const mockDB = {
  // tslint:disable-next-line: no-empty
  update: jest.fn((uuid: string, user: User, collection: string) => new Promise<User>((resolve, reject) => {})),
  // tslint:disable-next-line: no-empty
  create: jest.fn((user: User, collection: string) => new Promise<User>((resolve, reject) => {})),
  // tslint:disable-next-line: no-empty
  delete: jest.fn((uuid: string, collection: string) => new Promise<boolean>((resolve, reject) => {})),
  // tslint:disable-next-line: no-empty
  get: jest.fn((uuid: string, collection: string) => new Promise<User>((resolve, reject) => {})),
} as IDB;
const service = new LinkService(mockDB);

describe("call interface methods", () => {
  it("should call the IDB interface create", () => {
    service.create({});
    expect(service.db.create).toHaveBeenCalled();
  });
  it("should call the IDB interface update", () => {
    service.update('aa-bb-33', {});
    expect(service.db.update).toHaveBeenCalled();
  });
  it("should call the IDB interface get", () => {
    service.get('aa-bb-33');
    expect(service.db.update).toHaveBeenCalled();
  });
  it("should call the IDB interface delete", () => {
    service.delete('aa-bb-33');
    expect(service.db.update).toHaveBeenCalled();
  });
});