import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';

@Controller()
@ApiExcludeController()
export class AppController {
  @Get()
  getData(@Res() res: Response) {
    return res.redirect('/docs');
  }
}
