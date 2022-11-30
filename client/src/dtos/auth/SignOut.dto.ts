export interface SignOutDto {
  token: { userId: number; refreshToken: string };
  message: string;
}
