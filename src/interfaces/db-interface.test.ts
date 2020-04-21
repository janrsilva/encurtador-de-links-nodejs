import { ILink } from './link-interface';
import { LinkService } from './../services/link-service';
import { IDB, Params } from './db-interface';

const mockDB = {
  // tslint:disable-next-line: no-shadowed-variable
  update: jest.fn((uuid: string, link: ILink, collection: string) => new Promise<ILink>((resolve, reject) => resolve())),
  // tslint:disable-next-line: no-shadowed-variable
  create: jest.fn((link: ILink, collection: string) => new Promise<ILink>((resolve, reject) => resolve())),
  delete: jest.fn((uuid: string, collection: string) => new Promise<boolean>((resolve, reject) => resolve())),
  get: jest.fn((uuid: string, collection: string) => new Promise<ILink>((resolve, reject) => resolve())),
  getByShortName: jest.fn((name: string, collection: string) => new Promise<ILink>((resolve, reject) => resolve())),
  list: jest.fn((params: Params, collection: string, page: number, perPage: number) => new Promise<ILink[]>((resolve, reject) => resolve())),
} as IDB;
const service = new LinkService(mockDB);
const link = {
  full_link: "https://just.a.url/full/big/long/999999/t",
  short_name: "my-short-link",
} as ILink;

describe("call interface methods", () => {
  it("should call the IDB interface create", () => {
    service.create(link);
    expect(service.db.create).toHaveBeenCalled();
  });
  it("should call the IDB interface update", () => {
    service.update('aa-bb-33', link);
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
  it("should call the IDB interface list", () => {
    service.list('aa-bb-33');
    expect(service.db.list).toHaveBeenCalled();
  });
  it("should call the IDB interface getByShortName", () => {
    service.getByShortName('aa-bb-33');
    expect(service.db.getByShortName).toHaveBeenCalled();
  });
});