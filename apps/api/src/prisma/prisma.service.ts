import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: ['warn', 'error'],
      errorFormat: 'pretty',
    });

    // Multi-tenant middleware - inject instituteId filter
    this.$use(async (params, next) => {
      // Skip for specific models that don't have instituteId
      const modelsWithoutInstitute = [
        'Role',
        'Permission',
        'RolePermission',
        'UserRole',
        'RefreshToken',
        'Subscription',
      ];

      if (modelsWithoutInstitute.includes(params.model)) {
        return next(params);
      }

      // Get instituteId from context (will be set by middleware)
      const instituteId = (this as any).instituteId;

      if (instituteId && params.model && params.args) {
        // Add instituteId filter for read operations
        if (params.action === 'findUnique' || params.action === 'findFirst') {
          params.args.where = params.args.where || {};
          if (!params.args.where.instituteId) {
            params.args.where.instituteId = instituteId;
          }
        }

        if (params.action === 'findMany') {
          if (!params.args) {
            params.args = {};
          }
          params.args.where = params.args.where || {};
          if (!params.args.where.instituteId) {
            params.args.where.instituteId = instituteId;
          }
        }

        // Add instituteId for create/update operations
        if (params.action === 'create') {
          params.args.data = params.args.data || {};
          if (!params.args.data.instituteId) {
            params.args.data.instituteId = instituteId;
          }
        }

        if (params.action === 'createMany') {
          if (Array.isArray(params.args.data)) {
            params.args.data = params.args.data.map((item: any) => ({
              ...item,
              instituteId: item.instituteId || instituteId,
            }));
          }
        }
      }

      return next(params);
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to database');
    } catch (error) {
      this.logger.error('Failed to connect to database', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Disconnected from database');
  }

  // Helper method to set tenant context
  setInstituteId(instituteId: string) {
    (this as any).instituteId = instituteId;
  }

  // Helper method to clear tenant context
  clearInstituteId() {
    delete (this as any).instituteId;
  }

  // Soft delete helper
  async softDelete(model: string, id: string) {
    return (this as any)[model].update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  // Restore soft deleted record
  async restore(model: string, id: string) {
    return (this as any)[model].update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}
