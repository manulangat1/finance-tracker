import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request: any = context.switchToHttp().getRequest();
    const data = request.user;
    // return plainToClass(BaseUserDTO, data);
    return data.user;
  },
);
