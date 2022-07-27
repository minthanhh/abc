import { PrismaNotFoundExceptionFilter } from './prisma-not-found-exception.filter';

describe('PrismaNotFoundExceptionFilter', () => {
  it('should be defined', () => {
    expect(new PrismaNotFoundExceptionFilter()).toBeDefined();
  });
});
