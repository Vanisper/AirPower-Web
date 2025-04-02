import { AirI18n } from '@airpower/core'

export abstract class WebI18n extends AirI18n {
  abstract Detail: string
  abstract Edit: string
  abstract Add: string
  abstract EditSuccess: string
  abstract AddSuccess: string
  abstract DeleteSuccess: string
  abstract SelectPlease: string
  abstract DisableSuccess: string
  abstract EnableSuccess: string

  static get(): WebI18n {
    return AirI18n.get() as WebI18n
  }
}
