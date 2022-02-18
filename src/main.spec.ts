import { NestFactory } from '@nestjs/core';

jest.mock('@nestjs/core');

describe('Entry point test', () => {
  const mockApp = {
    useGlobalPipes: jest.fn(),
    useGlobalFilters: jest.fn(),
    enableCors: jest.fn(),
    listen: jest.fn(),
  };
  beforeAll(() => {
    (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);
  });

  it('application should be defined', async () => {
    await import('./main');

    expect(NestFactory).toBeDefined();
    expect(NestFactory.create).toHaveBeenCalledTimes(1);
  });
});
