import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import * as crypto from 'crypto';

import { AppModule } from '../app.module';

describe('UsersController', () => {
  const updatedReturn = {
    acknowledged: true,
    modifiedCount: 1,
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 1,
  };

  let controller: UsersController;

  const usersFakeRepository = [];

  const mockUserService = {
    validCreate: jest.fn((dto) => true),
    create: jest.fn((dto) => ({
      _id: crypto.randomBytes(14).toString('hex'),
      ...dto,
    })),
    validUpdate: jest.fn((dto) => {
      return true;
    }),
    update: jest.fn((id, dto) => updatedReturn),
    findAll: jest.fn((page) => {
      const result: any = {
        pages: 1,
        total_of_records: usersFakeRepository.length,
        records: [],
      };

      if (page == 1) result.records = usersFakeRepository;

      return result;
    }),
    findOne: jest.fn((id) => {
      return usersFakeRepository.find((user) => user._id == id);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    const app = module.createNestApplication();
    await app.init();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const user = {
      firstName: 'Block',
      lastName: 'Hub',
      email: 'bevebec355@afarek.com',
      password: `<).K<\`82[@M&8$uuN,"qnqs`,
    };

    const created = await controller.create(user);

    delete created.password;
    delete user.password;

    expect(created).toEqual({
      id: expect.any(String),
      ...user,
    });

    expect(mockUserService.validCreate).toHaveBeenCalledWith(user);

    expect(mockUserService.create).toHaveBeenCalledWith(user);
  });
});
