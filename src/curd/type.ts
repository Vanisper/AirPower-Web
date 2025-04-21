import type { RootEntity } from '../base'
import type { AbstractCurdService } from './AbstractCurdService'

/**
 * ### 服务构造器类型
 */
export type CurdServiceConstructor<E extends RootEntity, S extends AbstractCurdService<E>> = new () => S & {
  entityClass: (new () => E)
}
