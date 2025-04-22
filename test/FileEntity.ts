import type { IFile } from '../src'
import { RootEntity } from '../src'

export class FileEntity extends RootEntity implements IFile {
  url!: string
}
