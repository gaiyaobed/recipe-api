import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
/*
 * Hashing Password
 * */

@Injectable()
export class PasswordUtils {
  /*
   * Hashing Password
   * */
  async hashPassword(password: string, salt = 10): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  /*
   * Compare Password
   * */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
