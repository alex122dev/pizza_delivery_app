import { OrdersService } from './orders.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { StatusesService } from '../statuses/statuses.service';
import { UsersService } from '../users/users.service';
import { OrderItemsService } from '../orderItems/order-items.service';
import { mockFactory } from '../../test/mockFactory';

describe('OrdersService', () => {
  let service: OrdersService;

  const mockUser = mockFactory.getUser('user')
  const mockOrder = mockFactory.getOrder(2)
  const mockCreateOrderDto = mockFactory.getCreateOrderData(2)

  const userId = mockFactory.generateId();
  const orderId = mockFactory.generateId();


  const updatePhoneDto = {
    phone: mockFactory.generatePhone(),
  };

  const updateStatusDto = {
    status: mockFactory.generateRandomString(10),
  };

  const updateOrderItemsDto = {
    orderItems: [
      mockFactory.getCreateOrderItemData(),
      mockFactory.getCreateOrderItemData(),
    ]
  }



  const mockOrderRepository = {
    create: jest.fn().mockImplementation((dto) => ({ ...dto, id: Date.now() })),
    save: jest
      .fn()
      .mockImplementation((order) =>
        Promise.resolve(order),
      ),
    findOne: jest.fn().mockImplementation(
      ({
        where: { id },
        relations: {
          status,
          orderItems: { product },
        },
      }) => Promise.resolve({ ...mockOrder, id }),
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
            ...mockOrder,
            userId,
            user: { ...mockUser, id: userId },
          },
          {
            ...mockOrder,
            userId,
            user: { ...mockUser, id: userId },
          },
        ]),
    ),
  };
  const mockStatusesService = {
    getByValue: jest.fn().mockImplementation((statusValue) =>
      Promise.resolve(mockFactory.getStatus(statusValue)),
    ),
  };
  const mockUsersService = {
    getById: jest.fn().mockImplementation((userId) =>
      Promise.resolve({
        ...mockUser,
        id: userId,
      }),
    ),
  };
  const mockOrderItemsService = {
    create: jest
      .fn()
      .mockImplementation((order, createOrderItemDto) =>
        Promise.resolve({ ...createOrderItemDto, id: Date.now() }),
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
    expect(service['calculateTotalPrice'](updateOrderItemsDto.orderItems)).toEqual(
      updateOrderItemsDto.orderItems.reduce((acc, val) => acc += val.quantity * val.product.price, 0)
    );
  });

  it('should create new order', async () => {
    expect(await service.create(userId, mockCreateOrderDto)).toEqual({
      id: expect.any(Number),
      address: mockCreateOrderDto.address,
      phone: mockCreateOrderDto.phone,
      totalPrice: mockCreateOrderDto.orderItems.reduce((acc, val) => acc += val.quantity * val.product.price, 0),
      comment: mockCreateOrderDto.comment,
      userId,
      user: { ...mockUser, id: userId },
      status: {
        id: expect.any(Number),
        value: 'processing',
        description: 'processing',
        orders: []
      },
      orderItems: [
        {
          ...mockCreateOrderDto.orderItems[0],
          id: expect.any(Number),

        },
        {
          ...mockCreateOrderDto.orderItems[1],
          id: expect.any(Number),
        },
      ],
    });
  });

  it('should get order by id', async () => {
    expect(await service.getById(orderId)).toEqual({
      ...mockOrder,
      id: orderId,
    });
  });

  it('should update order phone', async () => {
    expect(await service.update(orderId, updatePhoneDto)).toEqual({
      ...mockOrder,
      id: orderId,
      phone: updatePhoneDto.phone,
    });
  });


  it('should update order status', async () => {
    expect(await service.update(orderId, updateStatusDto)).toEqual({
      ...mockOrder,
      id: orderId,
      status: {
        id: expect.any(Number),
        value: updateStatusDto.status,
        description: updateStatusDto.status,
        orders: []
      },
    });
  });

  it('should update orderItems and totalPrice in order', async () => {
    expect(await service.update(orderId, updateOrderItemsDto)).toEqual({
      ...mockOrder,
      id: orderId,
      orderItems: [
        { id: expect.any(Number), ...updateOrderItemsDto.orderItems[0] },
        { id: expect.any(Number), ...updateOrderItemsDto.orderItems[1] },
      ],
      totalPrice: updateOrderItemsDto.orderItems.reduce((acc, val) => acc += val.quantity * val.product.price, 0),
    });
  });

  it('should change order status to canceled', async () => {
    expect(await service.cancelOrder(orderId)).toEqual({
      ...mockOrder,
      id: orderId,
      status: {
        id: expect.any(Number),
        value: 'canceled',
        description: 'canceled',
        orders: []
      },
    });
  });

  it('should get all orders by userId(two in our case)', async () => {
    expect(await service.getCurrentUserOrders(userId)).toEqual([
      {
        ...mockOrder,
        userId,
        user: { ...mockUser, id: userId },
      },
      {
        ...mockOrder,
        userId,
        user: { ...mockUser, id: userId },
      },
    ]);
  });

});
