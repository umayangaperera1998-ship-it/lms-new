import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    // Get institute ID from header or subdomain
    let instituteId = req.headers['x-institute-id'] as string;

    // Try to extract from subdomain
    if (!instituteId) {
      const host = req.hostname;
      const subdomain = host.split('.')[0];

      if (subdomain && subdomain !== 'localhost' && subdomain !== 'www') {
        const institute = await this.prisma.institute.findUnique({
          where: { subdomain },
        });

        if (institute) {
          instituteId = institute.id;
        }
      }
    }

    // For super admin, allow access without institute context
    const user = (req as any).user;
    if (user?.role === 'SUPER_ADMIN') {
      (req as any).instituteId = instituteId;
      this.prisma.setInstituteId(instituteId);
      return next();
    }

    // For other users, institute context is required
    if (!instituteId) {
      throw new BadRequestException('Institute context is required');
    }

    // Set institute context
    (req as any).instituteId = instituteId;
    this.prisma.setInstituteId(instituteId);

    next();
  }
}
