import { ILink } from './link-interface';
import { LinkService } from './../services/link-service';
import { ILinkDBRepository, Params } from './db-interface';

const mockDB = {
  // tslint:disable-next-line: no-shadowed-variable
  update: jest.fn((uuid: string, link: ILink) => new Promise<ILink>((resolve, reject) => resolve())),
  // tslint:disable-next-line: no-shadowed-variable
  create: jest.fn((link: ILink) => new Promise<ILink>((resolve, reject) => resolve())),
  delete: jest.fn((uuid: string) => new Promise<boolean>((resolve, reject) => resolve())),
  get: jest.fn((uuid: string) => new Promise<ILink>((resolve, reject) => resolve())),
  getByKey: jest.fn((name: string) => new Promise<ILink>((resolve, reject) => resolve())),
  list: jest.fn((params: Params, page: number, perPage: number) => new Promise<ILink[]>((resolve, reject) => resolve())),
} as ILinkDBRepository;
const service = new LinkService(mockDB);
const link = {
  full_link: "https://just.a.url/full/big/long/999999/t",
  short_name: "my-short-link",
} as ILink;

describe("call interface methods", () => {
  it("should call the IDB interface create", () => {
    service.create(link);
    expect(service.repository.create).toHaveBeenCalled();
  });
  it("should call the IDB interface update", () => {
    service.update('aa-bb-33', link);
    expect(service.repository.update).toHaveBeenCalled();
  });
  it("should call the IDB interface get", () => {
    service.get('aa-bb-33');
    expect(service.repository.update).toHaveBeenCalled();
  });
  it("should call the IDB interface delete", () => {
    service.delete('aa-bb-33');
    expect(service.repository.update).toHaveBeenCalled();
  });
  it("should call the IDB interface list", () => {
    service.list('aa-bb-33');
    expect(service.repository.list).toHaveBeenCalled();
  });
  it("should call the IDB interface getByKey", () => {
    service.getByShortName('aa-bb-33');
    expect(service.repository.getByKey).toHaveBeenCalled();
  });
});