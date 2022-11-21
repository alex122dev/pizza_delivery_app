import { OrdersService } from './orders.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { StatusesService } from '../statuses/statuses.service';
import { UsersService } from '../users/users.service';
import { OrderItemsService } from '../orderItems/order-items.service';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrdersService', () => {
  let service: OrdersService;

  const mockUserWithoutId = {
    email: 'a@gmail.com',
    password: '123456',
    phone: '380991112233',
    firstName: 'a',
    lastName: 'a',
    roles: [
      {
        id: 1,
        value: 'ADMIN',
        description: 'administrator',
      },
      {
        id: 2,
        value: 'USER',
        description: 'user',
      },
    ],
  };

  const mockOrderItemsWithoutId = [
    {
      quantity: 1,
      product: {
        id: 1,
        description: 'product_1',
        image: 'product_1',
        name: 'pizza_1',
        price: 10000,
        isActive: true,
      },
    },
    {
      quantity: 2,
      product: {
        id: 2,
        description: 'product_2',
        image: 'product_2',
        name: 'pizza_2',
        price: 20000,
        isActive: true,
      },
    },
  ];

  const mockOrderWithoutId = {
    address: 'address',
    phone: '380956446464',
    totalPrice: 50000,
    comment: 'comment',
    userId: 1,
    user: { id: 1, ...mockUserWithoutId },
    status: {
      id: 1,
      value: 'processing',
      description: 'processing',
    },
    orderItems: [
      {
        id: 1,
        ...mockOrderItemsWithoutId[0],
      },
      {
        id: 1,
        ...mockOrderItemsWithoutId[1],
      },
    ],
  };

  const userId = 1;
  const orderId = 5;

  const createDto: CreateOrderDto = {
    address: 'address',
    phone: '380956446464',
    comment: 'comment',
    orderItems: mockOrderItemsWithoutId,
  };

  const updatePhoneDto = {
    phone: '380679997788',
  };

  const updateStatusDto = {
    status: 'cooking',
  };

  const updateOrderItemsDto = {
    orderItems: [
      {
        quantity: 3,
        product: {
          id: 3,
          description: 'product_3',
          image: 'product_3',
          name: 'pizza_3',
          price: 30000,
          isActive: true,
        },
      },
      {
        quantity: 4,
        product: {
          id: 4,
          description: 'product_4',
          image: 'product_4',
          name: 'pizza_4',
          price: 40000,
          isActive: true,
        },
      },
    ],
  };

  const mockOrderRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((createDto) =>
        Promise.resolve({ id: Date.now(), ...createDto }),
      ),
    findOne: jest.fn().mockImplementation(
      ({
        where: { id },
        relations: {
          status,
          orderItems: { product },
        },
      }) => Promise.resolve({ id, ...mockOrderWithoutId }),
    ),
    find: jest.fn().mockImplementation(
      ({
        where: { userId },
        relations: {
          status,
          orderItems: { product },
        },
      }) =>
        Promise.resolve([
          {
            id: Date.now(),
            ...mockOrderWithoutId,
            userId,
            user: { ...mockUserWithoutId, id: userId },
          },
          {
            id: Date.now(),
            ...mockOrderWithoutId,
            userId,
            user: { ...mockUserWithoutId, id: userId },
          },
        ]),
    ),
  };
  const mockStatusesService = {
    getByValue: jest.fn().mockImplementation((statusValue) =>
      Promise.resolve({
        value: statusValue,
        id: Date.now(),
        description: statusValue,
      }),
    ),
  };
  const mockUsersService = {
    getById: jest.fn().mockImplementation((userId) =>
      Promise.resolve({
        id: userId,
        ...mockUserWithoutId,
      }),
    ),
  };
  const mockOrderItemsService = {
    create: jest
      .fn()
      .mockImplementation((order, createOrderItemDto) =>
        Promise.resolve({ id: Date.now(), ...createOrderItemDto }),
      ),
    removeAllByOrderId: jest
      .fn()
      .mockImplementation((orderId) => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository,
        },
        {
          provide: StatusesService,
          useValue: mockStatusesService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: OrderItemsService,
          useValue: mockOrderItemsService,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call private method and return totalPrice', () => {
    expect(service['calculateTotalPrice'](mockOrderItemsWithoutId)).toEqual(
      50000,
    );
  });

  it('should create new order', async () => {
    expect(await service.create(userId, createDto)).toEqual({
      id: expect.any(Number),
      address: 'address',
      phone: '380956446464',
      totalPrice: 50000,
      comment: 'comment',
      userId,
      user: { id: userId, ...mockUserWithoutId },
      status: {
        id: expect.any(Number),
        value: 'processing',
        description: 'processing',
      },
      orderItems: [
        {
          id: expect.any(Number),
          ...createDto.orderItems[0],
        },
        {
          id: expect.any(Number),
          ...createDto.orderItems[1],
        },
      ],
    });
  });

  it('should get order by id', async () => {
    expect(await service.getById(orderId)).toEqual({
      id: orderId,
      ...mockOrderWithoutId,
    });
  });

  it('should update order phone', async () => {
    expect(await service.update(orderId, updatePhoneDto)).toEqual({
      id: orderId,
      ...mockOrderWithoutId,
      phone: updatePhoneDto.phone,
    });
  });

  it('should update order status', async () => {
    expect(await service.update(orderId, updateStatusDto)).toEqual({
      id: orderId,
      ...mockOrderWithoutId,
      status: {
        id: expect.any(Number),
        value: updateStatusDto.status,
        description: updateStatusDto.status,
      },
    });
  });

  it('should update orderItems and totalPrice in order', async () => {
    expect(await service.update(orderId, updateOrderItemsDto)).toEqual({
      id: orderId,
      ...mockOrderWithoutId,
      orderItems: [
        { id: expect.any(Number), ...updateOrderItemsDto.orderItems[0] },
        { id: expect.any(Number), ...updateOrderItemsDto.orderItems[1] },
      ],
      totalPrice: 250000,
    });
  });

  it('should change order status to canceled', async () => {
    expect(await service.cancelOrder(orderId)).toEqual({
      id: orderId,
      ...mockOrderWithoutId,
      status: {
        id: expect.any(Number),
        value: 'canceled',
        description: 'canceled',
      },
    });
  });

  it('should get all orders by userId(two in our case)', async () => {
    expect(await service.getCurrentUserOrders(userId)).toEqual([
      {
        id: expect.any(Number),
        ...mockOrderWithoutId,
        userId,
      },
      {
        id: expect.any(Number),
        ...mockOrderWithoutId,
        userId,
      },
    ]);
  });
});
