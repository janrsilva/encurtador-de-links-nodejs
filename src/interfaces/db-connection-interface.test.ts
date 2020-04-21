import { Server } from './../server';
import { DBFactory } from './../factories/db-factory';
import { IDBConnection } from './db-connection-interface';
import express from 'express';

const mockDB = {
  connect: jest.fn(),
} as IDBConnection;

describe("call interface methods", () => {
  it("should call the IDBConnection interface connect", () => {
        /**
         * Isso aqui eu preciso preciso  melhorar
         */
        const db = DBFactory.build();
        db.connect = mockDB.connect;
        const server = new Server(express());
        Server.db = db;
        expect(db.connect).toHaveBeenCalled();
        server.dbConfig();
  });
});