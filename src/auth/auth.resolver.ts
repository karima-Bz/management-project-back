import { Resolver, Args, Mutation, Query } from "@nestjs/graphql";
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/user.decorator';
import { SignInInput, SignInOutput } from '../users/dto/signin-user.input';
import { User } from "../users/entities/user.entity";

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => SignInOutput, { name: 'login' })
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
  ): Promise<SignInOutput> {
    return this.authService.signIn(signInInput);
  }

  @Query(()=>User, {name:'me'})
  async me(@CurrentUser() user): Promise<User | null>{
    return await this.authService.me(user.userId);
  }
}
