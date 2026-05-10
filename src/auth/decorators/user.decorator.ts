import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/client'

interface RequestWithUser {
	user?: User
}

export const CurrentUser = createParamDecorator(
	(data: keyof User, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<RequestWithUser>()
		const user = request.user

		if (!user) {
			throw new Error('User not found in request')
		}

		return data ? user[data] : user
	}
)
